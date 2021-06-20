import React, { useState, useEffect } from 'react';
import circle1 from 'assets/img/circle1.svg';
import circle2 from 'assets/img/circle2.svg';
import circle3 from 'assets/img/circle3.svg';
import circle4 from 'assets/img/circle4.svg';
import circle5 from 'assets/img/circle5.svg';
import circle6 from 'assets/img/circle6.svg';
import circle7 from 'assets/img/circle7.svg';
import circle8 from 'assets/img/circle8.svg';

const StepListItem = ({ item, goNextStep }) => {
  const [circleList, setCircleList] = useState([]);

  useEffect(() => {
    const { queryItems } = item;
    const insertList = queryItems.map((queryItem, index) => {
      return { ...queryItem, ...imgSwich(index), isSelect: false };
    });
    setCircleList(insertList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imgSwich = (index) => {
    switch (index) {
      case 0:
        return { img: circle4, desc: '홈웨어' };
      case 1:
        return { img: circle5, desc: '스포츠웨어' };
      case 2:
        return { img: circle3, desc: '리조트룩' };
      case 3:
        return { img: circle2, desc: '캠퍼스룩' };
      case 4:
        return { img: circle6, desc: '타운웨어' };
      case 5:
        return { img: circle7, desc: '쇼핑,간단한 모임에서' };
      case 6:
        return { img: circle1, desc: '비지니스룩' };
      case 7:
        return { img: circle8, desc: '포멀웨어' };
      default:
        break;
    }
  };
  return (
    <>
      <div className="step-container">
        <div className="mb60">
          <h4 className="big tc bold">{item.title}</h4>
        </div>

        <div className="style-circle-wrap">
          {circleList.map((queryItem, index) => {
            return (
              <div key={queryItem.id} className={`style-circle-container ${index < 4 ? 'mb64' : ''}`}>
                <div className="inner">
                  <div className="mb24">
                    <img src={queryItem.img} alt="" />
                  </div>
                  <div className="mb8 ">
                    <h5 className="bold">{queryItem.desc}</h5>
                  </div>
                  <h5 className="small">{queryItem.title}</h5>
                </div>
              </div>
            );
          })}
        </div>
        <div className="style-next-btn" onClick={goNextStep}>
          <div className="inner width-380">
            <input type="button" value="다음" className="btn-style1 wid100 btn-font font-white middle" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepListItem;
