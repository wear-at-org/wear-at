import React, { useEffect, useState } from 'react';
import LoginHook from 'hooks/useLoginHook';
import { Link, useHistory } from 'react-router-dom';
import kakao from 'assets/img/kakao.png';
import naver from 'assets/img/naver.png';
import facebook from 'assets/img/facebook.png';
import google from 'assets/img/google.png';
import apple from 'assets/img/apple.png';
import { LoginError } from 'assets/common/error.json';
import toastHook from 'hooks/useToastHook';

const Login = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = LoginHook();
  const [showToast, hideToast] = toastHook({ type: '', content: '' });
  const loginProcess = async () => {
    hideToast();
    setIsLogin(id, password).then((res) => {
      if (!res) {
        showToast({ type: 'error', content: LoginError.loginError });
      } else {
        hideToast();
        history.push('/');
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginProcess();
    }
  };

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-350">
        <div className="pr15 pl15 login-container">
          <div className="mb32 tc">
            <h3>로그인</h3>
          </div>

          <div>
            <div className="mb20">
              <div className="mb16">
                <input
                  type="email"
                  placeholder="test"
                  onChange={(e) => setId(e.target.value)}
                  className="input-style1"
                />
              </div>
              <div className="mb24">
                <input
                  type="password"
                  placeholder="123 입력시 임시 로그인"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style1"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="">
                <input
                  type="submit"
                  value="로그인"
                  onClick={loginProcess}
                  className="btn-style1 wid100 btn-font-style1 tc middle"
                />
              </div>
            </div>
            <div className="d-flex x-eq y-center pl8 pr8 login-utils-container">
              <div className="chkbox-con">
                <input type="checkbox" id="saveId" className="input-style-checkbox" />
                <label htmlFor="saveId">아이디 저장</label>
              </div>
              <ul className="d-flex">
                <li className="mr10">
                  <Link to="/findIdPassword">아이디/비밀번호 찾기</Link>
                </li>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
              </ul>
            </div>

            <div className="tc mb24">
              <p className="caption-font font-color-grayAEAE">소셜 계정으로 간편 로그인</p>
            </div>

            <div className="social-login-container">
              <ul>
                <li className="kakao">
                  <Link to="/">
                    <img src={kakao} alt="kakao" />
                  </Link>
                </li>
                <li className="naver">
                  <Link to="/">
                    <img src={naver} alt="naver" />
                  </Link>
                </li>

                <li className="facebook">
                  <Link to="/">
                    <img src={facebook} alt="facebook" />
                  </Link>
                </li>

                <li className="google">
                  <Link to="/">
                    <img src={google} alt="google" />
                  </Link>
                </li>

                <li className="apple">
                  <Link to="/">
                    <img src={apple} alt="apple" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
