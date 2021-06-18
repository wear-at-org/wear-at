import React, { useCallback } from 'react';
import Logo from 'assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import user from 'assets/img/user.png';
import { userInfoName } from '../../store';

const Drawer = ({ drawerStatus, setDrawerStatus }) => {
  const { isLogin } = useSelector((state) => state[userInfoName]);
  const clickDrawerEvent = useCallback(
    (e) => {
      if (e.target.classList.contains('drawer-container')) {
        setDrawerStatus(false);
      }
    },
    [setDrawerStatus],
  );
  return (
    <div className={drawerStatus ? 'drawer-container active' : 'drawer-container'} onClick={(e) => clickDrawerEvent(e)}>
      <div className="drawer-inner">
        <div className="left-nav">
          <ul>
            <li>
              <Link to="/">
                <h1 className="logo">
                  <img src={Logo} alt="logo" />
                </h1>
              </Link>
            </li>
            <li>
              <Link to="/intro">서비스 소개</Link>
            </li>
            <li>
              <Link to="/intro" className="styleTip">
                스타일 팁
              </Link>
            </li>
            <li>
              <Link to="/intro">커뮤니티</Link>
            </li>
            <li>
              <Link to="/intro">고객센터</Link>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          <ul>
            {!isLogin ? (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/intro">
                    <div className="btn-style1">
                      <p className="btn-font font-white">지금 시작하기</p>
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              <li className="mypage">
                <Link to="/mypage">
                  <img src={user} alt="user-img" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
