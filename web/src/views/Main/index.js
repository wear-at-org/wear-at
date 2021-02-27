import React from 'react';
import Fast from 'assets/img/fast.png';
import MainVisual from './components/MainVisual';

const Main = () => (
  <div className="col-12 col-center mw-1230">
    <div className="col-12 pr15 pl15">
      <div className="col-12 mb30">
        <MainVisual />
      </div>

      <div className="col-12 mb30">
        <p className="mb30 tc">
          SCOT 캐치 프레이즈(문구)
        </p>

        <p className="tc">
          SCOT은 당신에게 어울리는 옷을 추천하는 의류 추천 서비스 입니다.
          무료 스타일 테스트를 통해 나에게 어울리는 옷을 추천 받아 보세요.
        </p>
      </div>

      <div className="col-12 d-flex f-wrap">
        <div className="col-12 col-sm-4 mb20 mb-sm-0">
          <div className="card-section">
            <div className="inner">
              <div className="">
                <img src={Fast} alt="" />
              </div>
              <p>
                편리해요
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 mb20 mb-sm-0">
          <div className="card-section">
            <div className="inner">
              <div className="">
                <img src={Fast} alt="" />
              </div>
              <p>
                빠르고 좋아요
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="card-section">
            <div className="inner">
              <div className="">
                <img src={Fast} alt="" />
              </div>
              <p>
                어렵지 않아요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Main;
