import React from 'react';
import successIcon from 'assets/img/sucessCheck.png';
import { Link } from 'react-router-dom';

const SignupSuccess = () => {
  return (
    <div className="sucess-form">
      <div>
        <img src={successIcon} alt="" style={{ width: 80, height: 80 }} />
      </div>
      <div className="mb32">
        <h3>회원가입 완료 </h3>
      </div>
      <div className="tc mb40">
        <h4>
          웨어앳 회원가입을 축하드립니다! <br />
          지금 바로 웨어앳 서비스를 이용해보세요
        </h4>
      </div>

      <Link to="/login" className="link-width-100">
        <div className="btn-style1 middle wid100 tc type-black">
          <p className="btn-font font-white">로그인 하러가기</p>
        </div>
      </Link>
    </div>
  );
};

export default SignupSuccess;
