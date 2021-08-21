import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import SpoText from './SpoText';
import DocumentPicker from 'react-native-document-picker';
import {Color} from 'utils/commonStyle';
import FastImage from 'react-native-fast-image';
import imgIcon from 'assets/img/attach-img.png';

const {width} = Dimensions.get('window');

const ImageUpload = ({files, setFiles}) => {
  const addImage = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      console.log(results);
      setFiles(results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.selectBtn} onPress={addImage}>
          <SpoText style={styles.btnFont}>파일 선택</SpoText>
        </TouchableOpacity>
      </View>
      {files.length === 0 ? (
        <TouchableOpacity style={styles.imgTouchContainer} onPress={addImage}>
          <FastImage source={imgIcon} style={styles.imgIcon} />
          <SpoText style={styles.innerText}>
            회원님의 스타일을 참고할 만한{'\n'}
            이미지를 업로드해주세요
          </SpoText>
        </TouchableOpacity>
      ) : (
        <View style={styles.imgContainer}>
          {files.map((i, index) => {
            return <FastImage key={`img-index-${index}`} source={{uri: i.uri}} style={styles.uploadImage} />;
          })}
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  imgTouchContainer: {
    height: 180,
    borderWidth: 2,
    borderColor: Color.graybdbd,
    borderStyle: 'dotted',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  innerText: {
    fontSize: 14,
    lineHeight: 18,
    color: Color.graybdbd,
    textAlign: 'center',
  },
  imgIcon: {
    width: 18,
    height: 18,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  btnFont: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: 'white',
  },
  selectBtn: {
    height: 48,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Color.black333,
    width: 100,
  },
  deleteBtn: {},
  imgContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  uploadImage: {
    width: (width - 80) / 3,
    height: (width - 80) / 3,
    marginBottom: 20,
  },
});
