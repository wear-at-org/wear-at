import ImageUpload from 'components/ImageUpload';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Mroute = () => {
  const { pathname } = useLocation();
  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-1280">
        <ImageUpload isMypage={false} />

        <ul className="m-route">
          <li>
            <Link to="/mypage" className={pathname.includes('mypage') ? 'active' : ''}>
              프로필 수정
            </Link>
          </li>
          <li>
            <Link to="/testInfo" className={pathname.includes('testInfo') ? 'active' : ''}>
              스타일테스트 내역
            </Link>
          </li>
          <li>
            <Link to="/changePassword">비밀번호 변경</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mroute;
