import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h3 className="tc mb32">
        오류가 발생했습니다.
        <br />
        로그인을 다시 시도해주세요.
      </h3>
      <h5 className="tc color-grayAEAE mb4">
        계속 오류가 발생할 경우,
        <br /> 아래 고객센터 메일로 문의 부탁드립니다.
      </h5>
      <div className="mb40">
        <a href="mailto:scot_corp@naver.com">
          <h5>scot_corp@naver.com</h5>
        </a>
      </div>

      <Link to="/login">
        <div className="btn-style1 middle width-260 tc type-black">
          <p className="btn-font font-white">로그인 하러가기</p>
        </div>
      </Link>
    </div>
  );
}
