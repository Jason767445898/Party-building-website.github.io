const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const session = require('express-session');

// 会话配置
router.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1小时
    }
}));

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 数据库查询
        const [users] = await pool.query(
            'SELECT id, username, password_hash, role FROM users WHERE username = ?', 
            [username]
        );
        
        if (users.length === 0 || !bcrypt.compareSync(password, users[0].password_hash)) {
            return res.status(401).json({ 
                status: 'error',
                message: '用户名或密码错误' 
            });
        }

        // 设置会话
        req.session.user = {
            id: users[0].id,
            username: users[0].username,
            role: users[0].role
        };

        res.json({
            status: 'success',
            role: users[0].role
        });
        
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({
            status: 'error',
            message: '服务器内部错误'
        });
    }
});