import React, { useState, useEffect } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';
import StepBtnWrap from './steps/StepBtnWrap';
import StepListItem from './steps/StepListItem';
import StepListImage from './steps/StepListImage';
import StepTwoDepthItem from './steps/StepTwoDepthItem';
import StepListBody from './steps/StepListBody';
import StepUploadImage from './steps/StepUploadImage';

const Styletest = () => {
  const history = useHistory();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.get('subscribe/query').then((res) => {
      console.log(res);
      setStepArray(res.data);
    });
  }, []);

  useEffect(() => {
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  const renderStepComponent = (item) => {
    console.log(item.uiType);
    switch (item.uiType) {
      case 'U_LIST_ITEMS':
        return <StepListItem item={item} />;
      case 'U_LIST_IMAGES':
        return <StepListImage item={item} />;
      case 'U_LIST_2DEP_ITEMS':
        return <StepTwoDepthItem item={item} />;
      case 'U_LIST_BODY':
        return <StepListBody item={item} />;
      case 'U_UPLOAD_IMAGE':
        return <StepUploadImage item={item} />;
      default:
        return <StepListItem item={item} />;
    }
  };

  return (
    <div className="step-wrap">
      <StepBtnWrap activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {stepArray.map((item, index) => {
        return (
          <div className={'step-container'} style={{ left: `${(index - activeIndex) * 100}%` }} key={item.id}>
            {renderStepComponent(item)}
          </div>
        );
      })}
    </div>
  );
};

export default Styletest;
