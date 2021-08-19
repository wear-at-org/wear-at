import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import CommonBtn from 'components/CommonBtn';
import style from '../styles';
import {margin} from 'utils/commonStyle';
import SpoText from 'components/SpoText';
import ImageUpload from 'components/ImageUpload';

const StepUploadImage = ({item, hooks, apiId, activeIndex}) => {
  const styles = style();
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('init');
  const {makeInsertList, uploadFile, beforeNextChecker} = hooks;
  const [list, setList] = useState([]);

  const makeList = async () => {
    let insertList = [];
    if (files.length > 0) {
      const {
        data: {urls},
      } = await uploadFile(files);
      const resultItem = await urls.map((url, index) => {
        return {
          id: index * 1,
          answer: url,
          queryId: apiId,
          queryItemId: index * 1,
        };
      });
      insertList = [
        {
          id: apiId,
          queryCategories: [],
          queryItems: resultItem,
        },
      ];
    }

    await beforeNextChecker(insertList, apiId, true);
  };

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
        {list.map((items, index) => {
          return (
            <View key={`upload-img-${index}`}>
              <View style={{...margin(30, 'bottom')}}>
                <SpoText style={styles.styleTitle} fontStyle={'BO'}>
                  {items.title}
                </SpoText>
              </View>
              <View style={{...margin(30, 'bottom')}}>
                <SpoText style={styles.styleSubTitle}>{items.subtitle}</SpoText>
              </View>
              <ImageUpload files={files} setFiles={setFiles} />
              <View />
            </View>
          );
        })}
      </View>
      <View style={{...margin(30, 'bottom')}}>
        <CommonBtn
          btnTxt={'완료'}
          btnType={'type1'}
          onPress={() => {
            makeList();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default StepUploadImage;
