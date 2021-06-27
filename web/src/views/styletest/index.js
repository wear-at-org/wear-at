import React, { useState, useEffect } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';
import StepListItem from './steps/StepListItem';
import StepListImage from './steps/StepListImage';
import StepTwoDepthItem from './steps/StepTwoDepthItem';
import StepListBody from './steps/StepListBody';
import StepUploadImage from './steps/StepUploadImage';
import StyleTestHeader from './steps/StyleTestHeader';
import StepHook from 'hooks/useStepHook';

const Styletest = () => {
  const history = useHistory();
  const { makeStyleTestList } = StepHook();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hooks = StepHook();

  useEffect(() => {
    api.get('subscribe/query').then(({ data }) => {
      setStepArray(makeStyleTestList(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const { items, type } = item;
    if (index !== activeIndex) {
      return;
    }
    switch (type) {
      case 'U_LIST_ITEMS':
        return <StepListItem item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_IMAGES':
        return <StepListImage item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_2DEP_ITEMS':
        return <StepTwoDepthItem item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_LIST_BODY':
        return <StepListBody item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} />;
      case 'U_UPLOAD_IMAGE':
        return <StepUploadImage item={items} hooks={hooks} key={'style-' + index} />;
      default:
        return <StepListItem item={items} goNextStep={goNextStep} key={'style-' + index} />;
    }
  };

  return (
    <>
      <StyleTestHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} stepLength={stepArray.length} />
      <div className="step-wrap">
        {stepArray.map((item, index) => {
          return renderStepComponent(item, index);
        })}
      </div>
    </>
  );
};

export default Styletest;
