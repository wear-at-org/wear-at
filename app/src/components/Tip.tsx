import * as React from 'react';
import {useState, useCallback, FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, commonStyle, margin} from 'utils/commonStyle';
import SpoText from './SpoText';

interface tipProps {
  id: number;
  title: string;
  content: string;
}

const Tip: FC<{tipArray: tipProps[]}> = ({tipArray}) => {
  const [activeId, setActiveId] = useState(0);
  const activeTip = useCallback(
    (id) => {
      if (id === activeId) {
        setActiveId(0);
      } else {
        setActiveId(id);
      }
    },
    [activeId],
  );

  return (
    <>
      {tipArray.map((item) => {
        const {id, title, content} = item;
        return (
          <View key={`tip-item-${id}`}>
            <TouchableOpacity style={styles.tipTitleContainer} onPress={() => activeTip(id)} activeOpacity={0.5}>
              <View style={commonStyle.row}>
                <View style={{...margin(10, 'right')}}>
                  <FastImage style={commonStyle.icon20} source={require('assets/img/qq.png')} />
                </View>
                <SpoText style={commonStyle.h4Big}>{title}</SpoText>
              </View>
              <FastImage style={[commonStyle.icon24, activeId === id && styles.iconActive]} source={require('assets/img/circle-bottom.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tipContentContainer, activeId === id && styles.tipActive]} onPress={() => activeTip(id)}>
              {content &&
                content.split('\n').map((line: string) => (
                  <SpoText style={commonStyle.h4} key={`tip-item-${line}`}>
                    {line}
                    {'\n'}
                  </SpoText>
                ))}
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

export default Tip;

const styles = StyleSheet.create({
  tipContainer: {},
  tipTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayeee,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tipContentContainer: {
    height: 0,
  },
  tipActive: {
    paddingHorizontal: 35,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayeee,
    marginBottom: 20,
    paddingBottom: 10,
    height: 'auto',
  },
  iconActive: {
    transform: [{rotate: '180deg'}],
  },
});
