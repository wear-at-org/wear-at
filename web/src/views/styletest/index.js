import React, { useState, useEffect } from 'react';
import api from 'api';
import StepListItem from './steps/StepListItem';
import StepListImage from './steps/StepListImage';
import StepTwoDepthItem from './steps/StepTwoDepthItem';
import StepListBody from './steps/StepListBody';
import StepUploadImage from './steps/StepUploadImage';
import StyleTestHeader from './steps/StyleTestHeader';
import StepHook from 'hooks/useStepHook';

const Styletest = (props) => {
  const [apiId, setApiId] = useState(0);
  const { makeStyleTestList } = StepHook();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hooks = StepHook();

  useEffect(() => {
    const makeList = async () => {
      api.get('subscribe/query').then(async ({ data }) => {
        let idParams = false;
        if (props.location.state) {
          idParams = props.location.state.params.id;
        }
        makeStyleTestList(data, idParams).then((res) => {
          setApiId(res.id);
          setStepArray(res.resultArray);
        });
      });
    };
    makeList();
  }, []);

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
        return <StepListItem item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
      case 'U_LIST_IMAGES':
        return <StepListImage item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
      case 'U_LIST_2DEP_ITEMS':
        return <StepTwoDepthItem item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
      case 'U_LIST_BODY':
        return <StepListBody item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
      case 'U_UPLOAD_IMAGE':
        return <StepUploadImage item={items} hooks={hooks} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
      default:
        return <StepListItem item={items} hooks={hooks} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} />;
    }
  };

  return (
    <>
      <StyleTestHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} stepLength={stepArray.length} apiId={apiId} hooks={hooks} />
      <div className="step-wrap">
        {stepArray.map((item, index) => {
          return renderStepComponent(item, index);
        })}
      </div>
    </>
  );
};

export default Styletest;
