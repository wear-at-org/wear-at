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
            <h3>이메일/비밀번호 찾기</h3>
          </div>

          <form onSubmit={findPassword}>
            <div className="date-birth-container">
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" name="" id="" required>
                  <option value="" disabled selected hidden>
                    년도
                  </option>
                  {[...Array(60)].map((_, index) => {
                    return (
                      <option value={new Date().getFullYear() - index}>
                        {new Date().getFullYear() - index}년
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" name="" id="" required>
                  <option value="" disabled selected hidden>
                    월
                  </option>
                  {[...Array(12)].map((_, index) => {
                    return <option value={index + 1}>{index + 1}월</option>;
                  })}
                </select>
              </div>
              <div className="width-per-33 pl4 pr4">
                <select className="select-style1" name="" id="" required>
                  <option value="" disabled selected hidden>
                    일
                  </option>
                  {[...Array(31)].map((_, index) => {
                    return <option value={index + 1}>{index + 1}일</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="">
              <input
                type="submit"
                value="이메일 확인"
                className="btn-style1 wid100 middle type-black btn-font font-white"
              />
            </div>
          </form>

          <div className="">
            <input
              type="submit"
              value="비밀번호 확인"
              className="btn-style1 wid100 tc middle type-white btn-font font-black333"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindIdPassword;
