import {View, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import store, {globalPopupName, RootState} from 'store';
import {removePopup} from 'store/globalpopup-store';
import {useNavigation} from '@react-navigation/native';
import SpoText from './SpoText';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {} from 'navigation';
const CommomPopup = () => {
  const navigation = useNavigation<stackNavigationProp>();
  const popup = useSelector((state: RootState) => state[globalPopupName]);
  const {dispatch} = store;
  const {isActive, title, btnMsg, goLink} = popup;

  return (
    <Modal visible={isActive}>
      <View>
        <SpoText>
          {title &&
            title.split('\n').map((line: string) => (
              <View key={`tip-item-${line}`}>
                <SpoText>
                  {line}
                  {`\n`}
                </SpoText>
              </View>
            ))}
        </SpoText>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(removePopup());
          navigation.navigate(goLink);
        }}>
        <SpoText>{btnMsg}</SpoText>
      </TouchableOpacity>
    </Modal>
  );
};

export default CommomPopup;
