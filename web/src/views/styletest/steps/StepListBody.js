import React, { useState, useEffect } from 'react';

const StepListBody = ({ item, goNextStep }) => {
  const [includeBody, setIncludeBody] = useState([]);

  useEffect(() => {
    const { queryItems } = item;
    setIncludeBody(queryItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step-container">
      <div className="price-item-container two-way mb42">
        <div className="mb32">
          <h4 className="big tc bold">{item.title}</h4>
        </div>
        {includeBody.map((item, index) => {
          return (
            <div key={'price-' + index} className="price-item">
              {item.title}
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

export default StepListBody;
