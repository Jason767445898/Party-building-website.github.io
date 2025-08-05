// 检查管理员登录状态
function checkAdminAuth() {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !isLoggedIn || user.role !== 'admin') {
        window.location.href = '/party-member-login.html';
        return;
    }
    
    // 显示管理员用户名
    document.getElementById('adminUsername').textContent = user.username || '管理员';
}

// 退出登录
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/party-member-login.html';
}

// 切换内容区域
function switchSection(sectionId) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示选中的内容区域
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // 更新菜单激活状态
    document.querySelectorAll('.menu li').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu li[data-section="${sectionId}"]`).classList.add('active');
    
    // 加载对应区域的数据
    switch(sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'users':
            loadUserData();
            break;
        case 'study':
            loadStudyData();
            break;
        case 'news':
            loadNewsData();
            break;
    }
}

// 加载仪表盘数据
async function loadDashboardData() {
    try {
        // 模拟数据，实际项目中应从后端获取
        document.getElementById('totalMembers').textContent = '56';
        document.getElementById('totalStudyMaterials').textContent = '32';
        document.getElementById('totalNews').textContent = '18';
        document.getElementById('totalVisits').textContent = '1024';
        
        const recentActivities = [
            { time: '2023-05-01 10:30', description: '张三 完成了学习任务《习近平新时代中国特色社会主义思想》' },
            { time: '2023-05-01 09:15', description: '李四 提交了思想汇报' },
            { time: '2023-04-30 16:45', description: '管理员 上传了新的学习资料' },
            { time: '2023-04-30 14:20', description: '王五 参加了组织生活会' },
            { time: '2023-04-29 11:10', description: '赵六 完成了党费缴纳' }
        ];
        
        const activitiesHtml = recentActivities.map(activity => `
            <div class="activity-item">
                <span class="activity-time">${activity.time}</span>
                <span class="activity-desc">${activity.description}</span>
            </div>
        `).join('');
        
        document.getElementById('recentActivities').innerHTML = activitiesHtml;
    } catch (error) {
        console.error('加载仪表盘数据失败:', error);
    }
}

// 加载党员数据（补全表格渲染）
async function loadUserData() {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error(`请求失败: ${response.status}`);
    
    const users = await response.json();
    
    const tableHtml = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.real_name}</td>
            <td>${user.username}</td>
            <td>${user.phone}</td>
            <td>${user.department}</td>
            <td>${user.position}</td>
            <td>${user.join_date}</td>
            <td>
                <button class="action-btn" onclick="openEditUserModal(${user.id})">编辑</button>
                <button class="action-btn" onclick="deleteUser(${user.id})">删除</button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('userTableBody').innerHTML = tableHtml;
  } catch (error) {
    showErrorToast(error.message);
  }
}

// 添加错误提示函数
function showErrorToast(message) {
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// 加载学习资料数据
function loadStudyData() {
    try {
        // 模拟数据，实际项目中应从后端获取
        const materials = [
            { id: 1, title: '习近平新时代中国特色社会主义思想', category: '理论学习', author: '中央宣传部', publishDate: '2023-01-15' },
            { id: 2, title: ' disappe', category: '理论学习', author: '纪检部', publishDate: '2023-02-20' },
            { id: 3, title: '基层党建工作实践与创新', category: '党建实践', author: '组织部', publishDate: '2023-03-10' },
            { id: 4, title: '党员先锋模范事迹', category: '先进事迹', author: '宣传部', publishDate: '2023-04-05' }
        ];
        
        const tableHtml = materials.map(material => `
            <tr>
                <td>${material.id}</td>
                <td>${material.title}</td>
                <td>${material.category}</td>
                <td>${material.author}</td>
                <td>${material.publishDate}</td>
                <td>
                    <button class="action-btn" onclick="editStudyMaterial(${material.id})">编辑</button>
                    <button class="action-btn" onclick="deleteStudyMaterial(${material.id})">删除</button>
                </td>
            </tr>
        `).join('');
        
        document.getElementById('studyTableBody').innerHTML = tableHtml;
    } catch (error) {
        console.error('加载学习资料数据失败:', error);
    }
}

// 加载资讯数据
function loadNewsData() {
    try {
        // 模拟数据，实际项目中应从后端获取
        const news = [
            { id: 1, title: '习近平同哈萨克斯坦总统托卡耶夫举行会谈', source: '新华社', publishDate: '2023-05-01' },
            { id: 2, title: '中共中央政治局召开会议 习近平主持', source: '人民日报', publishDate: '2023-04-28' },
            { id: 3, title: '全国脱贫总结表彰大会在京举行', source: '中国新闻网', publishDate: '2023-04-25' },
            { id: 4, title: '中国共产党成立100周年庆祝活动总结', source: '央视网', publishDate: '2023-04-20' }
        ];
        
        const tableHtml = news.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.source}</td>
                <td>${item.publishDate}</td>
                <td>
                    <button class="action-btn" onclick="editNews(${item.id})">编辑</button>
                    <button class="action-btn" onclick="deleteNews(${item.id})">删除</button>
                </td>
            </tr>
        `).join('');
        
        document.getElementById('newsTableBody').innerHTML = tableHtml;
    } catch (error) {
        console.error('加载资讯数据失败:', error);
    }
}

