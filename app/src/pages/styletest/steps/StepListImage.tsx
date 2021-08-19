import React, {useState, useEffect} from 'react';
import CommonBtn from 'components/CommonBtn';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import SpoText from 'components/SpoText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import style from '../styles';
import {margin} from 'utils/commonStyle';
import checkIcon from 'assets/img/primary-check.png';

const StepListImage = ({item, goNextStep, hooks, apiId, activeIndex}) => {
  const styles = style();
  const {makeInsertList, beforeNextChecker, selectQueryItem, checkLength} = hooks;
  const [status, setStatus] = useState('init');
  const [list, setList] = useState([]);

  useEffect(() => {
    const makeList = async () => {
      setStatus('start');
      setList(await makeInsertList(item, apiId));
    };
    makeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      {list.map((items, index) => {
        return (
          <View>
            <View style={{...margin(30, 'bottom')}}>
              <SpoText style={styles.styleTitle} fontStyle={'BO'}>
                {items.title}
              </SpoText>
            </View>

            <View style={styles.imgStepWrap}>
              {items.queryItems.map((queryItem) => {
                const {answer, url, id} = queryItem;

                return (
                  <TouchableOpacity key={'checked-img-' + id} onPress={() => setList(selectQueryItem(list, queryItem, index, !answer))}>
                    <FastImage source={{uri: url}} style={styles.imgStepImg} />
                    {answer && (
                      <View style={styles.imgStepActive}>
                        <FastImage source={checkIcon} style={styles.checkIcon} resizeMode={'cover'} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{...margin(30, 'bottom')}}>
        <CommonBtn
          disabled={checkLength(list) < 3 || checkLength(list) > 10}
          btnTxt={'다음'}
          btnType={'type1'}
          onPress={() => {
            beforeNextChecker(list, apiId);
            goNextStep();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default StepListImage;
