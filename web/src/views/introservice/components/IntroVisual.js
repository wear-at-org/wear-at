import React, { useEffect, useState } from 'react';
import Intro0 from 'assets/img/intro0.png';
import { useHistory } from 'react-router-dom';

const IntroVisual = () => {
  const history = useHistory();
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <section className={`col-12 intro-visual ${start && 'active'}`}>
      <div className="col-12 col-center mw-1230 inner pl15 pr15">
        <div className="visual-text">
          <div className="mb-sm-8 mb20">
            <h3 className="tc line-height38 show-web bold">
              전문 스타일리스트가 당신을 위해
              <br />
              퍼스널 스타일링을 선물 드립니다.
            </h3>

            <h3 className="tc show-mobile">
              한 손으로 전문 스타일리스트의
              <br />
              <span className="bold">퍼스널 스타일링</span> 을 받아보세요.
            </h3>
          </div>

          <div>
            <h5 className="tc color-8282">
              SCOT은 당신에게 어울리는 옷을 <br className="hidden-sm show" /> 추천하는 의류 추천 서비스 입니다. <br className="hidden show-sm" />
              <br className="hidden-sm show" />
              웨어앳 회원이 되시면 다양한 서비스를 <br className="hidden-sm show" />
              이용하실 수 있습니다.
            </h5>
          </div>
        </div>

        <div className="visual-img-container mb30">
          <img src={Intro0} alt="Main-img" />
        </div>

        <div className="btn-style1 large width-fit" onClick={() => history.push('/styleTestIntro')}>
          <p className="btn-font font-white d-flex y-center">30초컷 무료테스트 지금 바로 진행하기</p>
        </div>
      </div>
    </section>
  );
};
export default IntroVisual;
