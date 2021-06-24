import React, { useState, useEffect } from 'react';
import StepHook from 'hooks/useStepHook';
import NextBtn from './NextBtn';

const StepTwoDepthItem = ({ item, goNextStep }) => {
  const [list, setList] = useState([]);
  const { selectQueryItem, makeInsertList } = StepHook();
  const [selectQuery, setSelectQuery] = useState('');
  useEffect(() => {
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

              <div className="style-circle-wrap small mb48">
                {items.queryCategories.map((queryItem, index) => {
                  console.log(queryItem);
                  return (
                    <div
                      key={'categoryList-' + queryItem.id}
                      className={`style-circle-container ${index < 2 ? 'mb24' : ''}`}
                      onClick={() => setSelectQuery(queryItem.queryId)}
                    >
                      <div className="inner">
                        <div className="mb24">
                          <img src={queryItem.img} alt="" />
                        </div>
                        <h5 className="small">{queryItem.title}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="price-item-container mb46">
                {items.queryItems.map((item) => {
                  if (item.categoryId !== selectQuery) return;
                  return (
                    <div className="price-item" key={'selectItemList' + item.id}>
                      {item.title}
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

export default StepTwoDepthItem;
