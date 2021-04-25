import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/img/logo.png';
import menu from 'assets/img/menu.png';
import Toast from 'components/Toast';
import { useSelector } from 'react-redux';
import { userInfoName } from '../../store';
import Profile from './Profile';

export default function Header({ setDrawerStatus }) {
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
              <li>
                <Link to="/intro" className="styleTip">
                  STYLE TIP
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
            {loginStatus !== 'login' ? (
              <ul>
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
              </ul>
            ) : (
              <Profile />
            )}
          </div>
        </div>

        <div className="mobile">
          <ul className="d-flex x-eq y-center">
            <li>
              <Link to="/">
                <h1 className="logo">
                  <img src={Logo} alt="logo" />
                </h1>
              </Link>
            </li>

            <li>
              <div className="menu" onClick={() => setDrawerStatus(true)}>
                <img src={menu} alt="menu" />
              </div>
            </li>
          </ul>
        </div>

        <Toast />
      </header>
    </>
  );
}
