import React from 'react';

const NextBtn = (props) => {
  return (
    <div
      className="style-next-btn"
      onClick={() => {
        props.goNextStep();
      }}
    >
      <div className="inner width-380">
        <input type="button" value={`${props.isComplete ? '완료' : '다음'}`} className="btn-style1 wid100 btn-font font-white middle" />
      </div>
    </div>
  );
};

export default NextBtn;
