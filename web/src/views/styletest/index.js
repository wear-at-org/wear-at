import React, { useState, useEffect } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';
import StepListItem from './steps/StepListItem';
import StepListImage from './steps/StepListImage';
import StepTwoDepthItem from './steps/StepTwoDepthItem';
import StepListBody from './steps/StepListBody';
import StepUploadImage from './steps/StepUploadImage';
import arrLeft from 'assets/img/arr-right.png';
import xBtn from 'assets/img/x-btn-black.png';

const Styletest = () => {
  const history = useHistory();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.get('subscribe/query').then((res) => {
      console.log(res.data);
      setStepArray(res.data);
    });
  }, []);

  useEffect(() => {
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  const goNextStep = () => {
    const insertStep = activeIndex + 1;
    setActiveIndex(insertStep);
  };

  const renderStepComponent = (item, index) => {
    if (index !== activeIndex) {
      return;
    }
    switch (item.uiType) {
      case 'U_LIST_ITEMS':
        return <StepListItem item={item} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_IMAGES':
        return <StepListImage item={item} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_2DEP_ITEMS':
        return <StepTwoDepthItem item={item} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_BODY':
        return <StepListBody item={item} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_UPLOAD_IMAGE':
        return <StepUploadImage item={item} goNextStep={goNextStep} key={'style-' + index} />;
      default:
        return <StepListItem item={item} goNextStep={goNextStep} key={'style-' + index} />;
    }
  };

  return (
    <>
      <div className="style-test-header">
        <div
          className=""
          onClick={() => {
            if (activeIndex !== 0) {
              window.scrollTo(0, 0);
              setActiveIndex(activeIndex - 1);
            } else {
              history.push('/styleTestIntro');
            }
          }}
        >
          <img src={arrLeft} alt="" />
        </div>
        <div className="">
          <h4>스타일테스트</h4>
        </div>
        <div className="" onClick={() => history.push('/')}>
          <img src={xBtn} alt="" />
        </div>
      </div>
      <div className="step-wrap">
        {stepArray.map((item, index) => {
          return renderStepComponent(item, index);
        })}
      </div>
    </>
  );
};

export default Styletest;
