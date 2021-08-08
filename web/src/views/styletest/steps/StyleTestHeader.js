import React from 'react';
import { useHistory } from 'react-router-dom';
import arrLeft from 'assets/img/arr-right.png';
import xBtn from 'assets/img/x-btn-black.png';

const StyleTestHeader = ({ activeIndex, setActiveIndex, stepLength, apiId, hooks }) => {
  const { beforeNextChecker } = hooks;
  const history = useHistory();

  const checkPercent = () => {
    return `${(activeIndex / stepLength) * 100}%`;
  };
  return (
    <div className="style-test-header-wrap">
      <div className="inner">
        <div className="style-test-header">
          <div
            className="d-flex y-center"
            onClick={() => {
              if (activeIndex !== 0) {
                window.scrollTo(0, 0);
                setActiveIndex(activeIndex - 1);
              } else {
                if (window.confirm('정말 떠나실건가요?')) history.push('/styleTestIntro');
              }
            }}
          >
            <img src={arrLeft} alt="arr-left" />
            {activeIndex === 3 || activeIndex === 4 ? (
              <div className="ml20 cursor-pointer opacicy0">
                <h5 className="color-graybdbd">SKIP</h5>
              </div>
            ) : null}
          </div>
          <div>
            <h4>스타일테스트</h4>
          </div>
          <div className="d-flex y-center">
            {activeIndex === 3 || activeIndex === 4 ? (
              <div
                className="mr20 cursor-pointer"
                onClick={() => {
                  if (activeIndex !== stepLength - 1) {
                    setActiveIndex(activeIndex + 1);
                  } else {
                    beforeNextChecker([], apiId, true);
                  }
                }}
              >
                <h5 className="color-graybdbd">SKIP</h5>
              </div>
            ) : null}
            <img
              src={xBtn}
              alt="x-btn"
              onClick={() => {
                if (window.confirm('정말 떠나실건가요?')) history.push('/styleTestIntro');
              }}
            />
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
