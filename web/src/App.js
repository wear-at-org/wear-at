import React from 'react';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import 'assets/scss/index.scss';
import { Provider } from 'react-redux';
import store from 'store';
import Loader from 'components/layout/Spinner';
import Routers from 'routers';
import Checkbot from 'views/Checkbot';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore,
} from 'redux-persist';

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header />
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
