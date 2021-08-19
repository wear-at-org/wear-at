import SpoText from 'components/SpoText';
import Tip from 'components/Tip';
import React from 'react';
import {View} from 'react-native';
import {margin, commonStyle} from 'utils/commonStyle';

const tipArray = [
  {
    id: 1,
    title: '테스트 도중에 떠나셨나요?',
    content: '걱정하지마세요,\n 오른쪽 상단의 프로필 아이콘을 누르면 스타일테스트 내역에서 중단된 테스트를 이어서 진행할 수 있답니다!',
  },
  {
    id: 2,
    title: '테스트 결과는 어떻게 알 수 있나요?',
    content:
      '스타일테스트가 접수되면 일주일 이내, 이메일로 테스트 결과를 보내드립니다.\n 스타일테스트는 웨어앳의 AI가 1차적으로 걸러주고, 전문 스타일리스트가 회원님이 원하시는 스타일로 2차 분류를 해주어 꼭 맞는 옷으로 추천해드립니다:',
  },
];
const MainTip = () => {
  return (
    <View style={{...margin(100, 'bottom')}}>
      <View style={{...margin(30, 'bottom')}}>
        <SpoText fontStyle={'BO'} style={[commonStyle.h3, commonStyle.textCenter]}>
          웨어앳 이용꿀팁
        </SpoText>
      </View>
      <View>
        <Tip tipArray={tipArray} />
      </View>
    </View>
  );
};

export default MainTip;
