import React from 'react';
import StyleCard from 'components/CardStyle';
import { styleTipArray, tipStyleTag } from 'assets/common/dummyData';

const StyleTipList = () => {
  return (
    <div className="sub">
      <div className="mw-1280 col-center">
        <div className="mb40">
          <h3>STYLETIP</h3>
        </div>

        <div className="tip-wrap mb32">
          <div className="tip-item-container">
            {tipStyleTag.map((item) => {
              return (
                <div className={`tip-item ${item.active ? 'active' : ''}`} key={item.label}>
                  <h5 className="small">#{item.label}</h5>
                </div>
              );
            })}
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
        <div className="card-style-wrap">
          {styleTipArray.map((item) => {
            return <StyleCard key={item.key} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleTipList;
