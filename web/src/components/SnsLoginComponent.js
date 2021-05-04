import React from 'react';
import kakao from 'assets/img/kakao.png';
import naver from 'assets/img/naver.png';
import facebook from 'assets/img/facebook.png';
import google from 'assets/img/google.png';
import apple from 'assets/img/apple.png';
import api from 'api';
import { Link } from 'react-router-dom';

const SnsLoginComponent = () => {
  const snsLogin = async (provider) => {
    const {
      data: { url },
    } = await api.get(`auth/url?provider=${provider}`);
    window.location.href = url;
  };

  return (
    <div className="social-login-container">
      <div className="tc mb24">
        <p className="caption-font font-color-grayAEAE">소셜 계정으로 간편 로그인</p>
      </div>
      <ul>
        <li
          className="kakao"
          onClick={() => {
            snsLogin('kakao');
          }}
        >
          <img src={kakao} alt="kakao" />
        </li>
        <li
          className="naver"
          onClick={() => {
            snsLogin('naver');
          }}
        >
          <img src={naver} alt="naver" />
        </li>

        <li
          className="facebook"
          onClick={() => {
            snsLogin('facebook');
          }}
        >
          <img src={facebook} alt="facebook" />
        </li>

        <li
          className="google"
          onClick={() => {
            snsLogin('google');
          }}
        >
          <img src={google} alt="google" />
        </li>

        <li className="apple">
          <Link to="/">
            <img src={apple} alt="apple" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SnsLoginComponent;
