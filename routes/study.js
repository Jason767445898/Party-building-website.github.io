const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const pool = require('../config/db');

// 创建学习记录
router.post('/', [
  auth,
  body('title').notEmpty().withMessage('标题不能为空'),
  body('content').notEmpty().withMessage('内容不能为空'),
  body('study_time').notEmpty().withMessage('学习时间不能为空'),
  body('duration').isInt({ min: 1 }).withMessage('学习时长必须为正整数')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, study_time, duration } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO study_records (user_id, title, content, study_time, duration) VALUES (?, ?, ?, ?, ?)',
      [req.userId, title, content, study_time, duration]
    );

    res.status(201).json({
      status: 'success',
      message: '学习记录创建成功',
      data: {
        id: result.insertId,
        title,
        content,
        study_time,
        duration
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

// 获取用户的学习记录列表
router.get('/', auth, async (req, res) => {
  try {
    const [records] = await pool.execute(
      'SELECT * FROM study_records WHERE user_id = ? ORDER BY study_time DESC',
      [req.userId]
    );

    res.json({
      status: 'success',
      data: records
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

// 获取单个学习记录详情
router.get('/:id', auth, async (req, res) => {
  try {
    const [records] = await pool.execute(
      'SELECT * FROM study_records WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );

    if (records.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '学习记录不存在'
      });
    }

    res.json({
      status: 'success',
      data: records[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

// 更新学习记录
router.put('/:id', [
  auth,
  body('title').optional().notEmpty().withMessage('标题不能为空'),
  body('content').optional().notEmpty().withMessage('内容不能为空'),
  body('study_time').optional().notEmpty().withMessage('学习时间不能为空'),
  body('duration').optional().isInt({ min: 1 }).withMessage('学习时长必须为正整数')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, study_time, duration } = req.body;
    const [result] = await pool.execute(
      'UPDATE study_records SET title = COALESCE(?, title), content = COALESCE(?, content), study_time = COALESCE(?, study_time), duration = COALESCE(?, duration) WHERE id = ? AND user_id = ?',
      [title, content, study_time, duration, req.params.id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '学习记录不存在'
      });
    }

    res.json({
      status: 'success',
      message: '学习记录更新成功'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: '服务器内部错误'
    });
  }
});

// 删除学习记录
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM study_records WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: '学习记录不存在'
      });
    }

    res.json({
      status: 'success',
      message: '学习记录删除成功'
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