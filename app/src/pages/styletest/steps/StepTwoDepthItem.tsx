import React, {useState, useEffect} from 'react';
import SpoText from 'components/SpoText';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import CommonBtn from 'components/CommonBtn';
import FastImage from 'react-native-fast-image';
import style from '../styles';
import {Color, margin} from 'utils/commonStyle';
import checkBlack from 'assets/img/check-black.png';

const StepTwoDepthItem = ({item, goNextStep, hooks, apiId, activeIndex}) => {
  const styles = style();
  const {makeInsertList, beforeNextChecker, checkLength, selectOnlyOneQueryItem} = hooks;
  const [selectQueryId, setSelectQueryId] = useState('');
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
          <View key={`step-${index}`}>
            <View style={{...margin(30, 'bottom')}}>
              <SpoText style={styles.styleTitle} fontStyle={'BO'}>
                {items.title}
              </SpoText>
            </View>

            <View style={[styles.circeWrap]}>
              {items.queryCategories.map((queryItem) => {
                const {id, title, url} = queryItem;
                const checkCnt = () => {
                  let cnt = 0;
                  items.queryItems.forEach((i) => {
                    if (queryItem.id === i.categoryId && i.answer) {
                      cnt++;
                    }
                  });
                  return cnt;
                };
                const iconName = url.split('icon://')[1] || '';
                let img = require('./icon/step3-1.png');
                switch (iconName) {
                  case 'step3-1':
                    if (selectQueryId === id) {
                      img = require('./icon/step3-1-active.png');
                    } else {
                      img = require('./icon/step3-1.png');
                    }
                    break;
                  case 'step3-2':
                    if (selectQueryId === id) {
                      img = require('./icon/step3-2-active.png');
                    } else {
                      img = require('./icon/step3-2.png');
                    }
                    break;
                  case 'step3-3':
                    if (selectQueryId === id) {
                      img = require('./icon/step3-3-active.png');
                    } else {
                      img = require('./icon/step3-3.png');
                    }
                    break;
                  case 'step3-4':
                    if (selectQueryId === id) {
                      img = require('./icon/step3-4-active.png');
                    } else {
                      img = require('./icon/step3-4.png');
                    }
                    break;
                }

                return (
                  <TouchableOpacity
                    style={[styles.circleTwoRow, selectQueryId === id ? styles.circleTwoRowActive : null]}
                    key={'categoryList-' + id}
                    onPress={() => {
                      setSelectQueryId(id);
                    }}>
                    <View style={{...margin(5, 'bottom')}}>
                      <FastImage source={img} style={styles.stepIcon} resizeMode={'contain'} />
                    </View>

                    <SpoText style={[styles.itemTitle, selectQueryId === id ? styles.colorMainYellow : styles.colorBlack]}>{title}</SpoText>

                    {checkCnt() > 0 && (
                      <View style={styles.circleCheckContainer}>
                        <FastImage source={checkBlack} style={styles.stepIcon} resizeMode={'contain'} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View>
              {items.queryItems.map((item) => {
                if (item.categoryId !== selectQueryId) return false;
                return (
                  <TouchableOpacity
                    style={[styles.stepItemBtn, item.answer && styles.stepItemBtnActive]}
                    key={'selectItemList' + item.id}
                    onPress={() => {
                      setList(selectOnlyOneQueryItem(list, item, index, !item.answer));
                    }}>
                    <SpoText style={[styles.stepItemBtnFont, item.answer && styles.stepItemBtnFontActive]}>{item.title}</SpoText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{...margin(30, 'bottom'), ...margin(30, 'top')}}>
        <CommonBtn
          disabled={checkLength(list) < (list[0] ? list[0].queryCategories.length : 0)}
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

export default StepTwoDepthItem;
