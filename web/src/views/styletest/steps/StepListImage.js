import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListImage = ({ item, goNextStep, hooks }) => {
  const { makeInsertList, beforeNextChecker, selectQueryItem } = hooks;
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
            <div className="mb30 mb-sm-60 pl20 pr20">
              <h4 className="big tc bold">{items.title}</h4>
            </div>

            <div className="style-circle-wrap">
              {items.queryItems.map((queryItem) => {
                const { answer, url, id } = queryItem;
                return (
                  <div
                    className={`checked-img  ${answer && 'active'}`}
                    key={'checked-img-' + id}
                    onClick={() => setList(selectQueryItem(list, queryItem, index, url))}
                  >
                    <div className="img-dim"></div>
                    <img src={url} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <NextBtn
        goNextStep={() => {
          beforeNextChecker(list);
          setStatus('end');
          setTimeout(() => {
            goNextStep();
          }, 500);
        }}
        list={list}
      />
    </div>
  );
};

export default StepListImage;
