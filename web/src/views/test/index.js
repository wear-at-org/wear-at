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
import scot from 'api/scot';

const Login = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');


  const [isLogin, setIsLogin] = LoginHook();
  const [showToast, hideToast] = toastHook({ type: '', content: '' });
  const login = async () => {
    try {
      await scot.login(id, password);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = async (provider) => {
    try {
      await scot.logout(provider);
    } catch (e) {
      console.log(e);
    }
  }
  const loginProvider = async (provider) => {
    try {
      const urlStr = await scot.getAuthURL(provider);
      window.location = urlStr;
    } catch (e) {
      console.log(e);
    }
  }
  const signUp = async () => {
    try {
      const payload = {
        name: name,
        email: id,
        nickname: nickname,
        password: password,
        gender: gender,
      };
      await scot.signUp(payload);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
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
                  placeholder="이메일 아이디"
                  onChange={(e) => setId(e.target.value)}
                  className="input-style1"
                />
              </div>
              <div className="mb24">
                <input
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style1"
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="mb16">
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  className="input-style1"
                />
              </div>
              <div className="mb16">
                <input
                  type="text"
                  placeholder="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  className="input-style1"
                />
              </div>
              <div className="mb16">
                <input
                  type="text"
                  placeholder="gender"
                  onChange={(e) => setGender(e.target.value)}
                  className="input-style1"
                />
              </div>


              <div className="">
                <input
                  type="submit"
                  value="로그인"
                  onClick={login}
                  className="btn-style1 wid100 btn-font-style1 tc middle"
                />
                <input
                  type="submit"
                  value="로그아웃"
                  onClick={() => logout()}
                  className="btn-style1 wid100 btn-font-style1 tc middle"
                />
                <input
                  type="submit"
                  value="kakao로그아웃"
                  onClick={() => logout('kakao')}
                  className="btn-style1 wid100 btn-font-style1 tc middle"
                />
                <input
                  type="submit"
                  value="회원가입"
                  onClick={signUp}
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
                  {/* <Link to="/"> */}
                    <img src={kakao} alt="kakao" onClick={() => loginProvider("kakao")}/>
                  {/* </Link> */}
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
