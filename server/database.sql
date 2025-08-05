-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建用户资料表
CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    real_name VARCHAR(50),
    phone VARCHAR(20),
    department VARCHAR(100),
    position VARCHAR(100),
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 创建学习资料表
CREATE TABLE IF NOT EXISTS study_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('policy', 'theory', 'history', 'news') NOT NULL,
    author VARCHAR(50),
    publish_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建学习记录表
CREATE TABLE IF NOT EXISTS study_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    material_id INT NOT NULL,
    status ENUM('started', 'completed') NOT NULL DEFAULT 'started',
    progress INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE
);

-- 插入管理员账号

INSERT INTO users (username, password, email, role) VALUES
('admin', '$2a$10$X7UrE8CMxT5CyeQFw.KQB.k8XHKv.TxvYHwqsTB8YlqIGL8JVvGVe', 'admin@example.com', 'admin'),
('13800138000', '$2a$10$X7UrE8CMxT5CyeQFw.KQB.k8XHKv.TxvYHwqsTB8YlqIGL8JVvGVe', 'member1@example.com', 'member'),
('13800138001', '$2a$10$X7UrE8CMxT5CyeQFw.KQB.k8XHKv.TxvYHwqsTB8YlqIGL8JVvGVe', 'member2@example.com', 'member'),
('DJ001', '$2a$10$X7UrE8CMxT5CyeQFw.KQB.k8XHKv.TxvYHwqsTB8YlqIGL8JVvGVe', 'member3@example.com', 'member');

-- 插入对应的用户资料
INSERT INTO user_profiles (user_id, real_name, phone, department, position, join_date) VALUES
(2, '张三', '13800138000', '组织部', '党员', '2020-01-01'),
(3, '李四', '13800138001', '宣传部', '党员', '2020-02-01'),
(4, '王五', '13911112222', '纪检部', '党员', '2020-03-01');

-- 插入示例学习资料
INSERT INTO study_materials (title, content, category, author, publish_date) VALUES
('习近平新时代中国特色社会主义思想', '习近平新时代中国特色社会主义思想是新时代中国共产党的思想旗帜...', 'theory', '中共中央', '2023-01-01'),
('党的二十大精神解读', '党的二十大报告全面总结新时代以来党和国家事业发展取得的重大成就...', 'policy', '中共中央', '2023-02-01'),
('中国共产党百年奋斗重大成就', '中国共产党团结带领中国人民经过百年奋斗，实现了第一个百年奋斗目标...', 'history', '中共中央', '2023-03-01');