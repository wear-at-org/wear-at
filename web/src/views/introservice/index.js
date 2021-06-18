import React, { useEffect } from 'react';
import IntroVisual from './components/IntroVisual';
import BottomStyle from 'views/main/components/BottomStyle';
import IntroList from './components/IntroList';

const Introservice = () => {
  return (
    <div className="">
      <IntroVisual />
      <IntroList />
      <BottomStyle />
    </div>
  );
};

export default Introservice;
