require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const app = express();

// 中间件配置
//app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// 中间件配置
app.use(helmet({
crossOriginResourcePolicy: { policy: "cross-origin" },
contentSecurityPolicy: false
}));

app.use(cors({
origin: ['http://120.55.1.135:80','http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000','http://120.55.1.135:3001'],
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']
}));

// 配置安全响应头
app.use((req, res, next) => {
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('Server', 'WebServer');
next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 静态文件服务
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 路由配置
app.use('/api/auth', require('/routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/study', require('./routes/study'));
app.use('/api/users', require('./routes/users'));
app.use('/api/study', require('./routes/study'));
app.use('/api/news', require('./routes/news'));

// 新增身份验证中间件
// 在身份验证中间件中添加调试日志
app.use((req, res, next) => {
  console.log('验证请求路径:', req.path);
  console.log('请求头:', req.headers);
  const authRoutes = ['/api/users', '/api/study', '/api/news'];
  if (authRoutes.some(route => req.path.startsWith(route))) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ code: 401, message: '未授权访问' });
    // 这里应添加JWT验证逻辑
  }
  next();
});

// 优化路由配置（修复重复路由）
// 确保在静态文件中间件之前注册API路由
// 修正路由引用路径（将绝对路径改为相对路径）
app.use('/api/auth', require('./routes/auth'));  // 修改此处路径
app.use('/api/users', require('./routes/users'));
app.use('/api/study', require('./routes/study'));
app.use('/api/news', require('./routes/news'));

// 静态文件服务（必须在路由之后注册）
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 新增文件上传接口
const upload = require('./middlewares/upload');
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ 
    code: 200, 
    data: { url: `/uploads/${req.file.filename}` }
  });
});

// 处理前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误'
  });
});

// 环境变量配置
const PORT = process.env.PORT || 3001;

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});