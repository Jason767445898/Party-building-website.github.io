# 阳春河㙟党建网站

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](#)

一个功能完整的党建网站系统，采用前后端分离架构，为党员教育、信息发布、组织管理和文化宣传提供全面的数字化平台。

## 📋 目录

- [系统概览](#系统概览)
- [功能特性](#功能特性)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [安装部署](#安装部署)
- [API文档](#api文档)
- [数据库设计](#数据库设计)
- [配置说明](#配置说明)
- [部署指南](#部署指南)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)

## 🎯 系统概览

### 项目背景
阳春河㙟党建网站旨在为党员教育、信息发布、组织管理和文化宣传提供一个全面的平台。通过前后台分离的设计，满足普通用户、党员和管理员的多样化需求，提升党建工作的数字化和信息化水平。

### 核心价值
- 🎓 **党员教育**: 提供丰富的在线学习资源和互动学习平台
- 📢 **信息发布**: 高效的新闻资讯和通知公告发布系统
- 👥 **组织管理**: 完善的党员信息管理和组织关系维护
- 🏛️ **文化宣传**: 展示地方文化特色和党建工作成果

## ✨ 功能特性

### 🌐 前台功能 (用户 & 党员)

#### 📰 信息展示
- **首页**: 头条要闻、通知公告、专题专栏、快速通道
- **了解河㙟**: 地方文化和新闻的图文轮播展示
- **河㙟文旅**: 文旅景点和特色农产品展示
- **地图介绍**: 交互式地图展示各村信息

#### 🔐 党员服务平台
- **身份认证**: 安全的党员登录系统
- **党课学习**: 
  - 视频和文章形式的学习资料
  - 学习进度跟踪和统计
  - 学习记录管理
- **党员发展**: 完整的党员发展流程展示
- **个人中心**: 
  - 个人信息查看和管理
  - 学习统计和成果展示
  - 通知消息接收
  - 党费缴纳功能
- **AI客服**: 智能问答服务支持

### 🛠️ 后台功能 (管理员)

#### 📊 数据管理
- **仪表盘**: 
  - 党员数量统计
  - 学习资料统计
  - 资讯文章统计
  - 系统访问量分析
  - 最近活动展示

#### 👨‍💼 业务管理
- **党员管理**: 党员信息的增删改查操作
- **学习资料管理**: 课程资料的上传和管理
- **资讯管理**: 新闻资讯的发布和管理
- **系统设置**: 网站配置和密码管理

## 🏗️ 技术架构

### 架构模式
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (静态)    │───▶│   Nginx 代理     │───▶│   后端 API      │
│   HTML/CSS/JS   │    │   反向代理        │    │   Node.js       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │   MySQL 数据库   │
                                               │   数据存储        │
                                               └─────────────────┘
```

### 技术选型

#### 🎨 前端技术栈
- **HTML5**: 语义化标记和现代Web标准
- **CSS3**: 响应式设计和现代样式特性
- **JavaScript (ES6+)**: 现代JavaScript特性
- **Bootstrap**: 响应式UI框架
- **jQuery**: DOM操作和AJAX请求

#### ⚙️ 后端技术栈
- **Node.js**: 高性能JavaScript运行时
- **Express.js**: 轻量级Web应用框架
- **MySQL2**: 高性能MySQL数据库连接器
- **JWT**: 无状态身份认证
- **bcryptjs**: 密码安全加密
- **CORS**: 跨域资源共享支持
- **Helmet**: 安全中间件
- **express-validator**: 数据验证中间件

#### 🗄️ 数据库
- **MySQL 8.0+**: 关系型数据库管理系统

## 📁 项目结构

```
阳春河㙟党建网站/
├── 📄 前端页面文件
│   ├── index.html                   # 🏠 网站首页
│   ├── admin-dashboard.html         # 🛠️ 管理员后台页面
│   ├── party-member-login.html      # 🔐 党员登录页面
│   ├── party-member-dashboard.html  # 👤 党员仪表盘
│   ├── party-study.html            # 📚 党课学习页面
│   ├── personal-center.html        # 🏠 个人中心
│   ├── countrynews.html            # 📰 了解河㙟
│   ├── travel.html                 # 🏞️ 河㙟文旅
│   └── map.html                    # 🗺️ 地图介绍
│
├── 📁 js/                          # 前端JavaScript模块
│   ├── api.js                      # 🔌 API接口封装
│   ├── main.js                     # 🎯 主要功能模块
│   ├── login.js                    # 🔐 登录功能
│   ├── admin-dashboard.js          # 🛠️ 管理员仪表盘
│   ├── party-member.js             # 👤 党员功能
│   ├── party-study.js              # 📚 学习中心
│   ├── personal-center.js          # 🏠 个人中心
│   ├── map.js                      # 🗺️ 地图交互
│   ├── news-detail.js             # 📰 新闻详情
│   └── mobile-nav.js               # 📱 移动端导航
│
├── 📁 styles/                      # CSS样式文件
│   ├── main.css                    # 🎨 主要样式
│   ├── indexmain.css               # 🏠 首页样式
│   ├── login.css                   # 🔐 登录页样式
│   ├── admin-dashboard.css         # 🛠️ 管理后台样式
│   ├── dashboard.css               # 📊 仪表盘样式
│   ├── party-study.css             # 📚 学习页面样式
│   ├── personal-center.css         # 🏠 个人中心样式
│   └── map.css                     # 🗺️ 地图页面样式
│
├── 📁 picture/                     # 图片资源文件
│   ├── icons8-锤子和镰刀-96.png      # 🚩 党建logo
│   ├── 习近平讲话.jpg               # 📸 领导人图片
│   ├── 开会.jpg                    # 📸 会议图片
│   ├── 宝星坚果01.jpg               # 🌰 特产图片
│   ├── 凌霄岩.jpg                  # 🏞️ 景点图片
│   └── ...(其他图片资源)
│
├── 📁 server/                      # 后端服务代码
│   ├── index.js                    # 🚀 服务器入口文件
│   ├── package.json                # 📦 项目依赖配置
│   ├── database.sql                # 🗄️ 数据库结构和初始数据
│   │
│   ├── 📁 config/                  # ⚙️ 配置文件
│   │   └── db.js                   # 🗄️ 数据库连接配置
│   │
│   ├── 📁 routes/                  # 🛤️ API路由
│   │   ├── auth.js                 # 🔐 身份认证路由
│   │   ├── users.js                # 👤 用户管理路由
│   │   ├── study.js                # 📚 学习资料路由
│   │   └── news.js                 # 📰 新闻资讯路由
│   │
│   └── 📁 middleware/              # 🔧 中间件
│       └── auth.js                 # 🔐 JWT认证中间件
│
├── 📁 routes/ (旧版本)             # ⚠️ 待迁移的路由文件
└── 📄 README.md                    # 📖 项目说明文档
```

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: v16.0.0 或更高版本
- **MySQL**: v8.0 或更高版本
- **npm**: v8.0.0 或更高版本
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 20.04+

### ⚡ 一键启动 (推荐)

```bash
# 1. 克隆项目
git clone <repository-url>
cd dist

# 2. 安装依赖
cd server && npm install && cd ..

# 3. 配置数据库(请先确保MySQL服务已启动)
mysql -u root -p < server/database.sql

# 4. 启动后端服务
cd server && npm run dev

# 5. 在浏览器中访问 http://localhost:3001
```

## 🔧 安装部署

### 1️⃣ 项目获取

```bash
# 克隆仓库
git clone <repository-url>
cd dist

# 查看项目结构
tree -I node_modules
```

### 2️⃣ 数据库配置

#### 创建数据库
```sql
-- 登录MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE dangjianweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE dangjianweb;

-- 导入数据结构
source /path/to/server/database.sql;
```

#### 配置连接参数
创建环境配置文件 `server/.env`:

```env
# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dangjianweb

# 服务配置
PORT=3001
NODE_ENV=development

# JWT配置
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here

# 其他配置
UPLOAD_PATH=./uploads
LOG_LEVEL=info
```

### 3️⃣ 后端服务安装

```bash
# 进入后端目录
cd server

# 安装依赖包
npm install

# 验证安装
npm list --depth=0
```

### 4️⃣ 启动服务

#### 开发模式
```bash
# 启动开发服务器 (支持热重载)
npm run dev

# 输出示例:
# [nodemon] 3.0.3
# [nodemon] to restart at any time, enter `rs`
# [nodemon] watching path(s): *.*
# [nodemon] watching extensions: js,mjs,json
# [nodemon] starting `node index.js`
# 服务器运行在端口 3001
```

#### 生产模式
```bash
# 启动生产服务器
npm start

# 使用PM2管理进程 (推荐)
npm install -g pm2
pm2 start index.js --name "dangjianweb"
pm2 logs dangjianweb
pm2 status
```

### 5️⃣ 前端访问

#### 本地开发
```bash
# 方法1: 直接打开HTML文件
open index.html

# 方法2: 使用Live Server (推荐)
npx live-server --port=8080 --open=index.html

# 方法3: 使用Python简单服务器
python3 -m http.server 8080
```

#### 访问地址
- **前端页面**: http://localhost:8080
- **后端API**: http://localhost:3001
- **API文档**: http://localhost:3001/api-docs (如果配置了Swagger)

## 👨‍💻 使用说明

### 🔐 默认账号

| 角色 | 用户名 | 密码 | 说明 |
|------|--------|------|------|
| 管理员 | `admin` | `123456` | 系统管理员账号 |
| 党员 | `DJ001` | `123456` | 示例党员账号 |
| 党员 | `13800138000` | `123456` | 手机号登录示例 |
| 党员 | `13800138001` | `123456` | 手机号登录示例 |

> ⚠️ **安全提示**: 首次登录后请立即修改默认密码！

### 🚪 访问入口

#### 管理员入口
```
访问地址: /admin-dashboard.html
功能权限: 全部管理功能
主要操作:
  - 党员信息管理
  - 学习资料管理  
  - 新闻资讯管理
  - 系统数据统计
```

#### 党员入口
```
访问地址: /party-member-login.html
功能权限: 党员服务功能
主要操作:
  - 在线学习
  - 个人信息查看
  - 通知消息接收
  - 党费缴纳
```

#### 公众入口
```
访问地址: /index.html
功能权限: 公开信息浏览
主要内容:
  - 新闻资讯浏览
  - 文旅信息查看
  - 地图信息展示
```

## 🔌 API文档

### 🔐 身份认证 API

#### POST /api/auth/login
用户登录接口

**请求参数:**
```json
{
  "username": "string",  // 用户名或手机号
  "password": "string"   // 密码
}
```

**响应示例:**
```json
{
  "status": "success",
  "role": "admin",  // admin | member
  "token": "jwt_token_here"
}
```

#### POST /api/auth/logout
用户退出登录

### 👤 用户管理 API

#### GET /api/users
获取用户列表 (需要管理员权限)

**响应示例:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/users
创建新用户 (需要管理员权限)

#### PUT /api/users/:id
更新用户信息

#### DELETE /api/users/:id
删除用户 (需要管理员权限)

### 📚 学习资料 API

#### GET /api/study/materials
获取学习资料列表

**查询参数:**
- `category`: 类别筛选 (policy|theory|history|news)
- `page`: 页码 (默认1)
- `limit`: 每页数量 (默认10)

#### GET /api/study/materials/:id
获取学习资料详情

#### POST /api/study/materials
创建学习资料 (需要管理员权限)

### 📰 新闻资讯 API

#### GET /api/news
获取新闻列表

#### GET /api/news/:id
获取新闻详情

#### POST /api/news
创建新闻 (需要管理员权限)

### 📡 通用响应格式

**成功响应:**
```json
{
  "status": "success",
  "data": {...},
  "message": "操作成功"
}
```

**错误响应:**
```json
{
  "status": "error",
  "code": 400,
  "message": "错误描述",
  "details": "..."
}
```

## 🗄️ 数据库设计

### 数据表结构

#### users 表 - 用户基础信息
| 字段 | 类型 | 描述 | 约束 |
|------|------|------|------|
| id | INT | 主键 | AUTO_INCREMENT |
| username | VARCHAR(50) | 用户名 | UNIQUE, NOT NULL |
| password | VARCHAR(255) | 加密密码 | NOT NULL |
| email | VARCHAR(100) | 邮箱 | NOT NULL |
| role | ENUM | 角色 | 'admin', 'member' |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

#### user_profiles 表 - 用户详细信息
| 字段 | 类型 | 描述 | 约束 |
|------|------|------|------|
| id | INT | 主键 | AUTO_INCREMENT |
| user_id | INT | 用户ID | FOREIGN KEY |
| real_name | VARCHAR(50) | 真实姓名 | |
| phone | VARCHAR(20) | 手机号码 | |
| department | VARCHAR(100) | 所属部门 | |
| position | VARCHAR(100) | 职务 | |
| join_date | DATE | 入党日期 | |

#### study_materials 表 - 学习资料
| 字段 | 类型 | 描述 | 约束 |
|------|------|------|------|
| id | INT | 主键 | AUTO_INCREMENT |
| title | VARCHAR(200) | 标题 | NOT NULL |
| content | TEXT | 内容 | NOT NULL |
| category | ENUM | 类别 | 'policy', 'theory', 'history', 'news' |
| author | VARCHAR(50) | 作者 | |
| publish_date | DATE | 发布日期 | |

#### study_records 表 - 学习记录
| 字段 | 类型 | 描述 | 约束 |
|------|------|------|------|
| id | INT | 主键 | AUTO_INCREMENT |
| user_id | INT | 用户ID | FOREIGN KEY |
| material_id | INT | 资料ID | FOREIGN KEY |
| status | ENUM | 状态 | 'started', 'completed' |
| progress | INT | 进度 | 0-100 |

### 数据关系图
```
users (1) ---- (1) user_profiles
  |
  │
  v
study_records (n) ---- (1) study_materials
```

## ⚙️ 配置说明

### 环境变量配置

在 `server/.env` 文件中配置以下参数:

```env
# ===========================================
# 数据库配置
# ===========================================
DB_HOST=localhost                    # 数据库主机地址
DB_USER=root                         # 数据库用户名
DB_PASSWORD=your_mysql_password      # 数据库密码
DB_NAME=dangjianweb                  # 数据库名
DB_PORT=3306                         # 数据库端口

# ===========================================
# 服务配置
# ===========================================
PORT=3001                            # 后端服务端口
NODE_ENV=development                 # 运行环境 development|production
CORS_ORIGIN=http://localhost:8080    # 允许的前端域名

# ===========================================
# 安全配置
# ===========================================
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=24h                   # JWT过期时间
SESSION_SECRET=your_session_secret_key_change_in_production
SESSION_TIMEOUT=3600000              # 会话超时时间 (毫秒)

# ===========================================
# 文件上传配置
# ===========================================
UPLOAD_PATH=./uploads                # 上传文件存储路径
MAX_FILE_SIZE=10485760               # 最大文件大小 (10MB)
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx

# ===========================================
# 日志配置
# ===========================================
LOG_LEVEL=info                       # 日志级别 debug|info|warn|error
LOG_FILE=./logs/app.log             # 日志文件路径

# ===========================================
# 缓存配置
# ===========================================
REDIS_HOST=localhost                 # Redis主机 (可选)
REDIS_PORT=6379                      # Redis端口
REDIS_PASSWORD=                      # Redis密码

# ===========================================
# 邮件配置 (可选)
# ===========================================
SMTP_HOST=smtp.example.com           # SMTP服务器
SMTP_PORT=587                        # SMTP端口
SMTP_USER=your_email@example.com     # SMTP用户名
SMTP_PASS=your_email_password        # SMTP密码
```

### Nginx 配置示例

创建 Nginx 配置文件 `/etc/nginx/sites-available/dangjianweb`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 日志配置
    access_log /var/log/nginx/dangjianweb_access.log;
    error_log /var/log/nginx/dangjianweb_error.log;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # 前端静态文件
    location / {
        root /var/www/dangjianweb;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # 缓存配置
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, no-transform";
        }
    }
    
    # 后端API代理
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

## 🚀 部署指南

### 💻 Windows + Nginx 部署

#### 1️⃣ 前置准备

**环境检查:**
```powershell
# 检查Node.js
node --version  # 应输出 v16.0.0+
npm --version   # 应输出 8.0.0+

# 检查MySQL
mysql --version # 应输出 8.0+
```

#### 2️⃣ 安装 Nginx

```powershell
# 下载 Nginx for Windows
# 访问: https://nginx.org/en/download.html
# 下载: nginx/Windows-x.x.x

# 解压到 C:\nginx
Extract-Archive -Path nginx-x.x.x.zip -DestinationPath C:\

# 重命名为 nginx
Rename-Item "C:\nginx-x.x.x" "C:\nginx"
```

#### 3️⃣ 项目部署

```powershell
# 复制项目到 Nginx 目录
Copy-Item -Path "./dist" -Destination "C:\nginx\html\" -Recurse

# 设置正确的目录结构
C:\nginx\html\dist\  # 项目文件
```

#### 4️⃣ 配置 Nginx

编辑 `C:\nginx\conf\nginx.conf`:

```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    
    # 主服务配置
    server {
        listen       80;
        server_name  localhost;
        
        # 静态文件服务
        location / {
            root   html/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        
        # API代理
        location /api/ {
            proxy_pass http://localhost:3001/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # 错误页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

#### 5️⃣ 配置后端服务

```powershell
# 进入后端目录
cd C:\nginx\html\dist\server

# 安装依赖
npm install --production

# 创建生产环境配置
echo "NODE_ENV=production" > .env
echo "PORT=3001" >> .env
echo "DB_HOST=localhost" >> .env
echo "DB_USER=root" >> .env
echo "DB_PASSWORD=your_password" >> .env
echo "DB_NAME=dangjianweb" >> .env
```

#### 6️⃣ 创建 Windows 服务

使用 PM2 管理进程:

```powershell
# 全局安装 PM2
npm install -g pm2
npm install -g pm2-windows-service

# 配置 PM2 为 Windows 服务
pm2-service-install

# 启动应用
cd C:\nginx\html\dist\server
pm2 start index.js --name "dangjianweb-api"
pm2 save
pm2 startup
```

#### 7️⃣ 防火墙配置

```powershell
# 开放端口 (以管理员身份运行)
New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80
New-NetFirewallRule -DisplayName "Allow Node.js" -Direction Inbound -Protocol TCP -LocalPort 3001

# 允许 Nginx 和 Node.js 通过防火墙
New-NetFirewallRule -DisplayName "Nginx" -Direction Inbound -Program "C:\nginx\nginx.exe"
New-NetFirewallRule -DisplayName "Node.js" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe"
```

#### 8️⃣ 启动服务

```powershell
# 启动 Nginx (以管理员身份)
cd C:\nginx
start nginx.exe

# 检查服务状态
tasklist | findstr nginx
tasklist | findstr node

# 检查端口占用
netstat -ano | findstr :80
netstat -ano | findstr :3001
```

### 🐧 Linux + Nginx 部署

#### 1️⃣ 系统准备

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nginx nodejs npm mysql-server

# CentOS/RHEL
sudo yum install -y epel-release
sudo yum install -y nginx nodejs npm mysql-server

# 启动服务
sudo systemctl start nginx
sudo systemctl start mysql
sudo systemctl enable nginx
sudo systemctl enable mysql
```

#### 2️⃣ 项目部署

```bash
# 创建部署目录
sudo mkdir -p /var/www/dangjianweb
sudo chown -R $USER:$USER /var/www/dangjianweb

# 复制项目文件
cp -r ./dist/* /var/www/dangjianweb/

# 设置权限
chmod -R 755 /var/www/dangjianweb
```

#### 3️⃣ 配置 Nginx

创建配置文件 `/etc/nginx/sites-available/dangjianweb`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/dangjianweb;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用站点:
```bash
sudo ln -s /etc/nginx/sites-available/dangjianweb /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4️⃣ 配置后端服务

```bash
# 进入后端目录
cd /var/www/dangjianweb/server

# 安装依赖
npm install --production

# 创建服务文件
sudo tee /etc/systemd/system/dangjianweb.service > /dev/null <<EOF
[Unit]
Description=DangJian Web API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/dangjianweb/server
ExecStart=/usr/bin/node index.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
EOF

# 启动服务
sudo systemctl daemon-reload
sudo systemctl start dangjianweb
sudo systemctl enable dangjianweb
```

### 🐋 Docker 部署 (推荐)

#### Dockerfile 示例

创建 `Dockerfile`:

```dockerfile
# 多阶段构建
FROM node:18-alpine AS backend-builder

# 设置工作目录
WORKDIR /app/server

# 复制后端依赖文件
COPY server/package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制后端源码
COPY server/ ./

# 生产镜像
FROM nginx:alpine

# 安装 Node.js
RUN apk add --no-cache nodejs npm

# 复制前端文件
COPY --chown=nginx:nginx index.html party-*.html admin-*.html countrynews.html travel.html map.html /usr/share/nginx/html/
COPY --chown=nginx:nginx js/ /usr/share/nginx/html/js/
COPY --chown=nginx:nginx styles/ /usr/share/nginx/html/styles/
COPY --chown=nginx:nginx picture/ /usr/share/nginx/html/picture/

# 复制后端文件
COPY --from=backend-builder /app/server /app/server
WORKDIR /app/server

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动脚本
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  # 数据库服务
  mysql:
    image: mysql:8.0
    container_name: dangjianweb-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./server/database.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"
    restart: unless-stopped
    
  # Web应用
  web:
    build: .
    container_name: dangjianweb-app
    environment:
      - DB_HOST=mysql
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "80:80"
    depends_on:
      - mysql
    restart: unless-stopped
    volumes:
      - ./uploads:/app/server/uploads

volumes:
  mysql_data:
```

#### 启动脚本 start.sh

```bash
#!/bin/sh

# 启动后端服务
cd /app/server
node index.js &

# 启动 Nginx
nginx -g 'daemon off;'
```

#### 部署命令

```bash
# 创建 .env 文件
cat > .env << EOF
DB_USER=dangjian
DB_PASSWORD=your_secure_password
DB_NAME=dangjianweb
JWT_SECRET=your_super_secret_jwt_key
EOF

# 构建和启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 更新服务
docker-compose pull && docker-compose up -d
```

### 🔧 运维命令

#### Nginx 管理
```bash
# Windows
cd C:\nginx
start nginx.exe          # 启动
nginx -s reload          # 重新加载配置
nginx -s quit            # 优雅停止
taskkill /f /im nginx.exe # 强制停止

# Linux
sudo systemctl start nginx    # 启动
sudo systemctl reload nginx   # 重新加载
sudo systemctl stop nginx     # 停止
sudo nginx -t                 # 测试配置
```

#### PM2 管理
```bash
pm2 start index.js --name dangjianweb  # 启动
pm2 restart dangjianweb                # 重启
pm2 stop dangjianweb                   # 停止
pm2 delete dangjianweb                 # 删除
pm2 logs dangjianweb                   # 查看日志
pm2 monit                              # 监控面板
```

#### 数据库管理
```bash
# 备份数据库
mysqldump -u root -p dangjianweb > backup_$(date +%Y%m%d).sql

# 恢复数据库
mysql -u root -p dangjianweb < backup_20240101.sql

# 查看数据库状态
mysql -u root -p -e "SHOW DATABASES; USE dangjianweb; SHOW TABLES;"
```

## ❓ 常见问题

### 🔧 故障排除

#### Q: 数据库连接失败
```bash
# 检查MySQL服务状态
# Windows: sc query mysql
# Linux: sudo systemctl status mysql

# 检查数据库配置
cat server/.env | grep DB_

# 测试数据库连接
mysql -h localhost -u root -p
```

**解决方案:**
1. 确保MySQL服务正在运行
2. 检查数据库配置信息是否正确
3. 确保数据库和表已正确创建

#### Q: 端口占用问题
```bash
# 检查端口占用
# Windows: netstat -ano | findstr :3001
# Linux: sudo lsof -i :3001

# 终止占用端口的进程
# Windows: taskkill /PID <PID> /F
# Linux: sudo kill -9 <PID>
```

#### Q: Nginx 404 错误
**可能原因:**
1. 文件路径不正确
2. 文件权限问题
3. Nginx配置错误

**解决方案:**
```bash
# 检查文件是否存在
ls -la /var/www/dangjianweb/index.html

# 检查Nginx配置
sudo nginx -t

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/error.log
```

#### Q: API请求失败
```bash
# 检查后端服务状态
curl http://localhost:3001/api/news

# 查看后端日志
pm2 logs dangjianweb
```

#### Q: 前端白屏问题
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 和 Network 选项卡
3. 检查是否有JavaScript错误或资源加载失败

### 📊 性能优化建议

#### 数据库优化
```sql
-- 添加索引
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_category ON study_materials(category);
CREATE INDEX idx_user_material ON study_records(user_id, material_id);

-- 清理旧数据
DELETE FROM study_records WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

#### 前端优化
- 启用Gzip压缩
- 优化图片大小和格式
- 使用浏览器缓存
- 合并和压缩CSS/JS文件
- 使用CDN加速静态资源

#### 后端优化
```javascript
// 数据库连接池配置
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
});

// 添加响应缓存
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.set('Cache-Control', 'public, max-age=300'); // 5分钟缓存
    }
    next();
});
```

### 🔒 安全配置建议

#### 密码安全
```javascript
// 强密码策略
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 密码加密强度配置
const saltRounds = 12; // 增加bcrypt加密轮数
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

#### 环境变量保护
```bash
# 生产环境中务必修改默认密码
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars
SESSION_SECRET=your_super_secure_session_secret_key
DB_PASSWORD=your_secure_database_password
```

#### SSL/HTTPS 配置
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 📈 监控和日志

#### 日志配置
```javascript
// 安装winston和日志轮转
npm install winston winston-daily-rotate-file

// logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;
```

#### 备份策略
```bash
#!/bin/bash
# backup.sh - 自动备份脚本

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/dangjianweb"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 数据库备份
mysqldump -u root -p$DB_PASSWORD dangjianweb > $BACKUP_DIR/db_$DATE.sql

# 代码备份
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /var/www/dangjianweb

# 清理旧备份 (保留7天)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: $DATE"
```

设置定时任务:
```bash
# 编辑crontab
crontab -e

# 每天凌晨2点备份
0 2 * * * /path/to/backup.sh
```

## 📚 学习资源

### 相关技术文档
- [Node.js 官方文档](https://nodejs.org/docs/) - Node.js运行时文档
- [Express.js 指南](https://expressjs.com/) - Web框架指南
- [MySQL 教程](https://dev.mysql.com/doc/) - 数据库管理文档
- [Nginx 配置指南](https://nginx.org/en/docs/) - Web服务器配置
- [JWT 介绍](https://jwt.io/introduction/) - 身份认证标准

### 前端框架参考
- [Bootstrap 组件](https://getbootstrap.com/docs/) - CSS框架文档
- [jQuery API](https://api.jquery.com/) - JavaScript库文档
- [CSS Grid 指南](https://css-tricks.com/snippets/css/complete-guide-grid/) - 布局指南
- [响应式设计原则](https://web.dev/responsive-web-design-basics/) - 移动端适配

### 安全最佳实践
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web安全风险
- [Node.js 安全清单](https://blog.risingstack.com/node-js-security-checklist/) - 后端安全
- [Web 应用安全](https://cheatsheetseries.owasp.org/) - 安全开发指南

## 🤝 贡献指南

欢迎参与项目开发！请遵循以下步骤：

### 🔨 开发环境搭建

1. **Fork 项目**
   ```bash
   git clone https://github.com/yourusername/dangjianweb.git
   cd dangjianweb
   ```

2. **创建开发分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **安装开发依赖**
   ```bash
   cd server
   npm install
   npm install -g nodemon  # 全局安装nodemon
   ```

4. **配置开发环境**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件设置本地数据库信息
   ```

### 📋 代码规范

#### JavaScript 编码规范
```javascript
// 使用分号结尾
const userName = 'admin';

// 使用驼峰命名
function getUserById(id) {
    return users.find(user => user.id === id);
}

// 使用常量大写
const API_BASE_URL = 'http://localhost:3001';

// 错误处理
try {
    const result = await apiCall();
    return result;
} catch (error) {
    logger.error('错误信息', error);
    throw error;
}
```

#### CSS 编码规范
```css
/* 使用中划线命名 */
.user-profile {
    display: flex;
    flex-direction: column;
}

/* 属性排序: 布局 -> 盒模型 -> 视觉 */
.card {
    position: relative;
    display: flex;
    margin: 10px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

#### SQL 命名规范
```sql
-- 表名使用复数形式
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 字段名使用下划线分隔
ALTER TABLE user_profiles ADD COLUMN phone_number VARCHAR(20);
```

### 📝 提交指南

#### 提交信息格式
```
type(scope): subject

<body>

<footer>
```

**type 类型:**
- `feat`: 新功能
- `fix`: bug修复
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 其他修改

**示例:**
```
feat(auth): 添加用户登录功能

- 实现JWT认证
- 添加密码加密
- 添加登录状态管理

Closes #123
```

### 📋 Pull Request 指南

1. **描述清楚**
   - 详细说明修改内容
   - 列出相关的issue编号

2. **测试覆盖**
   - 添加相关单元测试
   - 确保现有测试通过

3. **代码检查**
   - 遵循代码规范
   - 添加必要的注释

### 🐛 问题报告

发现bug请使用以下模板:

```markdown
## Bug 描述
简要描述bug的现象

## 复现步骤
1. 访问...
2. 点击...
3. 滚动到...
4. 出现错误

## 期望结果
描述期望的正确行为

## 实际结果
描述实际发生的情况

## 环境信息
- 操作系统: [e.g. Windows 10]
- 浏览器: [e.g. Chrome 91.0]
- Node.js 版本: [e.g. 16.14.0]

## 附加信息
添加截图或错误日志
```

### 🎆 发布流程

1. **版本号规则**: 遵循 [Semantic Versioning](https://semver.org/)
   - MAJOR: 不兼容的更改
   - MINOR: 向后兼容的新功能
   - PATCH: 向后兼容的bug修复

2. **发布步骤**:
   ```bash
   # 更新版本号
   npm version patch  # 或 minor / major
   
   # 创建发布标签
   git tag -a v1.0.1 -m "Release version 1.0.1"
   
   # 推送到仓库
   git push origin main --tags
   ```

## 📋 更新日志

### v1.2.0 (2024-03-20)
**新增功能:**
- ✨ 添加用户头像上传功能
- ✨ 新增学习进度统计图表
- ✨ 实现移动端响应式设计
- ✨ 增加AI客服功能雏形

**问题修复:**
- 🐛 修复登录页面在IE浏览器的兼容问题
- 🐛 解决文件上传大小限制问题
- 🐛 修复Nginx配置中的路径问题

**优化改进:**
- ⚡ 优化数据库查询性能
- 💱 减少首页加载时间50%
- 🔒 增强JWT安全性配置

### v1.1.0 (2024-02-15)
**新增功能:**
- ✨ 增加在线学习评估功能
- ✨ 新增批量导入党员信息
- ✨ 实现学习进度跟踪

**问题修复:**
- 🐛 修复数据库连接池溢出问题
- 🐛 解决密码重置功能缺陷

### v1.0.0 (2024-01-01)
**初始发布:**
- 🎉 项目初始化和基础架构搭建
- ✨ 实现基本用户管理功能
- ✨ 实现学习资料管理系统
- ✨ 实现新闻资讯发布系统
- ✨ 实现党员登录和身份认证
- ✨ 实现响应式前端界面

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

```
MIT License

Copyright (c) 2024 阳春河㙟党建网站项目组

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## 🙏 致谢

感谢以下开源项目和社区的支持：

### 🔧 技术依赖
- [Node.js](https://nodejs.org/) - 高性能JavaScript运行时
- [Express.js](https://expressjs.com/) - 简洁灵活Web应用框架
- [MySQL](https://mysql.com/) - 可靠稳定的关系型数据库
- [Bootstrap](https://getbootstrap.com/) - 响应式CSS框架
- [jQuery](https://jquery.com/) - 简化DOM操作的JavaScript库
- [Nginx](https://nginx.org/) - 高性能Web服务器

### 👤 贡献者
感谢所有为这个项目做出贡献的开发者和用户：

### 🌐 社区支持
特别感谢以下组织和社区的支持：
- 中国开源软件推进联盟 (COPU)
- Node.js 中文社区
- 阳春市委组织部
- 河㙟街道党工委

---

<div align="center">
  <img src="picture/icons8-锤子和镰刀-96.png" alt="党建 Logo" width="64" height="64">
  <br><br>
  <strong>阳春河㙟党建网站</strong><br>
  <em>为党建工作数字化贡献力量</em> 💪<br><br>
  
  [![Stars](https://img.shields.io/github/stars/yourusername/dangjianweb?style=social)](https://github.com/yourusername/dangjianweb/stargazers)
  [![Forks](https://img.shields.io/github/forks/yourusername/dangjianweb?style=social)](https://github.com/yourusername/dangjianweb/network/members)
  [![Issues](https://img.shields.io/github/issues/yourusername/dangjianweb)](https://github.com/yourusername/dangjianweb/issues)
  [![License](https://img.shields.io/github/license/yourusername/dangjianweb)](https://github.com/yourusername/dangjianweb/blob/main/LICENSE)
  
  <br>
  
  如果本项目对您有帮助，请给我们一个 ⭐ **Star**！<br>
  您的支持是我们持续改进的动力。
  
  <br>
  
  **“不忘初心、牢记使命，用数字化赋能党建新时代”**
  
</div>