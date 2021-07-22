import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepTwoDepthItem = ({ item, goNextStep, hooks, apiId }) => {
  const { makeInsertList, beforeNextChecker, selectQueryItem } = hooks;
  const [selectQueryId, setSelectQueryId] = useState('');
  const [status, setStatus] = useState('init');
  const [list, setList] = useState([]);

  useEffect(() => {
    setStatus('start');
    setList(makeInsertList(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                return (
                  <div
                    key={'categoryList-' + id}
                    className={`style-circle-container only-border mb24  ${selectQueryId === id && 'active'}`}
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
                console.log(selectQueryId);
                if (item.categoryId !== selectQueryId) return false;
                return (
                  <div
                    className={`price-item ${item.answer && 'active'}`}
                    key={'selectItemList' + item.id}
                    onClick={() => {
                      setList(selectQueryItem(list, item, index, true));
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
