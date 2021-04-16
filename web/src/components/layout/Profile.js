import React, { useState } from 'react';
import user from 'assets/img/user.png';
import { Link, useHistory } from 'react-router-dom';
import LogoutHook from 'hooks/useLogoutHook';

const Profile = () => {
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(false);
  const nickName = '소소한다람쥐님';
  const [logout] = LogoutHook();
  return (
    <ul
      className={activeMenu ? 'profile-container active' : 'profile-container'}
      onMouseUpCapture={() => setActiveMenu(!activeMenu)}
    >
      <li className="mypage">
        <p className="mypage-nickname">{nickName}</p>
        <img src={user} alt="user-img" />
      </li>

      <ul className="hover-menu">
        <li>
          <Link to="/mypage">스타일테스트 내역</Link>
        </li>
        <li>
          <Link to="/mypage">북마크</Link>
        </li>
        <li>
          <Link to="/mypage">개인정보</Link>
        </li>
        <li
          className="logout"
          onMouseUpCapture={() => logout()}
          onClick={() => logout()}
        >
          로그아웃
        </li>
      </ul>
    </ul>
  );
};

export default Profile;
