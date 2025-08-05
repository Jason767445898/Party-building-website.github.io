function handlePartyMemberLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 这里应该添加实际的登录验证逻辑
    if (username && password) {
        // 存储登录状态
        localStorage.setItem('partyMemberLoggedIn', 'true');
        localStorage.setItem('partyMemberUsername', username);
        
        // 跳转到党员主页
        window.location.href = 'party-member-dashboard.html';
    } else {
        alert('请输入党员编号和密码');
    }
    
    return false;
}

// 检查登录状态（在党员面板页面使用）
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('partyMemberLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('partyMemberLoggedIn');
    localStorage.removeItem('partyMemberUsername');
    window.location.href = 'index.html';
}

// 在党员面板页面加载时检查登录状态
if (document.querySelector('.sidebar')) {
    checkLoginStatus();
}

// 加载内容
function loadContent(section) {
    const contentArea = document.querySelector('.content');
    // 根据不同的section加载相应的内容
    switch(section) {
        case 'study':
            // 加载党课学习内容
            break;
        case 'resources':
            // 加载资讯内容
            break;
        // ... 其他内容处理
    }
}

// 切换时间线内容显示/隐藏
function toggleTimelineContent(header) {
    const item = header.parentElement;
    const content = item.querySelector('.timeline-content');
    
    // 关闭其他所有打开的项目
    const allItems = document.querySelectorAll('.timeline-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.toggle-icon').textContent = '+';
        }
    });
    
    // 切换当前项目
    if (item.classList.contains('active')) {
        item.classList.remove('active');
        header.querySelector('.toggle-icon').textContent = '+';
    } else {
        item.classList.add('active');
        header.querySelector('.toggle-icon').textContent = '×';
    }
}

// 页面加载时默认关闭所有内容
document.addEventListener('DOMContentLoaded', function() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.style.maxHeight = null;
    });
});

// 检查用户登录状态
// 检查登录状态
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !isLoggedIn) {
        window.location.href = '/party-member-login.html';
        return;
    }

    // 如果是管理员，重定向到管理员面板
    if (user.role === 'admin') {
        window.location.href = '/admin-dashboard.html';
        return;
    }

    // 显示用户信息
    const usernameElement = document.getElementById('memberUsername');
    if (usernameElement) {
        usernameElement.textContent = user.username || '党员';
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/party-member-login.html';
}

// 页面加载时执行登录检查
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 展开/收起时间轴内容
function toggleTimelineContent(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';
    } else {
        content.style.display = 'block';
        icon.textContent = '-';
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 处理时间轴点击
function toggleTimelineContent(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';
    } else {
        content.style.display = 'block';
        icon.textContent = '-';
    }
}