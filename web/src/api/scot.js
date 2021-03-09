import axios from 'axios';

const scotUrl = 'http://localhost:8089/v1';

export default {
  login: async () => {

  },
  logout: async (provider) => {
    const resp = await axios.get(`${scotUrl}/auth/logout?provider=${provider}`);
    if (resp.data) {
      return resp.data.id;
    }
    return '';
  },
  getAuthURL: async (provider) => {
    const resp = await axios.get(`${scotUrl}/auth/url?provider=${provider}`);
    if (resp.data) {
      return resp.data.url;
    }
    return '';
  },
};

axios.defaults.withCredentials = true;
