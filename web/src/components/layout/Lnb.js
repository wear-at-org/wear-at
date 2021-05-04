import ImageUpload from 'components/ImageUpload';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Lnb = () => {
  return (
    <div className="left-router">
      <ImageUpload />

      <div className="left-link-container">
        <ul>
          <li>
            <Link to="/mypage" className={'active'}>
              프로필 수정
            </Link>
          </li>
          <li>
            <Link to="/styletestList">스타일테스트 내역</Link>
          </li>
          <li>
            <Link to="/mypage">북마크</Link>
          </li>
          <li>
            <Link to="/mypage">작성한 글</Link>
          </li>
          <li>
            <Link to="/mypage">비밀번호 변경</Link>
          </li>
          <li className="logout">
            <div className="">로그아웃</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lnb;
