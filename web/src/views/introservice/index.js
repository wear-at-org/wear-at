import React, { useEffect, useState } from 'react';
import IntroVisual from './components/IntroVisual';
import BottomStyle from 'views/main/components/BottomStyle';
import IntroList from './components/IntroList';
import { throttle } from 'lodash';

const Introservice = () => {
  const [scrollPostion, setScrollPostion] = useState(0);
  const scrollEvent = (e) => {
    const throttleFun = throttle(() => {
      const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
      setScrollPostion(scrollTop);
    }, [1000]);
    throttleFun();
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => window.removeEventListener('scroll', scrollEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <IntroVisual />
      <IntroList scrollPostion={scrollPostion} />
      <BottomStyle />
    </div>
  );
};

export default Introservice;
