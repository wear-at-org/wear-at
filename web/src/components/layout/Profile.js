import React, { useState } from 'react';
import search from 'assets/img/search.png';
import alam from 'assets/img/alam.png';
import { Link } from 'react-router-dom';
import LogoutHook from 'hooks/useLogoutHook';
import defaultProfile from 'assets/img/default-user.png';

const Profile = ({ setSearchStatus, searchStatus }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState(false);
  const [logout] = LogoutHook();
  return (
    <ul className={'profile-container'}>
      <li className="mypage">
        <div
          className="mr19 common-icon-size"
          onMouseUpCapture={() => {
            setSearchStatus(!searchStatus);
          }}
        >
          <img src={search} alt="search" />
        </div>
        <div
          className="mr19 common-icon-size"
          onMouseUpCapture={() => {
            setActiveMenu(false);
            if (window.innerWidth > 768) {
              setActiveAlarm(!activeAlarm);
            }
          }}
        >
          <img src={alam} alt="search" />
        </div>
        <div onMouseUpCapture={() => setActiveMenu(!activeMenu)}>
          <img src={defaultProfile} alt="user-img" />
        </div>
      </li>

      <ul className={`hover-menu ${activeAlarm && 'active'}`}>
        <li>
          <Link to="/testInfo">스타일테스트 내역</Link>
        </li>
        {/* <li>
          <Link to="/mypage">북마크</Link>
        </li> */}
        <li>
          <Link to="/mypage">개인정보</Link>
        </li>
        <li className="logout" onMouseUpCapture={() => logout()} onClick={() => logout()}>
          로그아웃
        </li>
      </ul>

      <ul className={`hover-menu ${activeMenu && 'active'}`}>
        <li>
          <Link to="/testInfo">스타일테스트 내역</Link>
        </li>
        {/* <li>
          <Link to="/mypage">북마크</Link>
        </li> */}
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
