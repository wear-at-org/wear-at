import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { render, hydrate } from 'react-dom';
import '@ant-design/pro-form/dist/form.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'assets/scss/index.scss';
import '@ant-design/pro-list/dist/list.css';

const rootElement = document.getElementById('root');
const persistor = persistStore(store);

if (rootElement.hasChildNodes()) {
	hydrate(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<App />
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
					<App />
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
