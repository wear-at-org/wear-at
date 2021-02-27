import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/img/temp-logo.png';

export default function Header() {
  return (
    <header className="col-12 d-flex nav-container">
      <div className="left-nav">
        <ul>
          <li>
            <Link to="/">
              <h1>
                <img src={Logo} alt="logo" />
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/intro">
              서비스 소개
            </Link>
          </li>
          <li>
            <Link to="/intro">
              STYLE TIP
            </Link>
          </li>
          <li>
            <Link to="/intro">
              커뮤니티
            </Link>
          </li>
          <li>
            <Link to="/intro">
              고객센터
            </Link>
          </li>
        </ul>
      </div>

      <div className="right-nav">
        <ul>
          <li>
            <Link to="/login">
              로그인
            </Link>
          </li>
          <li>
            <Link to="/signup">
              회원가입
            </Link>
          </li>
          <li>
            <Link to="/intro">
              <div className="btn-style1">
                스타일 테스트
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
