import React from 'react';
import mainIcon1 from 'assets/img/main-icon1.png';
import mainIcon2 from 'assets/img/main-icon2.png';
import mainIcon3 from 'assets/img/main-icon3.png';
import mainIcon1M from 'assets/img/main-icon1-m.png';
import mainIcon2M from 'assets/img/main-icon2-m.png';
import mainIcon3M from 'assets/img/main-icon3-m.png';

const MainCard = ({ cardIsActive }) => {
  return (
    <>
      <div className="col-12 col-center mw-1230">
        <div className={`col-12 d-flex f-wrap mb64 card-animation-wrapper ${cardIsActive && 'active'}`}>
          <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center card-wrap">
            <div className="card-section">
              <img className="show-web" src={mainIcon1} alt="mainIcon1" />
              <img className="show-mobile" src={mainIcon1M} alt="mainIcon1" />
            </div>
            <div className="detail-text">
              <h4>나에게 딱 맞는</h4>
              <h5>
                무료 스타일 테스트를 통해 나에게
                <br /> 어울리는 옷을 추천 받아 보세요.
              </h5>
            </div>
          </div>
          <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center card-wrap">
            <div className="card-section">
              <img className="show-web" src={mainIcon2} alt="mainIcon2" />
              <img className="show-mobile" src={mainIcon2M} alt="mainIcon2" />
            </div>
            <div className="detail-text">
              <h4>다양한 스타일 PICK!</h4>
              <h5>
                전문 스타일리스트가 제공하는 스타일
                <br /> 칼럼을 확인해 보세요!
              </h5>
            </div>
          </div>
          <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center card-wrap">
            <div className="card-section">
              <img className="show-web" src={mainIcon3} alt="mainIcon3" />
              <img className="show-mobile" src={mainIcon3M} alt="mainIcon3" />
            </div>
            <div className="detail-text">
              <h4>미처 몰랐던 새로운 브랜드도</h4>
              <h5>
                내 스타일의 새로운 디자이너 브랜드들을 만나보세요!
                <br />
                정보를 확인하실 수 있어요.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCard;
