import React, { useState, useEffect } from 'react';
import StepHook from 'hooks/useStepHook';
import NextBtn from './NextBtn';

const StepListItem = ({ item, goNextStep }) => {
  const [list, setList] = useState([]);
  const { selectQueryItem, anser, beforeNextChecker, makeInsertList } = StepHook();

  useEffect(() => {
    console.log("init")
    setList(makeInsertList(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="step-container">
        {list.map((items, index) => {
          return (
            <div key={`step-${index}`}>
              <div className="mb30 mb-sm-60">
                <h4 className="big tc bold">{items.title}</h4>
              </div>

              <div className="style-circle-wrap">
                {items.queryItems.map((queryItem) => {
                  const { isSelect, id, img, title, subtitle } = queryItem;
                  return (
                    <div
                      key={`queryItems-${id}`}
                      className={`style-circle-container mb64 ${isSelect && 'active'}`}
                      onClick={() => setList(selectQueryItem(list, id, 'queryItems', index))}
                    >
                      <div className="inner">
                        <div className="mb24">
                          <img src={img} alt="" />
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

        <NextBtn goNextStep={goNextStep} list={list} />
      </div>
    </>
  );
};

export default StepListItem;
