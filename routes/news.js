const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// 获取所有新闻
router.get('/', async (req, res) => {
  try {
    const [news] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(news);
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    res.status(500).json({ message: '获取新闻列表失败' });
  }
});

// 获取单个新闻
router.get('/:id', async (req, res) => {
  try {
    const [news] = await db.query('SELECT * FROM news WHERE id = ?', [req.params.id]);
    if (news.length === 0) {
      return res.status(404).json({ message: '新闻不存在' });
    }
    res.json(news[0]);
  } catch (error) {
    console.error('获取新闻详情失败:', error);
    res.status(500).json({ message: '获取新闻详情失败' });
  }
});

// 创建新闻（需要管理员权限）
router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO news (title, content, category, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, category]
    );
    res.status(201).json({ id: result.insertId, message: '新闻创建成功' });
  } catch (error) {
    console.error('创建新闻失败:', error);
    res.status(500).json({ message: '创建新闻失败' });
  }
});

// 更新新闻（需要管理员权限）
router.put('/:id', auth, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE news SET title = ?, content = ?, category = ? WHERE id = ?',
      [title, content, category, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '新闻不存在' });
    }
    res.json({ message: '新闻更新成功' });
  } catch (error) {
    console.error('更新新闻失败:', error);
    res.status(500).json({ message: '更新新闻失败' });
  }
});

// 删除新闻（需要管理员权限）
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM news WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '新闻不存在' });
    }
    res.json({ message: '新闻删除成功' });
  } catch (error) {
    console.error('删除新闻失败:', error);
    res.status(500).json({ message: '删除新闻失败' });
  }
});

module.exports = router;