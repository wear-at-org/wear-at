import DragImagUpload from 'components/DragImagUpload';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StepUploadImage = ({ item }) => {
  const history = useHistory();

  return (
    <div className="step-container">
      <div className="style-upload mt80">
        <div className="mb32">
          <h4 className="big tc bold">{item.title}</h4>
        </div>

        <div className="mb96">
          <h5 className="small color-8282">업로드된 사진은 회원님을 위한 스타일테스트 분석 및 결과 제공 목적으로만 사용됩니다.</h5>
        </div>

        <DragImagUpload />
      </div>

      <div className="style-next-btn">
        <div className="inner width-380">
          <input type="button" value="완료" className="btn-style1 wid100 btn-font font-white middle" />
        </div>
      </div>
    </div>
  );
};

export default StepUploadImage;
