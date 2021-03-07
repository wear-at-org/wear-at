import React from 'react';
import MainBottom from './components/MainBottom';
import MainCard from './components/MainCard';
import MainParteners from './components/MainParteners';
import MainTip from './components/MainTip';
import MainVisual from './components/MainVisual';

const Main = () => (
  <>
    <MainVisual />
    <div className="col-12 col-center mw-1230">
      <div className="col-12 pr15 pl15">
        <MainCard />
      </div>
    </div>
    <MainParteners />
    <MainTip />
    <MainBottom />
  </>

);

export default Main;
