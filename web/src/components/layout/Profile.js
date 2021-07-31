import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultProfile from 'assets/img/default-user.png';
import SignHook from 'hooks/useSignHook';
import { useHistory } from 'react-router-dom';
import { loginProcess } from 'store/userinfo-store';
import { useSelector } from 'react-redux';
import { userInfoName } from 'store';

const Profile = ({ setSearchStatus, searchStatus }) => {
  const { info } = useSelector((state) => state[userInfoName]);
  console.log(info);
  let history = useHistory();
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState(false);
  const { logout } = SignHook();
  const navigate = (params) => {
    history.push(params);
    setActiveMenu(!activeMenu);
  };

  return (
    <ul className={'profile-container'}>
      <li className="mypage">
        {/* <div
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
        </div> */}
        <div onMouseUpCapture={() => setActiveMenu(!activeMenu)}>
          <img src={info.profileImage || defaultProfile} alt="user-img" />
        </div>
      </li>

      <ul className={`hover-menu ${activeAlarm && 'active'}`}>
        <li>
          <Link to="/styleTestList">스타일테스트 내역</Link>
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
        <li onMouseUpCapture={() => navigate('/styleTestList')}>스타일테스트 내역</li>
        {/* <li>
          <Link to="/mypage">북마크</Link>
        </li> */}
        <li onMouseUpCapture={() => navigate('/mypage')}>개인정보</li>
        <li className="logout" onMouseUpCapture={() => logout()} onClick={() => logout()}>
          로그아웃
        </li>
      </ul>
    </ul>
  );
};

export default Profile;
