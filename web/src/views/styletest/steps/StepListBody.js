import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListBody = ({ item, goNextStep, hooks, apiId, answers }) => {
  const [list, setList] = useState([]);
  const { makeInsertList, selectQueryItem, beforeNextChecker } = hooks;
  const [status, setStatus] = useState('init');

  useEffect(() => {
    setStatus('start');
    setList(makeInsertList(item, answers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  return (
    <div className={`step-container ${status}`}>
      <div className="mb0 mb-sm-42">
        {list.map((items, i) => {
          return (
            <div className="price-item-container two-way" key={`two-way-${i}`}>
              <div className="mb30 mb-sm-60">
                <h4 className="big tc bold">{items.title}</h4>
              </div>

              {items.queryItems.map((queryItem, index) => {
                const { answer } = queryItem;
                return (
                  <div
                    key={'price-' + index}
                    className={`price-item ${answer && 'active'}`}
                    onClick={() => setList(selectQueryItem(list, queryItem, i, true))}
                  >
                    {queryItem.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

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

export default StepListBody;
