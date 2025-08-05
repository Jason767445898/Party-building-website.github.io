document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (!username || !password) {
                errorMessage.textContent = '请输入党员编号/手机号和密码';
                errorMessage.style.display = 'block';
                return;
            }
            
            try {
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = '登录中...';
                
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // 存储完整的登录信息
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    // 根据角色跳转
                    if (data.data.user.role === 'admin') {
                        window.location.href = '/admin-dashboard.html';
                    } else {
                        window.location.href = '/party-member-dashboard.html';
                    }
                } else {
                    errorMessage.textContent = data.message || '用户名或密码错误';
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                console.error('登录错误:', error);
                errorMessage.textContent = '服务器连接失败，请稍后重试';
                errorMessage.style.display = 'block';
            } finally {
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = '登录';
            }
        });
    }
});