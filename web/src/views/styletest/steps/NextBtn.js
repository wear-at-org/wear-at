import StepHook from 'hooks/useStepHook';
import React from 'react';

const NextBtn = ({ goNextStep, list }) => {
  const { checkSelect } = StepHook();
  return (
    <div className="style-next-btn" onClick={goNextStep}>
      <div className="inner width-380">
        <input type="button" value="다음" className="btn-style1 wid100 btn-font font-white middle" />
      </div>
    </div>
  );
};

export default NextBtn;
