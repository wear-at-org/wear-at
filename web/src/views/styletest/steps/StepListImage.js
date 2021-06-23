import StepHook from 'hooks/useStepHook';
import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListImage = ({ item, goNextStep }) => {
  const { selectQueryItem, makeInsertList } = StepHook();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(makeInsertList(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step-container">
      {list.map((items, index) => {
        return (
          <div key={`step-${index}`}>
            <div className="mb30 mb-sm-60">
              <h4 className="big tc bold">{items.title}</h4>
            </div>

            <div className="style-circle-wrap">
              {items.queryItems.map((queryItem) => {
                const { isSelect, url, id } = queryItem;
                return (
                  <div
                    className={`checked-img  ${isSelect && 'active'}`}
                    key={'checked-img-' + id}
                    onClick={() => setList(selectQueryItem(list, id, 'queryItems', index))}
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
      <NextBtn goNextStep={goNextStep} list={list} />
    </div>
  );
};

export default StepListImage;
