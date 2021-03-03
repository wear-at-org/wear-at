import axios from 'axios';

const scotUrl = 'http://localhost:8089/v1';

export default {
  login: () => {
    axios.get(`${scotUrl}/auth/login`);
  },
  logout: () => {

  },
};
