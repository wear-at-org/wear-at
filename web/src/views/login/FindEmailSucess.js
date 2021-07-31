import React from 'react';
import { Link } from 'react-router-dom';

export default function FindEmailSucess({ location }) {
  return (
    <div className="not-found">
      <h3 className="tc mb32">
        입력하신 정보로 <br />
        가입된 계정이 있습니다.
      </h3>
      <div className="mb40">
        <h5>{location.state.params.email}</h5>
      </div>

      <Link to="/login">
        <div className="btn-style1 middle width-260 tc type-black">
          <p className="btn-font font-white">로그인 하러가기</p>
        </div>
      </Link>
    </div>
  );
}
