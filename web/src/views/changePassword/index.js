import React, { useState, useEffect } from 'react';

const FindIdPassword = () => {
  const [paswword, setPassword] = useState('');
  const [paswwordCheck, setPasswordCheck] = useState('');
  const findPassword = () => {};
  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-350">
        <div className="pr15 pl15 find-container">
          <div className="mb48 tc">
            <h3>비밀번호 변경하기</h3>
          </div>

          <form onSubmit={findPassword}>
            <div className="mb20">
              <div className="mb16">
                <input
                  value={paswword}
                  type="email"
                  placeholder="이메일 아이디"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style1"
                  autoComplete="on"
                />
              </div>
            </div>

            <div className="mb20">
              <div className="mb16">
                <input
                  value={paswwordCheck}
                  type="email"
                  placeholder="이메일 아이디"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  className="input-style1"
                  autoComplete="on"
                />
              </div>
            </div>

            <div className="">
              <input
                type="submit"
                value="비밀번호 찾기"
                className="btn-style1 wid100 btn-font-style1 tc middle"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindIdPassword;
