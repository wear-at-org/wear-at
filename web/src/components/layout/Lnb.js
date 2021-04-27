import ImageUpload from 'components/ImageUpload';
import React from 'react';
import { Link } from 'react-router-dom';

const Lnb = () => {
  return (
    <div className="left-router">
      <ImageUpload />

      <div className="left-link-container">
        <ul>
          <li>
            <Link to="/styletest">스타일테스트 내역</Link>
          </li>
          <li>
            <Link to="/mypage">북마크</Link>
          </li>
          <li>
            <Link to="/mypage">작성한 글</Link>
          </li>
          <li className="active">
            <Link to="/mypage">프로필 수정</Link>
          </li>
          <li>
            <Link to="/mypage">비밀번호 변경</Link>
          </li>
          <li className="logout">로그아웃</li>
        </ul>
      </div>
    </div>
  );
};

export default Lnb;
