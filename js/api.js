const API_BASE = '/api/v1';
const TIMEOUT = 15000; // 15秒超时
const MAX_RETRIES = 2; // 最大重试次数

// 统一响应数据结构验证
const validateResponse = (response) => {
  if (!response.code) {
    throw new Error('无效的API响应结构');
  }
  return response;
};

export const request = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || TIMEOUT);
  
  let retries = 0;
  const attempt = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }),
        ...options.headers
      };

      const response = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers,
        signal: controller.signal,
        credentials: 'include' // 携带跨域凭证
      });
      
      // 处理非JSON响应
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error(`无效的内容类型: ${contentType}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `请求失败: ${response.status}`);
      }
      
      return validateResponse(data);
      
    } catch (error) {
      if (error.name === 'AbortError' && retries < MAX_RETRIES) {
        retries++;
        return attempt();
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };
  
  return attempt();
};

// 增强型接口配置
const createApi = (basePath) => ({
  get: (path) => request(`${basePath}${path}`),
  post: (path, data) => request(`${basePath}${path}`, { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (path, data) => request(`${basePath}${path}`, {
    method: 'PUT', 
    body: JSON.stringify(data)
  }),
  delete: (path) => request(`${basePath}${path}`, { method: 'DELETE' })
});

export const AuthAPI = {
  ...createApi('/auth'),
  login: (data) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    timeout: 10000 // 登录接口单独设置短超时
  })
};

export const UserAPI = createApi('/users');