import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router-dom';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import Overview from 'views/Overview/Overview';
import Subscribe from 'views/Subscribe/Subscribe';
import './App.scss';
import { Provider } from 'react-redux';
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <main>
            <Route path="/" exact component={Overview} />
            <Route path="/subscribe" exact component={Subscribe} />
          </main>
        </Container>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
