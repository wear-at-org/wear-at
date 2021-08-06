import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from 'store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { render, hydrate } from 'react-dom';

const rootElement = document.getElementById('root');
const persistor = persistStore(store);
if(process.env.NODE_ENV !== 'development') {
  console.log = null
}

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    rootElement,
  );
} else {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    rootElement,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
