import React, { useState } from 'react';
import Axios from 'api';

const TestUpload = () => {
  const [files, setFiles] = useState([]);

  const onFileChanged = (e) => {
    setFiles(e.target.files);
  };

  const upload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append(`files`, f));

      await Axios.post('storage/upload', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
    } catch (e) {
      console.error('upload error', e);
    }
  };
  return (
    <div>
      <h1>파일 업로드</h1>
      <form onSubmit={upload}>
        <h1>File Upload</h1>
        <input multiple type="file" onChange={onFileChanged} name="files" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default TestUpload;
