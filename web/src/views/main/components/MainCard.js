import React, { Component } from 'react';
import mainIcon1 from 'assets/img/main-icon1.png';
import mainIcon2 from 'assets/img/main-icon2.png';
import mainIcon3 from 'assets/img/main-icon3.png';

const MainCard = () => (
  <>
    <div className="col-12 mt72 mb48">
      <h4 className="mb30 tc">
        SCOT 회원이 되시면
        <span className="fontweight700"> 아래 혜택</span>
        들을 누릴 수 있습니다.
      </h4>
    </div>

    <div className="col-12 d-flex f-wrap mb64">
      <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center">
        <div className="card-section">
          <img src={mainIcon1} alt="mainIcon1" style={{ width: '52px', height: '37px' }} />
        </div>
      </div>
      <div className="col-12 col-sm-4 mb40 mb-sm-0 d-flex x-center">
        <div className="card-section">
          <img src={mainIcon2} alt="mainIcon2" style={{ width: '36px', height: '28px' }} />
        </div>
      </div>
      <div className="col-12 col-sm-4 d-flex x-center">
        <div className="card-section">
          <img src={mainIcon3} alt="mainIcon3" style={{ width: '66px', height: '37px' }} />
        </div>
      </div>
    </div>
  </>
);

export default MainCard;