// 打开模态框
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// 关闭模态框
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 添加党员
function addUser() {
    openModal('addUserModal');
}

// 编辑党员
function editUser(userId) {
    alert(`编辑党员ID: ${userId}`);
    // 实际项目中应打开编辑模态框并加载用户数据
}

// 删除党员（对接真实API）
async function deleteUser(userId) {
    if (!confirm(`确定要删除ID为 ${userId} 的党员吗？`)) return;
    
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('删除失败');
        
        loadUserData();
        showSuccessToast('用户已删除');
    } catch (error) {
        showErrorToast(error.message);
    }
}

// 添加学习资料
function addStudyMaterial() {
    alert('添加学习资料');
    // 实际项目中应打开添加模态框
}

// 编辑学习资料
function editStudyMaterial(materialId) {
    alert(`编辑学习资料ID: ${materialId}`);
    // 实际项目中应打开编辑模态框并加载资料数据
}

// 删除学习资料
function deleteStudyMaterial(materialId) {
    if (confirm(`确定要删除ID为 ${materialId} 的学习资料吗？`)) {
        alert(`已删除学习资料ID: ${materialId}`);
        // 实际项目中应发送删除请求到后端
        loadStudyData(); // 重新加载数据
    }
}

// 添加资讯
function addNews() {
    alert('添加资讯');
    // 实际项目中应打开添加模态框
}

// 编辑资讯
function editNews(newsId) {
    alert(`编辑资讯ID: ${newsId}`);
    // 实际项目中应打开编辑模态框并加载资讯数据
}

// 删除资讯
function deleteNews(newsId) {
    if (confirm(`确定要删除ID为 ${newsId} 的资讯吗？`)) {
        alert(`已删除资讯ID: ${newsId}`);
        // 实际项目中应发送删除请求到后端
        loadNewsData(); // 重新加载数据
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查管理员登录状态
    checkAdminAuth();
    
    // 加载仪表盘数据
    loadDashboardData();
    
    // 绑定菜单点击事件
    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });
    
    // 绑定添加按钮点击事件
    document.getElementById('addUserBtn').addEventListener('click', addUser);
    document.getElementById('addStudyBtn').addEventListener('click', addStudyMaterial);
    document.getElementById('addNewsBtn').addEventListener('click', addNews);
    
    // 绑定搜索功能
    // 修改搜索事件监听
    document.getElementById('searchUser').addEventListener('input', function() {
    loadUserData(this.value);
    });
    
    // 更新加载函数
    async function loadUserData(searchTerm = '') {
    try {
    const url = new URL('/api/users', window.location.origin);
    if (searchTerm) url.searchParams.append('search', searchTerm);
    
    const response = await fetch(url, {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    });
    
    if (!response.ok) throw new Error(`请求失败: ${response.status}`);
    
    const users = await response.json();
    
    const tableHtml = users.map(user => `
    <tr>
    <td>${user.id}</td>
    <td>${user.real_name}</td>
    <td>${user.username}</td>
    <td>${user.phone}</td>
    <td>${user.department}</td>
    <td>${user.position}</td>
    <td>${user.join_date}</td>
    <td>
    <button class="action-btn" onclick="openEditUserModal(${user.id})">编辑</button>
    <button class="action-btn" onclick="deleteUser(${user.id})">删除</button>
    </td>
    </tr>
    `).join('');
    
    document.getElementById('userTableBody').innerHTML = tableHtml;
    } catch (error) {
    showErrorToast(error.message);
    }
    }
    document.getElementById('searchStudy').addEventListener('input', loadStudyData);
    document.getElementById('searchNews').addEventListener('input', loadNewsData);
    
    // 绑定表单提交事件
    // 在表单提交事件处修改
    document.getElementById('addUserForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        try {
            const formData = new FormData(event.target);
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });
    
            if (!response.ok) throw new Error('添加失败');
            
            closeModal('addUserModal');
            loadUserData();
            showSuccessToast('用户添加成功');
        } catch (error) {
            showErrorToast(error.message);
        }
    });
    
    document.getElementById('siteInfoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('网站信息保存成功！');
    });
    
    document.getElementById('adminPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('密码修改成功！');
    });
});

// 新增编辑功能
async function openEditUserModal(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const user = await response.json();
        
        // 填充表单字段
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editRealName').value = user.real_name;
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editPhone').value = user.phone;
        document.getElementById('editDepartment').value = user.department;
        document.getElementById('editPosition').value = user.position;
        
        openModal('editUserModal');
    } catch (error) {
        showErrorToast('加载用户数据失败');
    }
}

// 绑定编辑表单提交
document.getElementById('editUserForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    try {
        const userId = document.getElementById('editUserId').value;
        const formData = new FormData(event.target);
        
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) throw new Error('更新失败');
        
        closeModal('editUserModal');
        loadUserData();
        showSuccessToast('用户信息已更新');
    } catch (error) {
        showErrorToast(error.message);
    }
});

// 添加成功提示函数
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}