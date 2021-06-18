import React, { useState } from 'react';
import user from 'assets/img/user.png';
import search from 'assets/img/search.png';
import alam from 'assets/img/alam.png';
import { Link } from 'react-router-dom';
import LogoutHook from 'hooks/useLogoutHook';

const Profile = ({ setSearchStatus, searchStatus }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [logout] = LogoutHook();
  return (
    <ul className={activeMenu ? 'profile-container active' : 'profile-container'}>
      <li className="mypage">
        <div
          className="mr19"
          onMouseUpCapture={() => {
            console.log(searchStatus);
            setSearchStatus(!searchStatus);
          }}
        >
          <img src={search} alt="search" style={{ width: '24px', height: '24px' }} />
        </div>
        <div className="mr19">
          <img src={alam} alt="search" style={{ width: '24px', height: '24px' }} />
        </div>
        <div onMouseUpCapture={() => setActiveMenu(!activeMenu)}>
          <img src={user} alt="user-img" />
        </div>
      </li>

      <ul className="hover-menu">
        <li>
          <Link to="/styletest">스타일테스트 내역</Link>
        </li>
        <li>
          <Link to="/mypage">북마크</Link>
        </li>
        <li>
          <Link to="/mypage">개인정보</Link>
        </li>
        <li className="logout" onMouseUpCapture={() => logout()} onClick={() => logout()}>
          로그아웃
        </li>
      </ul>
    </ul>
  );
};

export default Profile;
