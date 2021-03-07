import React, { useState } from 'react';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import 'assets/scss/index.scss';
import { Provider } from 'react-redux';
import store from 'store';
import Loader from 'components/layout/Spinner';
import Routers from 'routers';
import Checkbot from 'views/checkbot';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore,
} from 'redux-persist';
import Drawer from 'components/layout/Drawer';

function App() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={drawerStatus ? 'App drawerActive' : 'App'}>
          <Drawer drawerStatus={drawerStatus} setDrawerStatus={setDrawerStatus} />
          <Header setDrawerStatus={setDrawerStatus} />
          <Routers />
          <Checkbot />
          <Footer />
        </div>
        <Loader />
      </PersistGate>
    </Provider>
  );
}

export default App;
