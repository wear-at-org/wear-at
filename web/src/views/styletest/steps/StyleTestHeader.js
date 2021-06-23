import React from 'react';
import { useHistory } from 'react-router-dom';
import arrLeft from 'assets/img/arr-right.png';
import xBtn from 'assets/img/x-btn-black.png';

const StyleTestHeader = ({ activeIndex, setActiveIndex, stepLength }) => {
  const history = useHistory();

  const checkPercent = () => {
    return `${((activeIndex + 1) / stepLength) * 100}%`;
  };
  return (
    <div className="style-test-header-wrap">
      <div className="inner">
        <div className="style-test-header">
          <div
            className=""
            onClick={() => {
              if (activeIndex !== 0) {
                window.scrollTo(0, 0);
                setActiveIndex(activeIndex - 1);
              } else {
                history.push('/styleTestIntro');
              }
            }}
          >
            <img src={arrLeft} alt="" />
          </div>
          <div className="">
            <h4>스타일테스트</h4>
          </div>
          <div className="" onClick={() => history.push('/')}>
            <img src={xBtn} alt="" />
          </div>
        </div>
      </div>
      <div className="style-progress-bar">
        <div className="bar" style={{ width: checkPercent() }}></div>
      </div>
    </div>
  );
};

export default StyleTestHeader;
