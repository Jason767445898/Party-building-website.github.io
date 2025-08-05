# 阳春河㙟党建网站

这是一个功能丰富的党建网站，旨在提供一个全面的平台，用于党员教育、信息发布、组织管理和文化宣传。项目分为面向普通用户和党员的前台，以及一个功能强大的管理员后台。

## 主要功能

### 前台 (用户 & 党员)

- **首页**: 展示头条要闻、通知公告、专题专栏和快速通道。
- **了解河㙟**: 通过图文和轮播介绍地方文化和新闻。
- **河㙟文旅**: 展示当地的文旅景点和特色农产品。
- **地图介绍**: 交互式地图，展示各个村的地理位置和基本信息。
- **党员登录**: 为党员和管理员提供登录入口。
- **党员服务平台**: 
    - **党课学习**: 提供在线课程学习，包括视频和文章。
    - **党员发展**: 展示党员发展的完整流程。
    - **个人中心**: 党员可以查看个人信息、学习统计、通知和缴纳党费。
    - **AI 客服**: 提供智能问答服务。

### 后台 (管理员)

- **仪表盘**: 统计党员总数、学习资料数、资讯文章数和系统访问量，并展示最近活动。
- **党员管理**: 管理党员信息（增删改查）。
- **学习资料管理**: 管理在线学习的课程和资料。
- **资讯管理**: 发布和管理新闻资讯。
- **系统设置**: 配置网站基本信息和修改管理员密码。

## 技术栈

- **前端**: 
    - HTML5
    - CSS3 (包括响应式设计)
    - JavaScript (ES6+)
    - [Bootstrap](https://getbootstrap.com/)
    - [jQuery](https://jquery.com/)

- **后端**: 
    - [Node.js](https://nodejs.org/)
    - [Express.js](https://expressjs.com/)
    - [MySQL2](https://github.com/sidorares/node-mysql2) for database connection
    - [JSON Web Token (JWT)](https://jwt.io/) for authentication
    - [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing

- **数据库**: 
    - MySQL

## 项目结构

```
/dist
├── admin-dashboard.html         # 管理员后台页面
├── index.html                   # 网站首页
├── party-member-login.html      # 党员登录页面
├── ... (其他HTML文件)
├── js/                          # 前端JavaScript文件
│   ├── admin-dashboard.js
│   ├── login.js
│   └── ...
├── styles/                      # CSS样式文件
│   ├── admin-dashboard.css
│   ├── indexmain.css
│   └── ...
├── picture/                     # 项目图片资源
├── server/                      # 后端服务代码
│   ├── index.js                 # 服务器入口文件
│   ├── package.json             # 后端依赖
│   ├── database.sql             # 数据库结构和初始数据
│   ├── config/                  # 配置文件 (数据库连接)
│   ├── routes/                  # API路由
│   └── middleware/              # 中间件 (认证等)
└── README.md                    # 项目说明文件
```

## 安装与启动

1.  **克隆仓库**

    ```bash
    git clone <repository-url>
    cd dist
    ```

2.  **配置数据库**

    - 确保您已安装并运行 MySQL 服务。
    - 在 `server/config/db.js` 文件中，根据您的本地环境修改数据库连接配置（主机、用户名、密码、数据库名）。
    - 使用 `server/database.sql` 文件中的 SQL 语句创建数据库和表，并插入初始数据。

3.  **安装后端依赖**

    ```bash
    cd server
    npm install
    ```

4.  **启动后端服务**

    ```bash
    # 开发模式 (使用 nodemon 自动重启)
    npm run dev

    # 或者生产模式
    npm start
    ```

    后端服务默认运行在 `http://localhost:3001`。

5.  **访问前端页面**

    - 直接在浏览器中打开根目录下的 `.html` 文件即可访问。推荐使用 Live Server 等工具在本地服务器上运行，以避免潜在的 CORS 问题。

## 使用说明

- **管理员**: 
    - 访问 `admin-dashboard.html`。
    - 默认管理员账号: `admin` / 密码: (请查看 `database.sql` 中的加密密码，或在注册新管理员后使用)。
- **党员**: 
    - 访问 `party-member-login.html` 进行登录。
    - 示例党员账号: `DJ001` / 密码: (同上)。

## 部署说明 (Windows + Nginx)

以下是在 Windows 服务器上使用 Nginx 进行反向代理部署的标准化步骤。

### 1. 安装 Nginx

- **下载 Nginx**: 访问 [Nginx 官网](https://nginx.org/en/download.html) 下载适用于 Windows 的稳定版 (`nginx/Windows-xxx`)。
- **解压**: 将下载的压缩包解压到 `C:\nginx` 目录。

### 2. 放置项目文件

- 将整个项目文件夹命名为 `dist`，并复制到 Nginx 的 `html` 目录下，路径为 `C:\nginx\html\dist`。

### 3. 配置 Nginx 反向代理

- **修改配置文件**: 打开 `C:\nginx\conf\nginx.conf` 并进行如下修改：

  ```nginx
  server {
      listen        80; # 监听80端口
      server_name   your_domain_or_ip; # 替换为您的域名或服务器IP

      # 配置前端静态文件
      location / {
          root   html/dist; # 指向项目文件根目录
          index  index.html index.htm;
          try_files $uri $uri/ /index.html; # 解决前端路由刷新404问题
      }

      # 配置后端API代理
      location /api/ {
          proxy_pass http://localhost:3001/; # 代理到后端Node.js服务
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
      }
  }
  ```

### 4. 启动服务

- **启动后端服务**: 
  打开命令提示符（CMD），进入后端服务目录并启动它。

  ```bash
  cd C:\nginx\html\dist\server
  npm start
  ```

- **启动 Nginx**:
  以 **管理员身份** 打开一个新的命令提示符（CMD）并执行以下命令：

  ```bash
  cd C:\nginx
  start nginx.exe
  ```

### 关键注意事项

1.  **防火墙设置**:
    - 在云服务器（如阿里云、腾讯云）的安全组规则中，确保已放行 `80` 端口 (HTTP) 和后端服务端口 `3001`。
    - 在 Windows 服务器自身的防火墙中，添加入站规则以允许 `nginx.exe` 和 `node.exe` 的网络通信。

2.  **路径问题**:
    - 强烈建议项目文件路径中 **避免使用中文或空格**，以防止出现意外的路径解析错误。
    - 前端代码中的静态资源（如图片、CSS）应使用相对路径 (e.g., `./picture/logo.png`)。

3.  **服务验证**:
    - 在浏览器中访问 `http://<您的服务器IP>`，应能看到网站前端页面。
    - 确认后端API工作正常，可以尝试访问一个API地址，例如 `http://<您的服务器IP>/api/news`。

### 常用 Nginx 运维命令

在 `C:\nginx` 目录下以管理员身份运行 CMD 执行：

- **重新加载配置** (修改 `nginx.conf` 后无需重启即可生效):
  ```bash
  nginx -s reload
  ```
- **优雅地停止服务**:
  ```bash
  nginx -s quit
  ```
- **强制停止服务**:
  ```bash
  taskkill /f /im nginx.exe
  ```