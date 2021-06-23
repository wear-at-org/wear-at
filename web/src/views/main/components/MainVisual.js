import React from 'react';
import MainImg from 'assets/img/main.png';
import { useHistory } from 'react-router-dom';

const MainVisual = () => {
  const history = useHistory();
  return (
    <div className="col-12 main-visual">
      <div className="col-12 col-center mw-1230 inner pl15 pr15">
        <div className="visual-text">
          <div className="mb16">
            <h3 className="fontweight400">
              한 손으로 전문 스타일리스트의
              <br />
              <span className="bold">퍼스널 스타일링</span> 을 받아보세요
            </h3>
          </div>

          <div className="mb16 hidden show-sm">
            <p className="visual-h3-desc">사용자의 취향분석을 통해 최적의 코디를 추천해드립니다.</p>
          </div>

          <div className="btn-style1 large width-fit" onClick={() => history.push('/styleTestIntro')}>
            <p className="btn-font font-white d-flex y-center">30초만에 무료 스타일테스트 진행하기</p>
          </div>
        </div>

        <div className="visual-img-container">
          <img src={MainImg} alt="Main-img" />
        </div>
      </div>
    </div>
  );
};
export default MainVisual;
