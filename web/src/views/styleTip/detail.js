import Replay from 'components/Replay';
import React from 'react';
import like from 'assets/img/full-like.png';
import link from 'assets/img/link.png';
import bookmark from 'assets/img/bookmark.png';
import bookmarkActive from 'assets/img/bookmark-active.png';

const StyleTipDetail = (props) => {
  return (
    <div className="sub">
      <div className="mw-768 col-center">
        <div className="mb8">
          <h4 className="bold">타이틀</h4>
        </div>
        <div className="mb91">
          <h5 className="small color-grayAEAE">by 닉네임 조회 23,456 2020.01.01</h5>
        </div>

        <div className="mb60">
          <img src="http://gdimg.gmarket.co.kr/1470808952/still/600?ver=1598254123" alt="" />
        </div>

        <div className="mb77">
          <h5>
            여기는 내용이 들어갑니다. 내용을 여기에 써야해요. 내용 씁니다. 내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세요. 내용을 여기에 쓰세요 여기에 바로 씁니다. 여기는 내용이 들어갑니다.
            내용을 여기에 써야해요. 내용 씁니다. 내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세요. 내용을 여기에 쓰세요 여기에 바로 씁니다.
          </h5>
        </div>

        <div className="tc mb24">
          <h6 className="color-graybdbd">**해당 글은 전문 스타일리스트가 SCOT에 기고한 글로, 저작권은 SCOT에 있습니다.** </h6>
        </div>

        <div className="icon-container">
          <div className="circle-gray">
            <div className="mb6">
              <img src={like} alt="" />
            </div>
            <h6>{(43242).toLocaleString('ko-KR')}</h6>
          </div>
          <div className="circle-gray active">
            <div className="mb6">
              <img src={bookmarkActive} alt="" />
            </div>
            <h6>{(345435).toLocaleString('ko-KR')}</h6>
          </div>
          <div className="circle-gray">
            <div className="mb6">
              <img src={link} alt="" />
            </div>
          </div>
        </div>

        <Replay />
      </div>
    </div>
  );
};

export default StyleTipDetail;
