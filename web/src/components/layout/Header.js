import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/img/logo.png';
import menu from 'assets/img/menu.png';
import mLogo from 'assets/img/logo-m.png';
import { useSelector } from 'react-redux';
import { userInfoName } from '../../store';
import Profile from './Profile';

export default function Header({ setDrawerStatus, setSearchStatus, searchStatus }) {
  const { loginStatus } = useSelector((state) => state[userInfoName]);
  const { pathname } = useLocation();
  return (
    <>
      <header className="col-12 nav-container">
        <div className="web d-flex x-eq pl40 pr24">
          <div className="left-nav">
            <ul>
              <li>
                <Link to="/">
                  <h1 className="logo">
                    <img src={Logo} alt="logo" />
                  </h1>
                </Link>
              </li>
              <li className={pathname.includes('intro') ? 'active' : ''}>
                <Link to="/intro">서비스 소개</Link>
              </li>
              {/* <li className={pathname.includes('styleTip') ? 'active' : ''}>
                <Link to="/styleTip">스타일 팁</Link>
              </li> */}
              {/* <li>
                <Link to="/intro">커뮤니티</Link>
              </li>
              <li>
                <Link to="/intro">고객센터</Link>
              </li> */}
            </ul>
          </div>
          <div className="right-nav">
            {loginStatus !== 'login' ? (
              <ul>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/styleTestIntro">
                    <div className="btn-style1">
                      <p className="btn-font font-white small">지금 시작하기</p>
                    </div>
                  </Link>
                </li>
              </ul>
            ) : (
              <Profile setSearchStatus={setSearchStatus} searchStatus={searchStatus} />
            )}
          </div>
        </div>

        <div className="mobile">
          <ul className="d-flex x-eq y-center">
            <li>
              <div className="menu" onClick={() => setDrawerStatus(true)}>
                <img src={menu} alt="menu" />
              </div>
            </li>
            <li>
              <Link to="/">
                <h2 className="logo">
                  <img src={mLogo} alt="logo" />
                </h2>
              </Link>
            </li>
            <li>
              {/* <div
                onMouseUpCapture={() => {
                  setSearchStatus(!searchStatus);
                }}
              >
                <div className="search">
                  <img src={Search} alt="search" />
                </div>
              </div> */}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
