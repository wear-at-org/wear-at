import Tip from 'components/Tip';
import React from 'react';

const MainTip = () => {
  const tipArray = [
    {
      id: 1,
      title: '스콧을 어떻게 이용하나요?',
      content:
        '여기는 내용이 들어갑니다. \n 내용을 여기에 써야해요. 내용 씁니다. 내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세요. 내용을 여기에 쓰세요 여기에 바로 씁니다. 여기는 내용이 들어갑니다. 내용을 여기에 써야해요. 내용 씁니  내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세  내용을 여기에 쓰세요 여기에 바로 씁니다.',
    },
    {
      id: 2,
      title: '스콧을 어떻게 이용하나요?',
      content:
        '여기는 내용이 들어갑니다. \n 내용을 여기에 써야해요. 내용 씁니다. 내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세요. 내용을 여기에 쓰세요 여기에 바로 씁니다. 여기는 내용이 들어갑니다. 내용을 여기에 써야해요. 내용 씁니  내용 텍스트 여기에 써주세요 내용 텍스트 여기에 써주세  내용을 여기에 쓰세요 여기에 바로 씁니다.',
    },
  ];
  return (
    <div className="tip-container">
      <h4 className="tc mb32">SCOT 이용팁</h4>
      <div className="col-12 col-center mw-670">
        <div className="pr15 pl15">
          <div className="mb24">
            <Tip tipArray={tipArray} />
          </div>
          <div className="tc">
            <div className="btn-style2">
              <p className="btn-font font-black333">FAQ 더보기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTip;
