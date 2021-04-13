import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from 'api';

const SNSLogin = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const data = api.get('user');
    console.log(data);
    console.log('sns login with id');
  });

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-350">
        <div className="pr15 pl15 login-container">
          <div className="mb32 tc">
            <h3>SNS 로그인</h3>
          </div>

          <div>
            <div className="mb20">
              <div className="mb16">
                <input
                  type="email"
                  placeholder="이메일 아이디"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style1"
                />
              </div>

              <div className="">
                <input
                  type="submit"
                  value="로그인"
                  className="btn-style1 wid100 btn-font-style1 tc middle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SNSLogin;
