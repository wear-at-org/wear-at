import BarProgress from 'components/BarProgress';
import React from 'react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

const StyleTestItem = ({ item, setShowPop, setClickId }) => {
  const history = useHistory();
  return (
    <div
      className="item-container"
      onClick={() => {
        if (item.recommended) {
          setClickId(item.id);
          setShowPop(true);
        } else {
          if (!item.completed) {
            console.log(item);
            history.push('/styletest', { params: { id: item.id, answer: item.subscribeAnswers } });
          }
        }
      }}
    >
      <BarProgress percent={item.completed ? 100 : 10} status={item.completed} />
      <div className="inner">
        <div className="d-flex x-eq mb28">
          <div className="width-100 d-flex x-eq y-center">
            <div className={`status ${!item.recommended ? '' : 'complete'}`}>
              <p className="status-txt">
                {!item.completed ? (
                  <>
                    <span className="bold">{item.percent}</span>% 진행 중
                  </>
                ) : item.recommended ? (
                  '완료 됨'
                ) : (
                  `스타일리스트 추천 중`
                )}
              </p>
            </div>
            <p className="date-txt hidden show-sm-block">{dayjs(item.createAt).format('YYYY-MM-DD HH시:mm분')}</p>
          </div>
        </div>

        {!item.completed ? (
          <div className="item-content">
            <p>거의 완료되었어요! 스타일 테스트를 완료하고 전문 스타일리스트의 추천을 받아보세요 😇</p>
          </div>
        ) : item.recommended ? (
          <div className="item-content complete">
            <p className="mb20 mb-sm-0">매칭 아이템 : {item.matachingItem}</p>
            <p>매칭 브랜드 : {item.matchingBrand}</p>
          </div>
        ) : (
          <div className="item-content">
            <p>스타일리스트가 옷을 고르고 있어요 😇</p>
          </div>
        )}
        <div className="mb16 mb-sm-0"></div>
        <p className="date-txt show-mobile tc">{item.date}</p>
      </div>
    </div>
  );
};

export default StyleTestItem;
