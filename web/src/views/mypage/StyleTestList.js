import React, { useState, useEffect } from 'react';
import Lnb from 'components/layout/Lnb';
import Paginig from 'components/Paging';
import StyleTestItem from './components/StyleTestItem';
import StyleDetailModal from './components/StyleDetailModal';
import useStepHook from 'hooks/useStepHook';

const StyleTestList = () => {
  const [showPop, setShowPop] = useState(false);
  const [clickId, setClickId] = useState('');
  const { getStyleTestList, stylesTestList } = useStepHook();
  const [filter, setFilter] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getStyleTestList({ ...filter });
  }, [filter]);

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
                  </select>
                </div>
              </div>

              <div className="item-list mb42">
                {stylesTestList.content.map((item, index) => {
                  return <StyleTestItem key={'test' + index} item={item} setClickId={setClickId} setShowPop={setShowPop} />;
                })}
              </div>

              <div>
                <Paginig setFilter={setFilter} filter={filter} pagingInfo={stylesTestList.pageable} totalPages={stylesTestList.totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleTestList;
