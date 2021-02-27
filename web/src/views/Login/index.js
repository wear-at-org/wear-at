import React, { useEffect, useState } from 'react';
import LoginHook from 'hooks/LoginHook';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = LoginHook();

  const loginProcess = async () => {
    setIsLogin(id, password);
  };

  useEffect(() => {
    console.log(isLogin);
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="">
        <input type="text" onChange={(e) => setId(e.target.value)} />
      </div>
      <div className="">
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="">
        <input type="submit" value="로그인" onClick={loginProcess} />
      </div>
    </div>
  );
};

export default Login;
