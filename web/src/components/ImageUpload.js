import React, { memo, useRef } from 'react';
import api from 'api';
import useEditUserInfo from 'hooks/useEditUserInfo';
import defaultProfile from 'assets/img/default-user.png';
import store from 'store';
import { changeProfile } from 'store/userinfo-store';

const ImageUpload = () => {
  const inputRef = useRef(null);
  const { dispatch, user, updateUserProfile } = useEditUserInfo();
  const uploadImage = async (event) => {
    const formData = new FormData();
    Array.from(event.target.files).forEach((f) => formData.append(`files`, f));

    try {
      const {
        data: { urls },
      } = await api.post('storage/upload', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
      await updateUserProfile(urls[0]);
      dispatch({ type: 'CHANGE_PROFILE_URL', profileImage: urls[0] });
      store.dispatch(changeProfile({ profileImage: urls[0] }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profile-wrap">
      <div className="profile-container" onMouseUpCapture={(e) => inputRef.current.click()}>
        <img src={user.profileImage || defaultProfile} alt="defaultProfile" />
      </div>
      <input className="file-input" type="file" name="docx" ref={inputRef} onChange={uploadImage} />
    </div>
  );
};

export default memo(ImageUpload);
