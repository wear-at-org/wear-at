import React, {memo, useRef} from 'react';
import api from 'api';
import useEditUserInfo from 'hooks/useEditUserInfo';
import defaultProfile from 'assets/img/default-user.png';
import store from 'store';
import {changeProfile} from 'store/userinfo-store';
import FastImage from 'react-native-fast-image';
import {View, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const ImageUpload = () => {
  const [file, setFile] = useState('');
  const addImage = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setFile(results);
    } catch (err) {
      console.log(err);
    }
  };
  const inputRef = useRef(null);
  const {dispatch, user, updateUserProfile} = useEditUserInfo();

  const uploadImage = async (event) => {
    const formData = new FormData();
    Array.from(event.target.files).forEach((f) => formData.append(`files`, f));

    try {
      const {
        data: {urls},
      } = await api.post('storage/upload', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
      await updateUserProfile(urls[0]);
      dispatch({type: 'CHANGE_PROFILE_URL', profileImage: urls[0]});
      store.dispatch(changeProfile({profileImage: urls[0]}));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <View>
        <FastImage source={user.profileImage || defaultProfile} />
      </View>
      <TouchableOpacity ref={inputRef} onPress={uploadImage} />
    </View>
  );
};

export default memo(ImageUpload);
