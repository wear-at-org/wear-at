import StepHook from 'hooks/useStepHook';
import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepListBody = ({ item, goNextStep }) => {
  const [list, setList] = useState([]);
  const { selectQueryItem, makeInsertList } = StepHook();

  useEffect(() => {
    setList(makeInsertList(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="step-container">
        <div className="mb42">
          {list.map((items, i) => {
            return (
              <div className="price-item-container two-way" key={`two-way-${i}`}>
                <div className="mb30 mb-sm-60">
                  <h4 className="big tc bold">{items.title}</h4>
                </div>

                {items.queryItems.map((item, index) => {
                  return (
                    <div key={'price-' + index} className="price-item">
                      {item.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <NextBtn goNextStep={goNextStep} list={list} />
      </div>
    </>
  );
};

export default StepListBody;