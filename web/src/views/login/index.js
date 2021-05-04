import React, { useEffect, useState } from 'react';
import LoginHook from 'hooks/useLoginHook';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import SnsLoginComponent from 'components/SnsLoginComponent';

const Login = () => {
  const [saveId, setSaveId] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, login] = LoginHook();

  const loginProcess = async (e) => {
    e.preventDefault();
    login(email, password, saveId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginProcess(e);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const saveEmailCookie = cookies.get('saveEmail');
    if (saveEmailCookie) {
      setSaveId(true);
      setEmail(saveEmailCookie);
    }
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-430 login-wrap">
        <div className="pr15 pl15 login-container">
          <div className="mb32 tc">
            <h3>로그인</h3>
          </div>

          <form onSubmit={loginProcess}>
            <div className="mb20">
              <div className="mb16">
                <input
                  value={email}
                  type="email"
                  placeholder="이메일 아이디"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style1"
                  autoComplete="on"
                />
              </div>
              <div className="mb24">
                <input
                  value={password}
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style1"
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
              </div>
              <div className="">
                <input
                  type="submit"
                  value="로그인"
                  className="btn-style1 wid100 btn-font font-white middle"
                  disabled={!(email && password)}
                />
              </div>
            </div>
            <div className="d-flex x-eq y-center pl8 pr8 login-utils-container">
              <div className="chkbox-con">
                <input
                  type="checkbox"
                  id="saveId"
                  className="input-style-checkbox"
                  checked={saveId}
                  onChange={() => {
                    setSaveId(!saveId);
                  }}
                />
                <div className="chk-label-container">
                  <label htmlFor="saveId">아이디 저장</label>
                </div>
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

            <SnsLoginComponent />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
