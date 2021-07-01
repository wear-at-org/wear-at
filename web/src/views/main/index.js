import React, { useEffect, useRef, useState } from 'react';
import BottomStyle from './components/BottomStyle';
import MainCard from './components/MainCard';
import MainParteners from './components/MainParteners';
import MainTip from './components/MainTip';
import MainVisual from './components/MainVisual';

const Main = () => {
  const cardRef = useRef();
  const [cardIsActive, setCardIsActive] = useState(false);
  const scrollEvent = (e) => {
    const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
    const positionCard = cardRef.current.getBoundingClientRect().top;
    if (scrollTop - 400 > positionCard && !cardIsActive) setCardIsActive(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, []);

  return (
    <>
      <main onScroll={(e) => console.log(e)}>
        <MainVisual />
        <MainParteners />
        <section ref={cardRef}>
          <MainCard cardIsActive={cardIsActive} />
        </section>

        <MainTip />
        <BottomStyle />
      </main>
    </>
  );
};

export default Main;
