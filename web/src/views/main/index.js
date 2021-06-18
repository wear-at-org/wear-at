import React from 'react';
import BottomStyle from './components/BottomStyle';
import MainCard from './components/MainCard';
import MainParteners from './components/MainParteners';
import MainTip from './components/MainTip';
import MainVisual from './components/MainVisual';

const Main = () => (
  <>
    <MainVisual />
    <MainParteners />
    <div className="col-12 col-center mw-1230">
      <div className="col-12 pr15 pl15">
        <MainCard />
      </div>
    </div>
    <MainTip />
    <BottomStyle />
  </>
);

export default Main;
