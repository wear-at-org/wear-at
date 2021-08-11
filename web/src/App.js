import React, { useState } from 'react';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import 'assets/scss/index.scss';
import Loader from 'components/layout/Spinner';
import Routers from 'routers';
import Drawer from 'components/layout/Drawer';
import SearchHeader from 'components/layout/SearchHeader';
import { useLocation } from 'react-router-dom';
import Meta from 'components/Meta';
import Toast from 'components/Toast';
import PopupStyle1 from 'components/PopupStyle1';

function App() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const { pathname } = useLocation();

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
        {!pathname.includes('styletest') && pathname !== '/' && <Footer />}

        <Loader />
      </div>
    </>
  );
}

export default App;
