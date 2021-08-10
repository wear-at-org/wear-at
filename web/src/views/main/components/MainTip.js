import Tip from 'components/Tip';
import React from 'react';

const MainTip = () => {
  const tipArray = [
    {
      id: 1,
      title: '테스트 도중에 떠나셨나요?',
      content: '걱정하지마세요, 오른쪽 상단의 프로필 아이콘을 누르면 스타일테스트 내역에서 중단된 테스트를 이어서 진행할 수 있답니다!',
    },
    {
      id: 2,
      title: '테스트 결과는 어떻게 알 수 있나요?',
      content:
        '스타일테스트가 접수되면 일주일 이내, 이메일로 테스트 결과를 보내드립니다.\n 스타일테스트는 웨어앳의 AI가 1차적으로 걸러주고, 전문 스타일리스트가 회원님이 원하시는 스타일로 2차 분류를 해주어 꼭 맞는 옷으로 추천해드립니다:',
    },
  ];
  return (
    <div className="tip-container">
      <h4 className="tc mb32 fontweight700">웨어앳 이용꿀팁</h4>
      <div className="col-12 col-center mw-670">
        <div className="pr15 pl15">
          <div className="mb32">
            <Tip tipArray={tipArray} />
          </div>
          {/* <div className="d-flex x-center">
            <div className="width-320">
              <input type="button" className="btn-style2 width-100 type-white" value="이용팁 더보기" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainTip;
