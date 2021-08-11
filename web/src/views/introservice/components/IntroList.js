import React, { useEffect, useRef, createRef, useState } from 'react';
import { introData } from 'assets/common/commonData';
import { throttle } from 'lodash';

const IntroList = ({ scrollPostion }) => {
  const [aniArray, setAniArray] = useState({});
  const [activeList, setActiveList] = useState([{ isActive: false }, { isActive: false }, { isActive: false }]);
  const elRefs = useRef([]);

  useEffect(() => {
    var debounce_fun = throttle(() => {
      let insertList = activeList.map((j) => j);
      aniArray.forEach((ani, index) => {
        const postionTop = ani.current.getBoundingClientRect().top;

        if (scrollPostion - 400 > postionTop) {
          insertList = activeList.map((item, i) => {
            if (i === index) return { isActive: true };
            return { ...item };
          });
        }
      });
      setActiveList(insertList);
    }, 1000);

    debounce_fun();
  }, [scrollPostion]);

  if (elRefs.current.length !== introData.length) {
    // add or remove refs
    elRefs.current = Array(introData.length)
      .fill()
      .map((_, i) => elRefs.current[i] || createRef());
    setAniArray(
      elRefs.current.map((item) => {
        return item;
      }),
    );
  }

  return (
    <section className="col-12 col-center mw-900">
      {introData.map((item, i) => {
        return (
          <div className={`intro-list-item ${activeList[i]?.isActive && 'active'} `} key={item.key} ref={elRefs.current[i]}>
            <div className="intro-left-txt">
              <div className="mb16">
                <h3 className="bold">{item.title}</h3>
              </div>
              <div className="mb25">
                <h5 className="color-black333">
                  {window.screen.width > 768
                    ? item.content.split('\n').map((line, index) => {
                        return <div key={'text' + index}>{line}</div>;
                      })
                    : item.content}
                </h5>
              </div>
              {/* <div className="btn-style2 middle center width-260 block-center show-web">
                <p className="btn-font color-black333 bold">{item.btnTxt}</p>
              </div> */}
            </div>
            <div className="mb30 mb-sm-0 intro-right-img">
              <img src={item.img} alt="" />
            </div>

            {/* <div className="btn-style2 middle center width-260 block-center show-mobile">
              <p className="btn-font color-black333 bold">{item.btnTxt}</p>
            </div> */}
          </div>
        );
      })}
    </section>
  );
};

export default IntroList;
