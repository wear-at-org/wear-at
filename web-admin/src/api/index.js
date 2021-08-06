import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

// TODO remove, redux 활용
let unAuthorizedCallback = () => {};
export const setUnAuthorizedCallback = (cb) => {
	unAuthorizedCallback = cb;
};

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
		if (error.response && error.response.status) {
			if (error.response.status === 401) {
				unAuthorizedCallback();
			}
		}
		return Promise.reject(error);
	},
);

export default Axios;
