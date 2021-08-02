import React from 'react';
import { Link } from 'react-router-dom';
import mail from 'assets/img/mail.png';

export default function FindPasswordSucess() {
  return (
    <div className="not-found">
      <div className="mb27">
        <img src={mail} alt="mail-img" />
      </div>
      <h4 className="tc mb32">
        입력해주신 아래의 이메일 주소로 <br />
        비밀번호 재설정 안내 메일이 전송되었습니다.
      </h4>

      <Link to="/login">
        <div className="btn-style1 middle width-260 tc type-black">
          <p className="btn-font font-white">로그인 하러가기</p>
        </div>
      </Link>
    </div>
  );
}
