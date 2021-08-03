import React, { useState, useEffect } from 'react';
import Lnb from 'components/layout/Lnb';
import Paginig from 'components/Paging';
import StyleTestItem from './components/StyleTestItem';
import useStepHook from 'hooks/useStepHook';
import { useHistory } from 'react-router-dom';

const StyleTestList = () => {
  const history = useHistory();
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

              {stylesTestList.content.length === 0 ? (
                <div className={'pt80 pb80 tc'}>
                  <h4 className="mb30">스타일 테스트 내역이 없습니다.</h4>
                  <div className="btn-style1 large width-fit block-center" onClick={() => history.push('/styleTestIntro')}>
                    <p className="btn-font font-white d-flex y-center">30초만에 무료 스타일테스트 진행하기</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="item-list mb42">
                    {stylesTestList.content.map((item, index) => {
                      return <StyleTestItem key={'test' + index} item={item} />;
                    })}
                  </div>
                  <Paginig setFilter={setFilter} filter={filter} pagingInfo={stylesTestList.pageable} totalPages={stylesTestList.totalPages} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleTestList;
