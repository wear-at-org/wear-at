import React, { useState, useRef, useEffect } from 'react';
import defaultProfile from 'assets/img/profile.svg';

const ImageUpload = () => {
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
    <div className="">
      <div className="profile-container" onMouseUpCapture={(e) => inputRef.current.click()}>
        <img src={profileImage} alt="defaultProfile" />
      </div>
      <input className="file-input" type="file" name="docx" ref={inputRef} onChange={uploadImage} />
    </div>
  );
};

export default ImageUpload;
