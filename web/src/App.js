import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Overview from './components/overview/Overview';
import Subscribe from './components/subscribe/Subscribe';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
