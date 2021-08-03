import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListItem = ({ item, goNextStep, hooks, apiId, activeIndex }) => {
  const { makeInsertList, selectQueryItem, beforeNextChecker, checkLength } = hooks;
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

            <div className="style-circle-wrap">
              {items.queryItems.map((queryItem) => {
                const { answer, id, title, subtitle, url } = queryItem;
                return (
                  <div
                    key={`queryItems-${id}`}
                    className={`style-circle-container mb64 ${answer && 'active'}`}
                    onClick={() => setList(selectQueryItem(list, queryItem, index, !answer))}
                  >
                    <div className="inner">
                      <div className="mb24 item-img">
                        <img src={require(`assets/img/${url.split('icon://')[1]}${answer ? '-active.png' : '.png'}`).default} alt="" />
                      </div>
                      <div className="mb8 ">
                        <h5 className="bold">{title}</h5>
                      </div>
                      <h5 className="small">{subtitle}</h5>
                    </div>
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

export default StepListItem;
