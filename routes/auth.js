const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 查询用户（支持党员编号或手机号登录）
        const [users] = await pool.execute(
            'SELECT u.*, p.phone FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.username = ? OR p.phone = ?',
            [username, username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: '用户名或密码错误'
            });
        }

        const user = users[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: '用户名或密码错误'
            });
        }

        // 生成 JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // 返回用户信息和token
        res.json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({
            status: 'error',
            message: '服务器内部错误'
        });
    }
});

module.exports = router;