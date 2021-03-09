import axios from 'axios';

const scotUrl = 'http://localhost:8089/v1';

export default {
  login: async () => {

  },
  logout: async () => {
    const resp = await axios.get(`${scotUrl}/auth/logout`);
    if (resp.data) {
      return resp.data.id;
    }
    return '';
  },
  getCodeURL: async () => {
    const resp = await axios.get(`${scotUrl}/auth/url`);
    if (resp.data) {
      return resp.data.url;
    }
    return '';
  },
};
