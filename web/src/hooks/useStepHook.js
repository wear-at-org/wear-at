import React, { useState, useEffect } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';

const StepHook = () => {
  const history = useHistory();
  const [answers, setAnswers] = useState({ answer: [], completed: false, id: 'notComplete' });

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

  const getStyleTestList = async ({ size = 10, page = 0 }) => {
    const res = await api.get(`subscribe?size=${size}&page=${page}`);
    console.log(res);
  };

  // 스타일 테스트 리스트를 프론트 개발에 맞게 변환
  const makeStyleTestList = async (list) => {
    const res = await api.post('subscribe', {
      answers: [],
      completed: false,
    });
    const resultArray = [];
    await list.forEach((item) => {
      const { uiType } = item;
      const findIndex = resultArray.findIndex((findType) => findType.type === uiType);
      if (findIndex > 0) {
        resultArray[findIndex].items.push(item);
      } else {
        resultArray.push({ type: uiType, items: [item] });
      }
    });

    return { resultArray, id: res.data.id };
  };

  // answer를 넣기 위해 리스트 재배열
  const makeInsertList = (list) => {
    const insertList = list.map((i) => {
      const { queryItems, queryCategories } = i;
      return {
        ...i,
        queryItems: queryItems.map((queryItem) => {
          const findItem = answers.answer.find((re) => re.id === queryItem.id && re.queryId === queryItem.queryId) || {};
          return {
            ...queryItem,
            answer: findItem.answer || false,
          };
        }),
        queryCategories: queryCategories.map((queryCategory) => {
          const findItem = answers.answer.findIndex((re) => re.id === queryCategory.id && re.queryId === queryCategory.queryId) || {};
          return {
            ...queryCategory,
            answer: findItem.answer || false,
          };
        }),
      };
    });

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
    window.scrollTo(0, 0);
    let result = [...answers.answer];
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

    setAnswers({
      ...answers,
      answer: [...result],
    });

    const ansersArr = result.map((item) => {
      return {
        answer: item.answer,
        id,
        queryId: item.queryId,
        queryItemId: item.queryItemId,
      };
    });

    await api.post('subscribe', {
      id,
      completed: isLast ? true : false,
      answers: ansersArr,
    });

    if (isLast) {
      history.push('/completeStyleTest');
    }
  };

  return {
    makeInsertList,
    makeStyleTestList,
    checkSelect,
    selectQueryItem,
    beforeNextChecker,
    answers,
    setAnswers,
    uploadFile,
    getStyleTestList,
  };
};

export default StepHook;
