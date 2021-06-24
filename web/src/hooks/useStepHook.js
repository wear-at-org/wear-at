import  { useState } from 'react';

const StepHook = () => {
  const [anser, setAnser] = useState([])
  
  // 스타일 테스트 리스트를 프론트 개발에 맞게 변환
  const makeStyleTestList = (list) => {
    const resultArray = [];
    list.forEach((item) => {
      const { uiType } = item;
      const findIndex = resultArray.findIndex((findType) => findType.type === uiType);
      if (findIndex > 0) {
        resultArray[findIndex].items.push(item);
      } else {
        resultArray.push({ type: uiType, items: [item] });
      }
    });

    console.log(resultArray);
    return resultArray;
  };

  // isSelect를 넣기 위해 리스트 재배열
  const makeInsertList = (list) => {
    const insertList = list.map((i) => {
      return {
        ...i,
        queryItems: i.queryItems.map((queryItem) => {
          return {
            ...queryItem,
            isSelect: false,
          };
        }),
        queryCategories: i.queryCategories.map((queryCategory) => {
          return {
            ...queryCategory,
            isSelect: false,
          };
        }),
      };
    });

    return insertList;
  };

  // 클릭 시 select로 변환
  const selectQueryItem = (list, id, type, index) => {
    let changeList = list;
    if (type === 'queryItems') {
      changeList = list.map((item, i) => {
        console.log(item);
        if (i === index) {
          return {
            ...item,
            queryItems: item.queryItems.map((value) => {
              if (value.id === id) {
                return {
                  ...value,
                  isSelect: !value.isSelect,
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
    } else {
      changeList = list.map((item, i) => {
        console.log(item);
        if (i === index) {
          return {
            ...item,
            queryCategories: item.queryCategories.map((value) => {
              if (value.id === id) {
                return {
                  ...value,
                  isSelect: !value.isSelect,
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
    }

    return changeList;
  };

  // 다음으로 넘어 갈 수 있는 지 체크
  const checkSelect = (list) => {
    console.log(list);
    let cnt = 0;
    list.forEach((item) => {
      item.queryItems.forEach((queryItem) => {
        if (queryItem.isSelect) cnt++;
      });
      item.queryCategories.forEach((queryCategory) => {
        if (queryCategory.isSelect) cnt++;
      });
    });

    return cnt;
  };

  const beforeNextChecker = (list) => {

  }
  return {
    makeInsertList,
    makeStyleTestList,
    checkSelect,
    selectQueryItem,
    anser,
    beforeNextChecker
  };
};

export default StepHook;
