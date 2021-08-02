import React from 'react';
import successIcon from 'assets/img/sucessCheck.png';
import { Link } from 'react-router-dom';

const CompleteStyleTest = () => {
  return (
    <div className="sucess-form">
      <div>
        <img src={successIcon} alt="" style={{ width: 80, height: 80 }} />
      </div>
      <div className="mb32">
        <h3>스타일테스트 완료</h3>
      </div>
      <div className="tc mb40">
        <h4>
          스타일리스트가 작성한 테스트 결과를 <br />
          일주일 이내로 가입하신 이메일로 보내드리니 <br />
          받은편지함을 꼭 확인해주세요!
        </h4>
      </div>

      <Link to="/styleTestList" className="link-width-100">
        <div className="btn-style1 middle wid100 tc type-black">
          <p className="btn-font font-white">확인</p>
        </div>
      </Link>
    </div>
  );
};

export default CompleteStyleTest;
