import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListBody = ({ item, goNextStep, hooks, apiId, activeIndex }) => {
  const [list, setList] = useState([]);
  const { makeInsertList, selectQueryItem, beforeNextChecker } = hooks;
  const [status, setStatus] = useState('init');

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
      <div className="mb0 mb-sm-42">
        {list.map((items, i) => {
          return (
            <div className="price-item-container two-way" key={`two-way-${i}`}>
              <div className="mb30 mb-sm-60">
                <h4 className="big tc bold">{items.title}</h4>
              </div>

              {items.queryItems.map((queryItem, index) => {
                const { answer } = queryItem;
                let checkFirstCheckStatus = false;
                if (i !== 0) {
                  checkFirstCheckStatus = list[0].queryItems.find((i) => i.title === queryItem.title).answer;
                } else {
                  checkFirstCheckStatus = list[1].queryItems.find((i) => i.title === queryItem.title).answer;
                }

                return (
                  <div
                    key={'price-' + index}
                    className={`price-item ${answer && 'active'} ${checkFirstCheckStatus && 'disabled'}`}
                    onClick={() => {
                      if (!checkFirstCheckStatus) setList(selectQueryItem(list, queryItem, i, !answer));
                    }}
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
