import React from 'react';
import Intro1 from 'assets/img/intro1.png';
import Intro2 from 'assets/img/intro2.png';
import Intro3 from 'assets/img/intro3.png';

const arr = [
  {
    key: 'list-index-1',
    title: '나에게 딱 맞는',
    content: `무료 스타일 테스트를 통해 나에게 어울리는 스타일을 현직 \n 전문 스타일리스트들에게 바로 추천 받아 보세요.`,
    img: Intro1,
    btnTxt: '스타일 테스트 하러가기',
  },
  {
    key: 'list-index-2',
    title: '다양한 스타일 PICK!',
    content: `전문 스타일리스트가 제공하는 따근따근한 최신 패션 스타일\n 트랜드 칼럼을 매일 확인해 보세요!`,
    img: Intro2,
    btnTxt: '스타일팁 보러가기',
  },
  {
    key: 'list-index-3',
    title: '나에게 딱 맞는',
    content: `무료 스타일 테스트를 통해 나에게 어울리는 스타일을 현직\n
     전문 스타일리스트들에게 바로 추천 받아 보세요.`,
    img: Intro3,
    btnTxt: '스타일팁 보러가기',
  },
];
const IntroList = () => {
  return (
    <div className="col-12 col-center mw-900">
      {arr.map((item) => {
        return (
          <div className="intro-list-item" key={item.key}>
            <div className="">
              <div className="mb16">
                <h3 className="bold">{item.title}</h3>
              </div>
              <div className="mb25">
                <h5 className="color-black333">
                  {item.content.split('\n').map((line, index) => {
                    return <div key={'text' + index}>{line}</div>;
                  })}
                </h5>
              </div>
              <div className="btn-style2 middle center width-260">
                <p className="btn-font color-black333 bold">{item.btnTxt}</p>
              </div>
            </div>
            <div className="">
              <img src={item.img} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IntroList;
