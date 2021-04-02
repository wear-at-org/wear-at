import axios from 'axios';

const apiUrl = 'http://localhost:8089/v1';

const api = {
  login: async (email, password) => {
    const payload = { email, password };
    await axios.post(`${apiUrl}/auth/sign-in`, payload);
  },
  logout: async (provider) => {
    let urlStr = `${apiUrl}/auth/logout`;
    console.log(provider)
    if (provider) {
      urlStr = `${urlStr}?provider=${provider}`;
    }

    const resp = await axios.get(urlStr);
    if (resp.data) {
      return resp.data.id;
    }
    return '';
  },
  snsLogin: async (id, email) => {
    const payload = { id, email };
    await axios.post(`${apiUrl}/auth/sns-sign-in`);
  },
  signUp: async (user) => {
    const resp = await axios.post(`${apiUrl}/auth/sign-up`, user);
    return resp.data;
  },
  getAuthURL: async (provider) => {
    const resp = await axios.get(`${apiUrl}/auth/url?provider=${provider}`);
    if (resp.data) {
      return resp.data.url;
    }
    return '';
  },
}
export default api;

axios.defaults.withCredentials = true;
