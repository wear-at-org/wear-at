import React, { useState, useEffect } from 'react';
import { checkSpecial, checkLetter } from 'utils';
import SignHook from 'hooks/useSignHook';
import Cookies from 'universal-cookie';

const ChangwPassword = () => {
  const cookies = new Cookies();
  const { changePassword } = SignHook();
  const [paswword, setPassword] = useState('');
  const [paswwordCheck, setPasswordCheck] = useState('');
  const changwPassword = (e) => {
    e.preventDefault();
    changePassword(paswword);
  };

  const checkPass = () => {
    return checkLetter(paswword) && checkSpecial(paswword) && paswword.length > 7 && paswword.length < 21 && paswword === paswwordCheck;
  };

  useEffect(() => {
    const token = cookies.get('_watt');
    console.log(token);
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-430 pl15 pr15">
        <div className="pr15 pl15 find-container">
          <div className="mb48 tc">
            <h3>비밀번호 변경하기</h3>
          </div>

          <form onSubmit={changwPassword}>
            <div className="mb10">
              <h5 className="mb8">새로운 비밀번호</h5>
              <input
                value={paswword}
                type="password"
                placeholder="새로운 비밀번호를 입력해주세요."
                onChange={(e) => setPassword(e.target.value)}
                className="input-style1"
                autoComplete="on"
              />
            </div>

            <div className="d-flex x-eq mb16">
              <div className={`check-pass ${checkLetter(paswword) ? 'active' : ''}`}>
                <p className="caption-font">영문 대/소문자</p>
              </div>

              <div className={`check-pass ${checkSpecial(paswword) ? 'active' : ''}`}>
                <p className="caption-font">숫자/특수문자 포함</p>
              </div>

              <div className={`check-pass ${paswword.length > 7 && paswword.length < 21 ? 'active' : ''}`}>
                <p className="caption-font">8자 ~ 20자사이</p>
              </div>
            </div>

            <div className="mb20">
              <h5 className="mb8">새로운 비밀번호 확인</h5>
              <input
                value={paswwordCheck}
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요."
                onChange={(e) => setPasswordCheck(e.target.value)}
                className="input-style1"
                autoComplete="on"
              />
            </div>

            <div>
              <input type="submit" className="btn-style1 wid100 btn-font font-white middle" disabled={!checkPass()} value="비밀번호 변경 완료" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangwPassword;
