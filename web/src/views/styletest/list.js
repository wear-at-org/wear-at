import React, { useState, useEffect } from 'react';
import Lnb from 'components/layout/Lnb';
import BarProgress from 'components/BarProgress';

const temp = [
  {
    status: 'complete',
    percent: 100,
    date: '2021.04.01',
    content: '거의 완료되었어요! 스타일 테스트를 완료하고 전문 스타일리스트의 추천을 받아보세요 😇',
    matachingItem: '[총 9개] ZARA ruffle blouse, h&m stripe shirt, SPAO 맨투맨 … ',
    matchingBrand: '[총 5개] ZARA, h&m, 랄프 로렌, Misso, SPAO',
  },
  {
    status: 'ing',
    percent: 32,
    date: '2021.04.01',
    content: '거의 완료되었어요! 스타일 테스트를 완료하고 전문 스타일리스트의 추천을 받아보세요 😇',
    matachingItem: '매칭 아이템 : [총 9개] ZARA ruffle blouse, h&m stripe shirt, SPAO 맨투맨 … ',
    matchingBrand: '매칭 브랜드 : [총 5개] ZARA, h&m, 랄프 로렌, Misso, SPAO',
  },
];
const ListItem = ({ item }) => {
  return (
    <div className="item-container">
      <BarProgress percent={20} />
      <div className="inner">
        <div className="d-flex x-eq mb22">
          <div>
            <div className={`status mb8 ${item.status === 'ing' ? '' : 'complete'}`}>
              <p className="status-txt">{item.status === 'ing' ? '진행 중' : '완료'}</p>
            </div>
            <p className="date-txt">{item.date}</p>
          </div>
          {item.status === 'ing' && (
            <p className="percent-txt">
              <span className="percent">{item.percent}%</span> 완료됨
            </p>
          )}
        </div>

        {item.status === 'ing' ? (
          <div className="item-content">
            <p>{item.content}</p>
          </div>
        ) : (
          <div className="item-content">
            <p>매칭 아이템 : {item.matachingItem}</p>
            <p>매칭 브랜드 : {item.matchingBrand}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StyleTestList = () => {
  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-1034">
        <div className="mypage-container">
          <Lnb />
          <div className="right-container">
            <div className="d-flex x-eq y-center mb30">
              <h5 className="fontweight400">
                <span className="bold">곰돌이</span> 님의 스타일 테스트 내역입니다.
              </h5>
              <div className="">
                <select className="select-style2" name="" id="" required onChange={(e) => console.log(e.target.value)}>
                  <option value="">최신순</option>
                </select>
              </div>
            </div>

            <div className="item-list">
              {temp.map((item) => {
                return <ListItem item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleTestList;
