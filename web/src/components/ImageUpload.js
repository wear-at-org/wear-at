import React, { useState, useRef, useEffect } from 'react';
import defaultProfile from 'assets/img/default-user.png';

const ImageUpload = (props) => {
  const inputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const uploadImage = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-wrap">
      <div className="profile-container" onMouseUpCapture={(e) => props.isMypage && inputRef.current.click()}>
        <img src={profileImage} alt="defaultProfile" />
      </div>
      <input className="file-input" type="file" name="docx" ref={inputRef} onChange={uploadImage} />
    </div>
  );
};

export default ImageUpload;
