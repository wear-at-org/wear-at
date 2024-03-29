import ImageUpload from 'components/ImageUpload';
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignHook from 'hooks/useSignHook';

const Lnb = () => {
  const { pathname } = useLocation();
  const { logout } = SignHook();
  return (
    <div className="left-router">
      <ImageUpload />

      <div className="left-link-container">
        <ul>
          <li>
            <Link to="/mypage" className={pathname.includes('mypage') ? 'active' : ''}>
              프로필 수정
            </Link>
          </li>
          <li>
            <Link to="/styleTestList" className={pathname.includes('styleTestList') ? 'active' : ''}>
              스타일테스트 내역
            </Link>
          </li>
          {/* <li>
            <Link to="/mypage">북마크</Link>
          </li>
          <li>
            <Link to="/mypage">작성한 글</Link>
          </li> */}
          <li>
            <Link to="/changePassword">비밀번호 변경</Link>
          </li>
          <li className="logout" onMouseUpCapture={() => logout()} onClick={() => logout()}>
            <div>로그아웃</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Lnb);
