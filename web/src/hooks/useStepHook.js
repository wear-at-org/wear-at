import { useState } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';

const StepHook = () => {
  const history = useHistory();
  const [stylesTestList, setStyleTestList] = useState({
    content: [],
    totalElements: 0,
    totalPages: 1,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
    },
  });

  // 파일 업로드
  const uploadFile = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((f, idx) => formData.append(`files`, f));

    const result = await api.post('storage/upload', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });

    return result;
  };

  const getStyleTestList = async ({ size = 10, page = 0, sort = 'subscribeAt,desc' }) => {
    const res = await api.get(`subscribe?size=${size}&page=${page}&sort=${sort}`);
    new Promise(async (resolve) => {
      await res.data.content.forEach(async (i, index) => {
        if (i.recommended) {
          const recommended = await api.get(`recommend?subscribeId=${i.id}`);
          res.data.content[index].recommendItems = recommended.data[0].recommendItems;
          res.data.content[index].recommendItemsId = recommended.data[0].id;
        }
      });
      resolve(res.data);
    }).then((re) => {
      setStyleTestList(re ? re : {});
    });
  };

  const getRecommendDetail = async (id) => {
    const { data } = await api.get(`recommend/${id}`);
    return data;
  };

  // 스타일 테스트 리스트를 프론트 개발에 맞게 변환
  const makeStyleTestList = async (list, id) => {
    let resultArray = [];
    let insertId = id;
    if (!id) {
      const res = await api.post('subscribe', {
        answers: [],
        completed: false,
      });
      insertId = res.data.id;
    }
    await list.forEach((item) => {
      const { uiType } = item;
      const findIndex = resultArray.findIndex((findType) => findType.type === uiType);
      if (findIndex > 0) {
        resultArray[findIndex].items.push(item);
      } else {
        resultArray.push({ type: uiType, items: [item] });
      }
    });

    return { resultArray, id: insertId };
  };

  // answer를 넣기 위해 리스트 재배열
  const makeInsertList = async (list, apiId) => {
    const {
      data: { subscribeAnswers },
    } = await api.get(`subscribe/${apiId}`);
    const findAnswerList = subscribeAnswers.map((i) => {
      return {
        id: i.queryItemId,
        queryId: i.queryId,
        answer: i.answer,
      };
    });

    const insertList = list.map((i) => {
      const { queryItems, queryCategories } = i;
      return {
        ...i,
        queryItems: queryItems.map((queryItem) => {
          const findItem = findAnswerList.find((re) => re.id === queryItem.id && re.queryId === queryItem.queryId) || {};
          return {
            ...queryItem,
            answer: findItem.answer || false,
          };
        }),
        queryCategories: queryCategories.map((queryCategory) => {
          const findItem = findAnswerList.findIndex((re) => re.id === queryCategory.id && re.queryId === queryCategory.queryId) || {};
          return {
            ...queryCategory,
            answer: findItem.answer || false,
          };
        }),
      };
    });

    console.log(insertList);
    return insertList;
  };

  // 클릭 시 select로 변환
  const selectQueryItem = (list, queryItem, index, answer) => {
    let changeList = [...list];
    changeList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          queryItems: item.queryItems.map((value) => {
            if (value.id === queryItem.id && value.queryId === queryItem.queryId) {
              return {
                ...value,
                answer,
              };
            } else {
              return {
                ...value,
              };
            }
          }),
        };
      } else {
        return {
          ...item,
        };
      }
    });

    return changeList;
  };

  // 클릭 시 select로 변환
  const selectOnlyOneQueryItem = (list, queryItem, index, answer) => {
    console.log(queryItem);
    let changeList = [...list];
    changeList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          queryItems: item.queryItems.map((value) => {
            if (value.categoryId === queryItem.categoryId) {
              if (value.id === queryItem.id) {
                console.log('value1');
                console.log(value);
                return {
                  ...value,
                  answer,
                };
              } else {
                console.log('value2');
                console.log(value);
                return {
                  ...value,
                  answer: false,
                };
              }
            } else {
              console.log('value3');
              console.log(value);
              return {
                ...value,
              };
            }
          }),
        };
      } else {
        return {
          ...item,
        };
      }
    });

    return changeList;
  };

  // 다음으로 넘어 갈 수 있는 지 체크
  const checkSelect = (list) => {
    let cnt = 0;
    list.forEach((item) => {
      item.queryItems.forEach((queryItem) => {
        if (queryItem.answer) cnt++;
      });
      item.queryCategories.forEach((queryCategory) => {
        if (queryCategory.answer) cnt++;
      });
    });

    return cnt;
  };

  const beforeNextChecker = async (list, id, isLast = false) => {
    const {
      data: { subscribeAnswers },
    } = await api.get(`subscribe/${id}`);
    const findAnswerList = subscribeAnswers.map((i) => {
      return {
        id: i.queryItemId,
        queryId: i.queryId,
        answer: i.answer,
      };
    });
    window.scrollTo(0, 0);
    let result = [...findAnswerList];
    for (let i in list) {
      for (let j in list[i].queryCategories) {
        const queryCategoryItem = list[i].queryCategories[j];

        const findIndex = result.findIndex((re) => re.id === queryCategoryItem.id && re.queryId === queryCategoryItem.queryId);
        if (findIndex !== -1) {
          result.push(queryCategoryItem);
        } else {
          result[findIndex] = { ...queryCategoryItem };
        }
      }

      for (let k in list[i].queryItems) {
        const queryItem = list[i].queryItems[k];

        const findIndex = result.findIndex((re) => re.id === queryItem.id && re.queryId === queryItem.queryId);
        if (findIndex !== -1) {
          result[findIndex] = { ...queryItem };
        } else {
          result.push(queryItem);
        }
      }
    }

    let ansersArr = result.map((item) => {
      return {
        answer: item.answer,
        id,
        queryId: item.queryId,
        queryItemId: item.id,
      };
    });

    ansersArr = ansersArr.filter((i) => i.answer);

    await api.post('subscribe', {
      id,
      completed: isLast ? true : false,
      answers: ansersArr,
    });

    if (isLast) {
      history.push('/completeStyleTest');
    }
  };

  const checkLength = (list) => {
    let cnt = 0;
    list.forEach((item) => {
      item.queryItems.forEach((queryItem) => {
        if (queryItem.answer) cnt++;
      });
    });
    return cnt;
  };

  return {
    makeInsertList,
    makeStyleTestList,
    checkSelect,
    selectQueryItem,
    beforeNextChecker,
    uploadFile,
    getStyleTestList,
    stylesTestList,
    getRecommendDetail,
    checkLength,
    selectOnlyOneQueryItem,
  };
};

export default StepHook;
