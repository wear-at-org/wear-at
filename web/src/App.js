import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import 'assets/scss/index.scss';
import { Provider } from 'react-redux';
import store from 'store';
import Loader from 'components/layout/Spinner';
import Routers from 'routers';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <main>
            <Routers />
          </main>
        </Container>
        <Footer />
      </div>
      <Loader />
    </Provider>
  );
}

export default App;
