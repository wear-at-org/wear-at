import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router-dom';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import Overview from 'views/Overview/Overview';
import Subscribe from 'views/Subscribe/Subscribe';
import 'assets/scss/index.scss';
import { Provider } from 'react-redux';
import store from 'store';
import Loader from 'components/layout/Spinner';
import NotFound from 'views/NotFound';

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
            <Route path="*" component={NotFound} />
          </main>
        </Container>
        <Footer />
      </div>
      <Loader />
    </Provider>
  );
}

export default App;
