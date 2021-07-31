import SignHook from 'hooks/useSignHook';
import React, { useState, useEffect } from 'react';

const FindIdPassword = () => {
  const { findPassword, findEmail } = SignHook();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthmonth, setBirthmonth] = useState('');
  const [birthyear, setBirthyear] = useState('');

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-430 pl15 pr15">
        <div className="pr15 pl15 find-container">
          <div className="mb48 tc">
            <h3>이메일/비밀번호 찾기</h3>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mb60">
            <div className="mb24">
              <h5 className="bold">이메일(아이디) 찾기</h5>
            </div>

            <div className="mb8">
              <h5>이름</h5>
            </div>

            <div className="mb8">
              <input
                type="text"
                className="input-style1 small"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb8">
              <h5>생년월일</h5>
            </div>

            <div className="date-birth-container mb24">
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" required onChange={(e) => setBirthyear(e.target.value)} value={birthyear || ''}>
                  <option value="" disabled hidden>
                    년도
                  </option>
                  {[...Array(60)].map((_, index) => {
                    return (
                      <option key={`year-${index}`} value={new Date().getFullYear() - index - 10}>
                        {new Date().getFullYear() - index - 10}년
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" required onChange={(e) => setBirthmonth(e.target.value)} value={birthmonth || ''}>
                  <option value="" disabled hidden>
                    월
                  </option>
                  {[...Array(12)].map((_, index) => {
                    return (
                      <option key={`month-${index}`} value={index + 1}>
                        {index + 1}월
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" required onChange={(e) => setBirthday(e.target.value)} value={birthday || ''}>
                  <option value="" disabled hidden>
                    일
                  </option>
                  {[...Array(31)].map((_, index) => {
                    return (
                      <option key={`day-${index}`} value={index + 1}>
                        {index + 1}일
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <input
                type="button"
                value="이메일(아이디) 확인"
                className="btn-style1 small wid100 type-black btn-font font-white"
                onClick={() => {
                  findEmail({ name, birthday, birthmonth, birthyear });
                }}
              />
            </div>
          </form>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb24">
              <h5 className="bold">비밀번호 찾기</h5>
            </div>

            <div className="mb8">
              <h5>이메일</h5>
            </div>

            <div className="mb24">
              <input
                type="text"
                className="input-style1 small"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="가입 시 등록한 이메일 주소를 입력해주세요."
              />
            </div>
            <div>
              <input
                type="button"
                value="비밀번호 확인"
                className="btn-style1 wid100 small tc type-white btn-font color-black333 bold"
                onClick={() => {
                  findPassword({ email });
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindIdPassword;
