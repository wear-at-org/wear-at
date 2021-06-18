import { styleTipArray } from 'assets/common/dummyData';
import React from 'react';
import StyleCard from './components/StyleCard';

const StyleTipList = () => {
  return (
    <div className="col-12 col-center">
      <div className="mw-1280 col-center">
        <div className="mb40 mt40">
          <h3>STYLETIP</h3>
        </div>

        <div className="tip-wrap mb32">
          <div className="tip-item-container">
            <div className="tip-item">#겨울패션</div>
            <div className="tip-item">#아우터</div>
            <div className="tip-item">#데일리룩</div>
            <div className="tip-item">#연말룩</div>
          </div>
          <div className="">
            <select name="" className="select-style2 no-border">
              <option value="">최신순</option>
              <option value="">최신순</option>
              <option value="">최신순</option>
              <option value="">최신순</option>
            </select>
          </div>
        </div>
        <div className="style-tip-wrap">
          {styleTipArray.map((item) => {
            return <StyleCard item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleTipList;
