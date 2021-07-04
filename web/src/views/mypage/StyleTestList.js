import React, { useState } from 'react';
import Lnb from 'components/layout/Lnb';
import Paginig from 'components/Paging';
import StyleTestItem from './components/StyleTestItem';
import { styleTestListItem } from 'assets/common/commonData';
import StyleDetailModal from './components/StyleDetailModal';

const StyleTestList = () => {
  const [showPop, setShowPop] = useState(false);
  const [clickId, setClickId] = useState('');
  return (
    <>
      <StyleDetailModal showPop={showPop} setShowPop={setShowPop} clickId={clickId} />
      <div className="sub layout-sub">
        <div className="col-12 col-center mw-1280">
          <div className="mypage-container">
            <Lnb />
            <div className="right-container">
              <div className="d-flex x-eq y-center mb30">
                <h5 className="fontweight400 hidden show-sm">
                  <span className="bold">곰돌이</span> 님의 스타일 테스트 내역입니다.
                </h5>
                <div>
                  <select className="select-style2" name="" id="" required onChange={(e) => console.log(e.target.value)}>
                    <option value="">최신순</option>
                    <option value="">최신순</option>
                    <option value="">최신순</option>
                    <option value="">최신순</option>
                    <option value="">최신순</option>
                    <option value="">최신순</option>
                  </select>
                </div>
              </div>

              <div className="item-list mb42">
                {styleTestListItem.map((item, index) => {
                  return <StyleTestItem key={'test' + index} item={item} setClickId={setClickId} setShowPop={setShowPop} />;
                })}
              </div>

              <div>
                <Paginig />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleTestList;
