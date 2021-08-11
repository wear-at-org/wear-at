import { useState } from 'react';
import api from 'api';
import { message } from 'antd';

const useStyelTest = () => {
	const [userTestList, setUserTestList] = useState({});
	const [subscribeInfo, setSubscribeInfo] = useState({});
	const [recommendItems, setRecommendItems] = useState([]);
	const makeUserTestList = async ({ subscribeId }) => {
		const { data: queryList } = await api.get('subscribe/query');
		const { data: info } = await api.get(`subscribe/${subscribeId}`);
		let resultObj = {};
		console.log(info);
		setSubscribeInfo(info);
		queryList.forEach((query) => {
			let queryCnt = 0;
			info.subscribeAnswers.forEach((answer) => {
				if (query.id === answer.queryId) {
					queryCnt++;
					// id를 통해 obj에 값이 있는 지 여부 확인
					if (resultObj[query.uiType]) {
						// 값이 있다면 그 값에 따른 아이템을 찾음
						let findItem = '';
						// 만약 queryId가 6이라면 업로드 이미지이기 때문에 찾지 않고 바로 값을 넣음
						if (answer.queryId !== 6) {
							findItem = query.queryItems.find((queryItem) => queryItem.id === answer.queryItemId);
						} else {
							findItem = answer;
						}
						// 만약 categoryId가 있다면(U_LIST_2DEP_ITEMS 이므로) queryTitle 추가
						if (findItem && findItem.categoryId) {
							findItem.queryTitle = query.queryCategories.find((cate) => cate.id === findItem.categoryId).title;
						}
						resultObj[query.uiType].answer.push(findItem);
					} else {
						// 아이디가 없을 경우 값 초기화
						resultObj[query.uiType] = {
							title: query.title,
							uiType: query.uiType,
							answer: [],
							id: query.id,
						};
						let findItem = '';
						// 값을 찾아 insert
						// 만약 queryId가 6이라면 업로드 이미지이기 때문에 찾지 않고 바로 값을 넣음
						if (answer.queryId !== 6) {
							findItem = query.queryItems.find((queryItem) => queryItem.id === answer.queryItemId);
						} else {
							findItem = answer;
						}
						// 만약 categoryId가 있다면(U_LIST_2DEP_ITEMS 이므로) queryTitle 추가
						if (findItem && findItem.categoryId) {
							findItem.queryTitle = query.queryCategories.find((cate) => cate.id === findItem.categoryId).title;
						}
						resultObj[query.uiType].answer = [findItem];
					}
				}
			});
			// 찾는 아이템이 없다면 초기값
			if (queryCnt === 0) {
				resultObj[query.uiType] = { title: query.title, answer: [], id: query.id };
			}
		});

		if (info.recommendStarted) {
			const { data } = await api.get(`/recommend?subscribeId=${subscribeId}`);
			setRecommendItems(data);
		}

		setUserTestList(resultObj);
	};

	const assignMe = async (id) => {
		await api.post('/recommend', {
			subscribeId: id,
		});

		await makeUserTestList({ subscribeId: id });
	};

	const uploadRecommend = async ({ payload }) => {
		try {
			await api.post(`recommend`, payload);
			message.info('성공적으로 처리되었습니다.');
		} catch (e) {
			message.error(e.response && e.response.data ? e.response.data.message : e.message);
		}
	};
	return { userTestList, makeUserTestList, subscribeInfo, assignMe, recommendItems, uploadRecommend };
};

export default useStyelTest;
