import CommonBtn from 'components/CommonBtn';
import SpoText from 'components/SpoText';
import {useState, useEffect, FC} from 'react';
import * as React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {styleTestListProps, reciveProps} from 'hooks/type';
import style from '../styles';
import {margin} from 'utils/commonStyle';
const StepListItem: FC<reciveProps> = ({item, goNextStep, hooks, apiId, activeIndex}) => {
  const styles = style();
  const {makeInsertList, selectQueryItem, beforeNextChecker, checkLength} = hooks;
  const [list, setList] = useState<styleTestListProps[] | []>([]);

  useEffect(() => {
    const makeList = async () => {
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

            <View style={[styles.circeWrap, {...margin(30, 'bottom')}]}>
              {items.queryItems.map((queryItem) => {
                const {answer, id, title, url = ''} = queryItem;
                const iconName = url.split('icon://')[1] || '';
                let img = require('./icon/step1-1-active.png');
                switch (iconName) {
                  case 'step1-1':
                    if (answer) {
                      img = require('./icon/step1-1-active.png');
                    } else {
                      img = require('./icon/step1-1.png');
                    }
                    break;
                  case 'step1-2':
                    if (answer) {
                      img = require('./icon/step1-2-active.png');
                    } else {
                      img = require('./icon/step1-2.png');
                    }
                    break;
                  case 'step1-3':
                    if (answer) {
                      img = require('./icon/step1-3-active.png');
                    } else {
                      img = require('./icon/step1-3.png');
                    }
                    break;
                  case 'step1-4':
                    if (answer) {
                      img = require('./icon/step1-4-active.png');
                    } else {
                      img = require('./icon/step1-4.png');
                    }
                    break;
                  case 'step1-5':
                    if (answer) {
                      img = require('./icon/step1-5-active.png');
                    } else {
                      img = require('./icon/step1-5.png');
                    }
                    break;
                  case 'step1-6':
                    if (answer) {
                      img = require('./icon/step1-6-active.png');
                    } else {
                      img = require('./icon/step1-6.png');
                    }
                    break;
                  case 'step1-7':
                    if (answer) {
                      img = require('./icon/step1-7-active.png');
                    } else {
                      img = require('./icon/step1-7.png');
                    }
                    break;
                  case 'step1-8':
                    if (answer) {
                      img = require('./icon/step1-8-active.png');
                    } else {
                      img = require('./icon/step1-8.png');
                    }
                    break;
                }

                return (
                  <TouchableOpacity key={`queryItems-${id}`} onPress={() => setList(selectQueryItem(list, queryItem, index, !answer))}>
                    <View style={[styles.circle, answer ? styles.circleActive : null]}>
                      <Image source={img} style={styles.stepIcon} PlaceholderContent={<ActivityIndicator />} resizeMode={'contain'} />
                      <View style={{...margin(5, 'top')}}>
                        <SpoText style={[styles.itemTitle, answer ? styles.colorWhite : styles.colorBlack]}>{title}</SpoText>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{...margin(30, 'bottom')}}>
        <CommonBtn
          disabled={checkLength(list) === 0}
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

export default StepListItem;
