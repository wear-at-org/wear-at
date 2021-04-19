import React from 'react';
import MainImg from 'assets/img/main.png';
import arrRight from 'assets/img/arr-right-white.png';

const MainVisual = () => (
  <div className="col-12 main-visual">
    <div className="col-12 col-center mw-1230 inner pl15 pr15">
      <div className="visual-text">
        <div className="mb16">
          <h3>
            손끝으로 해결하는 나를 위한
            <br />
            퍼스널 스타일링 서비스
          </h3>
        </div>

        <div className="mb16">
          <p className="visual-h3-desc">사용자의 취향분석을 통해 최적의 코디를 추천해드립니다.</p>
        </div>

        <div className="">
          <div className="btn-style1 large">
            <p className="btn-font font-white d-flex y-center">
              무료 테스트 바로 해보세요
              <i className="icon-container ml12">
                <img src={arrRight} alt="arrow-right" />
              </i>
            </p>
          </div>
        </div>
      </div>

      <div className="visual-img-container">
        <img src={MainImg} alt="Main-img" />
      </div>
    </div>
  </div>
);
export default MainVisual;
