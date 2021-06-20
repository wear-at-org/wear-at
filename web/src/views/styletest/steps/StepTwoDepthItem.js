import React, { useState, useEffect } from 'react';
import outer from 'assets/img/outer.png';
import top from 'assets/img/top.png';
import bottom from 'assets/img/bottom.png';
import onepice from 'assets/img/onepice.png';
const StepTwoDepthItem = ({ item, goNextStep }) => {
  const [selectItemList, setSelectItemList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    console.log(item);
    const { queryItems, queryCategories } = item;
    const insertQueryItems = queryCategories.map((items, index) => {
      let img = outer;
      switch (index) {
        case 0:
          img = outer;
          break;
        case 1:
          img = top;
          break;
        case 2:
          img = bottom;
          break;
        case 3:
          img = onepice;
          break;
        default:
          break;
      }
      return {
        ...items,
        img,
      };
    });
    setCategoryList(insertQueryItems);
    setSelectItemList(queryItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step-container">
      <div className="mb32">
        <h4 className="big tc bold">{item.title}</h4>
      </div>

      <div className="style-circle-wrap small mb48">
        {categoryList.map((queryItem, index) => {
          return (
            <div key={'categoryList-' + queryItem.id} className={`style-circle-container ${index < 2 ? 'mb24' : ''}`}>
              <div className="inner">
                <div className="mb24">
                  <img src={queryItem.img} alt="" />
                </div>
                <h5 className="small">{queryItem.title}</h5>
              </div>
            </div>
          );
        })}
      </div>

      <div className="price-item-container mb46">
        {selectItemList.map((item) => {
          return (
            <div className="price-item" key={'selectItemList' + item.id}>
              {item.title}
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
  );
};

export default StepTwoDepthItem;
