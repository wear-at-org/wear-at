import React, {FC, ReactNode} from 'react';
import {Text} from 'react-native';

interface propsType {
  style?: object;
  fontStyle?: string;
  children: ReactNode;
  numberOfLines?: number;
}

const SpoText: FC<propsType> = (props) => {
  const {fontStyle = 'N'} = props;
  let fontFamily = {
    fontFamily: 'SpoqaHanSansNeo-Regular',
  };
  switch (fontStyle) {
    case 'BO':
      fontFamily = {
        fontFamily: 'SpoqaHanSansNeo-Bold',
      };
      break;
    case 'M':
      fontFamily = {
        fontFamily: 'SpoqaHanSansNeo-Medium',
      };
      break;
    case 'L':
      fontFamily = {
        fontFamily: 'SpoqaHanSansNeo-Light',
      };
      break;
    default:
      break;
  }
  return <Text {...props} style={[{...fontFamily}, Array.isArray(props.style) ? props.style : {...props.style}]} />;
};

export default SpoText;
