import React, { useEffect, useState } from 'react';
import bottomCircle from 'assets/img/bottom-circle.svg';
import bottomImg from 'assets/img/style-test-Intro-bottom.png';
import { useHistory } from 'react-router-dom';

const StyleTestIntro = () => {
  const [step, setStep] = useState(0);
  const history = useHistory();
  return (
    <>
      <div className={`style-intro-step-container tc ${step === 0 ? 'active' : ''}`}>
        <div className="mb16">
          <h5 className="color-blue bold">AI가 선별하고 전문가가 추천하는 스타일링</h5>
        </div>
        <div className="mb24">
          <h3 className="fontweight400">
            수 많은 옷들 중 내가 원하는 옷만 <span className="bold">딱</span> 골라주는
            <br /> <span className="bold">나만의 스타일링</span> 을 받아보세요.
          </h3>
        </div>
        <div className="bottom-circle" onClick={() => setStep(1)}>
          <img src={bottomCircle} alt="" />
        </div>
      </div>

      <div className={`style-intro-step-container tc ${step === 1 ? 'active' : ''}`}>
        <div className="mb16">
          <h5 className="color-blue bold">AI가 선별하는 맞춤형 스타일링</h5>
        </div>
        <div className="mb24">
          <h3 className="fontweight400">
            알아서 추천해주는 인공지능으로
            <br /> <span className="bold">당신의 고민을 줄여드려요!</span>
          </h3>
        </div>
        <div className="bottom-circle" onClick={() => setStep(2)}>
          <img src={bottomCircle} alt="" />
        </div>
      </div>

      <div className={`style-intro-step-container mb73 tc ${step === 2 ? 'active' : ''}`}>
        <div className="mb16">
          <h5 className="color-blue bold">전문가의 손길로 완성되는 스타일링</h5>
        </div>
        <div className="mb24">
          <h3 className="fontweight400">
            <span className="bold">전문 스타일리스트</span>가 당신을 가장
            <br />잘 나타낼 수 있는 옷으로 찾아드릴게요
          </h3>
        </div>
        <div className="bottom-circle">
          <img src={bottomCircle} alt="" />
        </div>
      </div>

      <div className="tc mb24">
        <div className="mb16">
          <h3 className="fontweight400">
            매번 뭘 입지 고민이라면 <br />
            <span className="bold">웨어앳에서 해결하세요.</span>
          </h3>
        </div>
        <div className="d-flex x-center" onClick={() => history.push('/styletest')}>
          <div className="btn-style2 width-280 large center ml12">
            <p className="btn-font color-black333 bold">30초컷 무료 스타일테스트 할래요</p>
          </div>
        </div>
      </div>

      <div className="tc">
        <img src={bottomImg} alt="" />
      </div>
    </>
  );
};

export default StyleTestIntro;
