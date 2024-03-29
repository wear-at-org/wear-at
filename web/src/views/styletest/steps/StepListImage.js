import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';
import LazyImage from 'components/LazyImage';

const StepListImage = ({ item, goNextStep, hooks, apiId, activeIndex }) => {
  const { makeInsertList, beforeNextChecker, selectQueryItem, checkLength } = hooks;
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
                    onClick={() => setList(selectQueryItem(list, queryItem, index, !answer))}
                  >
                    <div className="img-dim"></div>
                    <LazyImage src={url} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <NextBtn
        disabled={checkLength(list) < 3 || checkLength(list) > 10}
        goNextStep={() => {
          beforeNextChecker(list, apiId);
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
