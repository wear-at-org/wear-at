import * as React from 'react';
import {FC} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Color} from 'utils/commonStyle';
import SpoText from './SpoText';

interface propsType {
  btnTxt: string;
  btnType: string;
  onPress?: () => void;
  disabled?: boolean;
  btnFontStyle?: string;
}

const CommonBtn: FC<propsType> = (props) => {
  let btnStyleContaner = {};
  let btnFontStyle = {};
  switch (props.btnType) {
    case 'type1': // mainYellow
      btnStyleContaner = {backgroundColor: Color.mainYellow, borderWidth: 1, borderColor: Color.mainYellow};
      btnFontStyle = {color: 'white'};
      break;
    case 'type2': // mainYellow
      btnStyleContaner = {backgroundColor: 'white', borderWidth: 1, borderColor: Color.graye0e0};
      btnFontStyle = {color: 'black'};
      break;
    case 'type3': // mainYellow
      btnStyleContaner = {backgroundColor: Color.black333, borderWidth: 1, borderColor: Color.black333};
      btnFontStyle = {color: 'white'};
      break;
    default:
      break;
  }

  if (props.disabled) {
    btnStyleContaner = {backgroundColor: Color.grayf2f2, borderWidth: 1, borderColor: Color.graye0e0};
    btnFontStyle = {color: Color.graye0e0};
  }
  return (
    <TouchableOpacity onPress={props.disabled ? undefined : props.onPress} style={[defaultStyle.container, {...btnStyleContaner}]}>
      <SpoText fontStyle={props.btnFontStyle || ''} style={[defaultStyle.btnFont, {...btnFontStyle}]}>
        {props.btnTxt}
      </SpoText>
    </TouchableOpacity>
  );
};

export default CommonBtn;

const defaultStyle = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnFont: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
