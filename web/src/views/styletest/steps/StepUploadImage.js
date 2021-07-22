import DragImagUpload from 'components/DragImagUpload';
import React, { useState, useEffect } from 'react';
import NextBtn from './NextBtn';

const StepUploadImage = ({ item, hooks, apiId }) => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('init');
  const { makeInsertList, uploadFile, beforeNextChecker } = hooks;
  const [list, setList] = useState([]);

  const makeList = async () => {
    console.log(files);
    const res = await uploadFile(files.map((i) => i.object));
    console.log(res);
  };

  useEffect(() => {
    setStatus('start');
    setList(makeInsertList(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`step-container ${status}`}>
      <div className="mb50">
        {list.map((items, index) => {
          return (
            <div className="style-upload mt0 pt-sm-80" key={`upload-img-${index}`}>
              <div className="mb32 pl20 pr20 pl-sm-0 pr-sm-0">
                <h4 className="big tc bold">{items.title}</h4>
              </div>

              <div className="mb-sm-96 mb30 pl20 pr20 pl-sm-0 pr-sm-0">
                <h5 className="small color-8282 tc">{items.subtitle}</h5>
              </div>

              <div>
                <DragImagUpload files={files} setFiles={setFiles} />
              </div>
            </div>
          );
        })}
      </div>

      <NextBtn
        goNextStep={async () => {
          await makeList();
        }}
      />
    </div>
  );
};

export default StepUploadImage;
