import React, { Component } from 'react';
import mainIcon1 from 'assets/img/main-icon1.png';
import mainIcon2 from 'assets/img/main-icon2.png';
import mainIcon3 from 'assets/img/main-icon3.png';

const MainCard = ({ cardIsActive }) => {
  return (
    <>
      <div className="col-12 col-center mw-1230">
        <div className={`col-12 d-flex f-wrap mb64 card-animation-wrapper ${cardIsActive && 'active'}`}>
          <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center card-wrap">
            <div className="card-section">
              <img src={mainIcon1} alt="mainIcon1" />
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
              <img src={mainIcon2} alt="mainIcon1" />
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
              <img src={mainIcon3} alt="mainIcon1" />
            </div>
            <div className="detail-text">
              <h4>패션에 대한 모든 것</h4>
              <h5>
                이벤트, 세일, OOTD 등 다양한 패션
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
