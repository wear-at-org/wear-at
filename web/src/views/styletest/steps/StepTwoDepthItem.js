import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepTwoDepthItem = ({ item, goNextStep, hooks, apiId, activeIndex }) => {
  const { makeInsertList, beforeNextChecker, selectQueryItem, checkLength, selectOnlyOneQueryItem } = hooks;
  const [selectQueryId, setSelectQueryId] = useState('');
  const [status, setStatus] = useState('init');
  const [list, setList] = useState([]);

  useEffect(() => {
    const makeList = async () => {
      setStatus('start');
      setList(await makeInsertList(item, apiId));
    };
    makeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className={`step-container ${status}`}>
      {list.map((items, index) => {
        return (
          <div key={`step-${index}`}>
            <div className="mb30 mb-sm-60">
              <h4 className="big tc bold">{items.title}</h4>
            </div>

            <div className="style-circle-wrap small mb0 mb-sm-48">
              {items.queryCategories.map((queryItem) => {
                const { id, title, url } = queryItem;
                const checkCnt = () => {
                  let cnt = 0;
                  items.queryItems.forEach((i) => {
                    if (queryItem.id === i.categoryId && i.answer) {
                      cnt++;
                    }
                  });
                  console.log(title);
                  console.log(cnt);
                  return cnt;
                };

                return (
                  <div
                    key={'categoryList-' + id}
                    className={`style-circle-container only-border mb24  ${selectQueryId === id && 'active'} ${checkCnt() > 0 && 'check'}`}
                    onClick={() => {
                      setSelectQueryId(id);
                    }}
                  >
                    <div className="inner">
                      <div className="mb14">
                        <img
                          src={require(`assets/img/${url.split('icon://')[1]}${selectQueryId === id ? '-active.png' : '.png'}`).default || ''}
                          alt=""
                        />
                      </div>
                      <h5 className="small">{title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="price-item-container mb34 mb-sm-46">
              {items.queryItems.map((item) => {
                if (item.categoryId !== selectQueryId) return false;
                return (
                  <div
                    className={`price-item ${item.answer && 'active'}`}
                    key={'selectItemList' + item.id}
                    onClick={() => {
                      setList(selectOnlyOneQueryItem(list, item, index, !item.answer));
                    }}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <NextBtn
        disabled={checkLength(list) === 0}
        goNextStep={() => {
          beforeNextChecker(list, apiId);
          setStatus('end');
          setTimeout(() => {
            goNextStep();
          }, 500);
        }}
      />
    </div>
  );
};

export default StepTwoDepthItem;
