const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const pool = require('../config/db');

// 获取用户个人资料
router.get('/profile', auth, async (req, res) => {
  try {
    const [profiles] = await pool.execute(
      'SELECT * FROM user_profiles WHERE user_id = ?',
      [req.userId]
    );

    if (profiles.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '用户资料不存在'
      });
    }

    res.json({
      status: 'success',
      data: profiles[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

// 创建或更新用户个人资料
router.put('/profile', [
  auth,
  body('real_name').optional().notEmpty().withMessage('真实姓名不能为空'),
  body('phone').optional().matches(/^1[3-9]\d{9}$/).withMessage('手机号格式不正确'),
  body('department').optional().notEmpty().withMessage('部门不能为空'),
  body('position').optional().notEmpty().withMessage('职位不能为空'),
  body('join_date').optional().isDate().withMessage('入党日期格式不正确')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { real_name, phone, department, position, join_date } = req.body;

    // 检查用户资料是否存在
    const [profiles] = await pool.execute(
      'SELECT id FROM user_profiles WHERE user_id = ?',
      [req.userId]
    );

    if (profiles.length === 0) {
      // 创建新的用户资料
      await pool.execute(
        'INSERT INTO user_profiles (user_id, real_name, phone, department, position, join_date) VALUES (?, ?, ?, ?, ?, ?)',
        [req.userId, real_name, phone, department, position, join_date]
      );
    } else {
      // 更新现有用户资料
      await pool.execute(
        'UPDATE user_profiles SET real_name = COALESCE(?, real_name), phone = COALESCE(?, phone), department = COALESCE(?, department), position = COALESCE(?, position), join_date = COALESCE(?, join_date) WHERE user_id = ?',
        [real_name, phone, department, position, join_date, req.userId]
      );
    }

    res.json({
      status: 'success',
      message: '用户资料更新成功'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

module.exports = router;