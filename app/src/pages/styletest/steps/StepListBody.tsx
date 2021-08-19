import React, {useState, useEffect} from 'react';
import SpoText from 'components/SpoText';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import CommonBtn from 'components/CommonBtn';
import style from '../styles';
import {margin} from 'utils/commonStyle';

const StepListBody = ({item, goNextStep, hooks, apiId, activeIndex}) => {
  const styles = style();
  const [list, setList] = useState([]);
  const {makeInsertList, selectQueryItem, beforeNextChecker} = hooks;
  const [status, setStatus] = useState('init');

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
      <View>
        {list.map((items, i) => {
          return (
            <View key={`two-way-${i}`} style={{...margin(30, 'bottom')}}>
              <View style={{...margin(30, 'bottom')}}>
                <SpoText style={styles.styleTitle} fontStyle={'BO'}>
                  {items.title}
                </SpoText>
              </View>

              <View style={styles.bodyItemContainer}>
                {items.queryItems.map((queryItem, index) => {
                  const {answer} = queryItem;
                  let checkFirstCheckStatus = false;
                  if (i !== 0) {
                    checkFirstCheckStatus = list[0].queryItems.find((i) => i.title === queryItem.title).answer;
                  } else {
                    checkFirstCheckStatus = list[1].queryItems.find((i) => i.title === queryItem.title).answer;
                  }

                  return (
                    <TouchableOpacity
                      style={[styles.stepItemBtn, styles.twowRowBtn, checkFirstCheckStatus && styles.btnDisabled, answer && styles.stepItemBtnActive]}
                      key={'price-' + index}
                      onPress={() => {
                        if (!checkFirstCheckStatus) setList(selectQueryItem(list, queryItem, i, !answer));
                      }}>
                      <SpoText style={[styles.stepItemBtnFont, answer && styles.stepItemBtnFontActive]}>{queryItem.title}</SpoText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      <View style={{...margin(30, 'bottom')}}>
        <CommonBtn
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

export default StepListBody;
