import api from './axiosInstance';

const setTokens = (accessToken) => {
  if (accessToken) localStorage.setItem('token', accessToken);
};

const authApi = {
  login: async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, refreshToken, user } = res.data?.data || {};
    setTokens(token, refreshToken);
    return { token, refreshToken, user };
  },

  register: async ({ name, email, password }) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, refreshToken, user } = res.data?.data || {};
    setTokens(token, refreshToken);
    return { token, refreshToken, user };
  },

  forgotPassword: async ({ email }) => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

};

export default authApi;
