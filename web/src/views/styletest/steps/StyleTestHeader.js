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
            onClick={() => {
              if (activeIndex !== 0) {
                window.scrollTo(0, 0);
                setActiveIndex(activeIndex - 1);
              } else {
                if (window.confirm('정말 떠나실건가요?')) history.push('/styleTestIntro');
              }
            }}
          >
            <img src={arrLeft} alt="" />
          </div>
          <div>
            <h4>스타일테스트</h4>
          </div>
          <div
            onClick={() => {
              if (window.confirm('정말 떠나실건가요?')) history.push('/styleTestIntro');
            }}
          >
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
