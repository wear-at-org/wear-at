import {useState} from 'react';
import api from 'api';
import {
  StyleTestProps,
  styleTestListProps,
  makeAnswersType,
  apiAnswerType,
  styleTestFrontItemProps,
  styleTestItemProps,
  initalStyleTestFrontItem,
  initMakeAnswersType,
} from './type';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {CommonActions} from '@react-navigation/native';

const StepHook = () => {
  let navigation = useNavigation<stackNavigationProp>();
  const [stylesTestList, setStyleTestList] = useState<StyleTestProps>({
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
  const uploadFile = async (files: DocumentPickerResponse[]) => {
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append('files', f));

    const result = await api.post('storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result;
  };

  const getStyleTestList = async ({size = 10, page = 0, sort = 'subscribeAt,desc'}) => {
    const res = await api.get(`subscribe?size=${size}&page=${page}&sort=${sort}`);
    new Promise(async (resolve) => {
      await res.data.content.forEach(async (i: {id: string; recommended: boolean}, index: number) => {
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

  const getRecommendDetail = async (id: string) => {
    const {data} = await api.get(`recommend/${id}`);
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
      const {uiType} = item;
      const findIndex = resultArray.findIndex((findType) => findType.type === uiType);
      if (findIndex > 0) {
        resultArray[findIndex].items.push(item);
      } else {
        resultArray.push({type: uiType, items: [item]});
      }
    });

    return {resultArray, id: insertId};
  };

  // answer를 넣기 위해 리스트 재배열
  const makeInsertList = async (list: styleTestListProps[], apiId: string) => {
    const {
      data: {subscribeAnswers},
    } = await api.get(`subscribe/${apiId}`);
    const findAnswerList: [makeAnswersType] = subscribeAnswers.map((i: apiAnswerType) => {
      return {
        id: i.queryItemId,
        queryId: i.queryId,
        answer: i.answer,
      };
    });

    const insertList = list.map((i) => {
      const {queryItems, queryCategories} = i;
      return {
        ...i,
        queryItems: queryItems.map((queryItem) => {
          const findItem: makeAnswersType =
            findAnswerList.find((re) => re.id === queryItem.id && re.queryId === queryItem.queryId) || initMakeAnswersType;
          return {
            ...queryItem,
            answer: findItem.answer || false,
          };
        }),
        queryCategories: queryCategories.map((queryCategory) => {
          const findItem: makeAnswersType =
            findAnswerList.find((re) => re.id === queryCategory.id && re.queryId === queryCategory.queryId) || initMakeAnswersType;
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
  const selectQueryItem = (list: styleTestListProps[], queryItem: styleTestItemProps, index: number, answer: boolean | string) => {
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
  const selectOnlyOneQueryItem = (list: styleTestListProps[], queryItem: styleTestItemProps, index: number, answer: boolean | string) => {
    let changeList: styleTestListProps[] = [...list];
    changeList = list.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          queryCategories: [...item.queryCategories],
          queryItems: item.queryItems.map((value) => {
            if (value.categoryId === queryItem.categoryId) {
              if (value.id === queryItem.id) {
                return {
                  ...value,
                  answer,
                };
              } else {
                return {
                  ...value,
                  answer: false,
                };
              }
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
  const checkSelect = (list: [styleTestListProps]) => {
    let cnt = 0;
    list.forEach((item) => {
      item.queryItems.forEach((queryItem) => {
        if (queryItem.answer) {
          cnt++;
        }
      });
      item.queryCategories.forEach((queryCategory) => {
        if (queryCategory.answer) {
          cnt++;
        }
      });
    });

    return cnt;
  };

  const beforeNextChecker = async (list: styleTestListProps[], id: string, isLast = false) => {
    const {
      data: {subscribeAnswers},
    } = await api.get(`subscribe/${id}`);
    const findAnswerList: [makeAnswersType] = subscribeAnswers.map((i: apiAnswerType) => {
      return {
        id: i.queryItemId,
        queryId: i.queryId,
        answer: i.answer,
      };
    });

    let result = [...findAnswerList];

    for (let i in list) {
      for (let j in list[i].queryCategories) {
        const queryCategoryItem = list[i].queryCategories[j];

        const findIndex: number = result.findIndex((re) => re.id === queryCategoryItem.id && re.queryId === queryCategoryItem.queryId);
        if (findIndex !== -1) {
          result.push(queryCategoryItem);
        } else {
          result[findIndex] = {...queryCategoryItem};
        }
      }

      for (let k in list[i].queryItems) {
        const queryItem = list[i].queryItems[k];

        const findIndex = result.findIndex((re) => re.id === queryItem.id && re.queryId === queryItem.queryId);
        if (findIndex !== -1) {
          result[findIndex] = {...queryItem};
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
      console.log(isLast);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Main'}, {name: 'CompleteStyleTest'}],
        }),
      );
    }
  };

  const checkLength = (list: styleTestListProps[]) => {
    let cnt = 0;
    list.forEach((item) => {
      item.queryItems.forEach((queryItem) => {
        if (queryItem.answer) {
          cnt++;
        }
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
