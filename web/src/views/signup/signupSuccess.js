import React from 'react';
import successIcon from 'assets/img/sucessCheck.png';
import { Link } from 'react-router-dom';

const SignupSuccess = () => {
  return (
    <>
      <div className="sucess-form">
        <div className="mb24">
          <img src={successIcon} alt="" />
        </div>

        <div className="tc mb40">
          <h4>웨어앳 회원가입을 축하드립니다! </h4>
          <h4>지금 바로 웨어앳 서비스를 이용해보세요.</h4>
        </div>

          <Link to="/login" className="link-width-100">
            <div className="btn-style1 wid100 tc">
              <p className="btn-font font-white">로그인 하러가기</p>
            </div>
          </Link>
      </div>
    </>
  );
};

export default SignupSuccess;
