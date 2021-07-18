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
import SearchHeader from 'components/layout/SearchHeader';
import { useLocation } from 'react-router-dom';
import Meta from 'components/Meta';
import Toast from 'components/Toast';
import PopupStyle1 from 'components/PopupStyle1';
import popupHook from 'hooks/usePopupHook';

function App() {
  const [showPopup] = popupHook();
  const {
    loginStatus,
    info: { nickname },
  } = useSelector((state) => state[userInfoName]);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const { pathname } = useLocation();

  console.log(nickname);
  useEffect(() => {
    if (loginStatus === 'login' && !pathname.includes('sns-login') && !pathname.includes('login') && nickname === '') {
      showPopup({
        title: `SNS 회원 가입을 마무리하여 주세요.`,
        btnMsg: '회원가입',
        goLink: '/sns-login',
      });
    }
  });

  return (
    <>
      <Meta />
      <div className={`App ${drawerStatus && 'drawerActive'}`}>
        <PopupStyle1 />
        <Toast />
        <Drawer drawerStatus={drawerStatus} setDrawerStatus={setDrawerStatus} />
        {!pathname.includes('styletest') && (
          <Header setDrawerStatus={setDrawerStatus} searchStatus={searchStatus} setSearchStatus={setSearchStatus} />
        )}
        <SearchHeader searchStatus={searchStatus} setSearchStatus={setSearchStatus} />
        <Routers />
        {/* <Checkbot /> */}
        {!pathname.includes('styletest') && <Footer />}

        <Loader />
      </div>
    </>
  );
}

export default App;
