import axios from 'axios';
const BASE_URL = 'http://localhost:8089/v1/';

const Axios = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	withCredentials: true,
});

// axios 함수 호출 전 실행되는 함수
Axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error),
);

// api 실행 후 response를 감지하여 데이터를 return
Axios.interceptors.response.use(
	(response) => {
		// 로딩 창을 끔
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default Axios;
