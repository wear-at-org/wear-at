import React from 'react';
import { useHistory } from 'react-router-dom';

const MainBottom = () => {
  const history = useHistory();
  return (
    <div className="main-bottom-container">
      <div className="col-12 col-center mw-520">
        <div className="tc mb24">
          <h3>내 손안에 나만의 퍼스널 스타일링</h3>

          <h5>취향별로 구축된 추천코디 데이토로 당신의 옷장을 책임집니다!</h5>
        </div>

        <div className="btn-row">
          <div className="btn-style1 type-black center middle mr0 mr-sm-12 mb15 mb-sm-0" onClick={() => history.push('/styleTestIntro')}>
            <p className="btn-font font-white">무료 스타일테스트 할래요</p>
          </div>

          <div className="btn-style2 middle center ml0 ml-sm-12">
            <a
              href="https://tungsten-cereal-b61.notion.site/6e3103d46cbb4fa89aab4f9f25ddeb32"
              target="_blank"
              rel="noreferrer"
              style={{ width: '100%', height: '100%', textAlign: 'center' }}
            >
              <p className="btn-font color-black333 bold">궁금한게 있어요</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBottom;
