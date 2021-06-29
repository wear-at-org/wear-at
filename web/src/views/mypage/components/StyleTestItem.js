import BarProgress from 'components/BarProgress';
import React from 'react';

const StyleTestItem = ({ item }) => {
  return (
    <div className="item-container">
      <BarProgress percent={item.percent} status={item.status} />
      <div className="inner">
        <div className="d-flex x-eq mb28">
          <div className="width-100 d-flex x-eq y-center">
            <div className={`status ${item.status === 'ing' ? '' : 'complete'}`}>
              <p className="status-txt">
                {item.status === 'ing' ? (
                  <>
                    <span className="bold">{item.percent}</span>% 진행 중
                  </>
                ) : (
                  `완료 됨`
                )}
              </p>
            </div>
            <p className="date-txt hidden show-sm-block">{item.date}</p>
          </div>
        </div>

        {item.status === 'ing' ? (
          <div className="item-content">
            <p>거의 완료되었어요! 스타일 테스트를 완료하고 전문 스타일리스트의 추천을 받아보세요 😇</p>
          </div>
        ) : (
          <div className="item-content complete">
            <p className="mb20 mb-sm-0">매칭 아이템 : {item.matachingItem}</p>
            <p>매칭 브랜드 : {item.matchingBrand}</p>
          </div>
        )}
        <div className="mb16 mb-sm-0"></div>
        <p className="date-txt show-mobile tc">{item.date}</p>
      </div>
    </div>
  );
};

export default StyleTestItem;
