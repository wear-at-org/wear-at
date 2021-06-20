import React, { useState, useEffect } from 'react';

const StepListImage = ({ item, goNextStep }) => {
  const [selectItemList, setSelectItemList] = useState([]);

  useEffect(() => {
    const { queryItems } = item;
    console.log(queryItems);
    setSelectItemList(queryItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="step-container">
      <div className="mb60">
        <h4 className="big tc bold">{item.title}</h4>
      </div>

      <div className="style-circle-wrap">
        {selectItemList.map((queryItem, index) => {
          return (
            <div className="checked-img" key={'checked-img-' + queryItem.id}>
              <img src={queryItem.url} alt="" />
            </div>
          );
        })}
      </div>
      <div className="style-next-btn" onClick={goNextStep}>
        <div className="inner width-380">
          <input type="button" value="다음" className="btn-style1 wid100 btn-font font-white middle" />
        </div>
      </div>
    </div>
  );
};

export default StepListImage;
