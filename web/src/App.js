import React, { useState } from 'react';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import 'assets/scss/index.scss';
import Loader from 'components/layout/Spinner';
import Routers from 'routers';
import Checkbot from 'views/checkbot';
import Drawer from 'components/layout/Drawer';
import { useSelector } from 'react-redux';
import { userInfoName } from './store';
import { useEffect } from 'react';
import LogoutHook from 'hooks/useLogoutHook';

function App() {
  const [logout] = LogoutHook();
  const {
    loginStatus,
    info,
  } = useSelector((state) => state[userInfoName]);
  const [drawerStatus, setDrawerStatus] = useState(false);

  useEffect(() => {
    if (loginStatus === 'ing' && info.nickName === null) {
      logout();
    }
  }, [loginStatus, logout, info]);

  return (
    <div className={drawerStatus ? 'App drawerActive' : 'App'}>
      <Drawer drawerStatus={drawerStatus} setDrawerStatus={setDrawerStatus} />
      <Header setDrawerStatus={setDrawerStatus} />
      <Routers />
      <Checkbot />
      <Footer />
      <Loader />
    </div>
  );
}

export default App;
