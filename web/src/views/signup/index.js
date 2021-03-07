import React, { useReducer } from 'react';

const Signup = () => {
  const check = () => {
    console.log('check');
  };

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-350">
        <div className="pr15 pl15 signup-container">
          <div className="mb32 tc">
            <h3>회원가입</h3>
          </div>

          <div>
            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이름
                </label>
              </div>

              <div className="mb16">
                <input type="text" className="input-style1" id="name" />
              </div>

              <div className="error-container">
                <p className="error-font">
                  이미 가입된 이메일 주소입니다. 다른 이메일을 입력하여 주세요.
                </p>
              </div>
            </div>

            <div className="">
              <input type="submit" value="동의하고 회원가입" className="btn-style1 wid100 btn-font-style1 tc middle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
