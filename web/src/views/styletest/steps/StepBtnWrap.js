import React from 'react';

const StepBtnWrap = ({ activeIndex, setActiveIndex }) => {
  return (
    <div className="step-btn-wrap">
      {activeIndex !== 0 ? (
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            setActiveIndex(activeIndex - 1);
          }}
        >
          이전
        </div>
      ) : (
        <div></div>
      )}
      <div
        onClick={() => {
          window.scrollTo(0, 0);
          setActiveIndex(activeIndex + 1);
        }}
      >
        다음
      </div>
    </div>
  );
};

export default StepBtnWrap;
