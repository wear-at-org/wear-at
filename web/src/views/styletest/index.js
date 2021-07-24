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
  const { makeStyleTestList, setAnswers, answers } = StepHook();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hooks = StepHook();

  useEffect(() => {
    if (props.location.state) {
      const answerParams = props.location.state.params.answer;
      setAnswers({
        ...answers,
        id: 'ing',
        answer: answerParams.map((i) => {
          return {
            id: i.queryItemId,
            queryId: i.queryId,
            answer: i.answer,
          };
        }),
      });
    } else {
      setAnswers({ ...answers, id: 'ing', answer: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const makeList = async () => {
      api.get('subscribe/query').then(async ({ data }) => {
        let idParams = false;
        console.log(props.location.state);
        if (props.location.state) {
          idParams = props.location.state.params.id;
        }
        makeStyleTestList(data, idParams).then((res) => {
          setApiId(res.id);
          setStepArray(res.resultArray);
        });
      });
    };
    if (answers.id !== 'init') {
      makeList();
    }
  }, [answers]);

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
        return (
          <StepListItem
            item={items}
            hooks={hooks}
            goNextStep={goNextStep}
            key={'style-' + index}
            apiId={apiId}
            activeIndex={activeIndex}
            answers={answers}
          />
        );
      case 'U_LIST_IMAGES':
        return (
          <StepListImage
            item={items}
            hooks={hooks}
            goNextStep={goNextStep}
            key={'style-' + index}
            apiId={apiId}
            activeIndex={activeIndex}
            answers={answers}
          />
        );
      case 'U_LIST_2DEP_ITEMS':
        return (
          <StepTwoDepthItem
            item={items}
            hooks={hooks}
            goNextStep={goNextStep}
            key={'style-' + index}
            apiId={apiId}
            activeIndex={activeIndex}
            answers={answers}
          />
        );
      case 'U_LIST_BODY':
        return (
          <StepListBody
            item={items}
            hooks={hooks}
            goNextStep={goNextStep}
            key={'style-' + index}
            apiId={apiId}
            activeIndex={activeIndex}
            answers={answers}
          />
        );
      case 'U_UPLOAD_IMAGE':
        return <StepUploadImage item={items} hooks={hooks} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} answers={answers} />;
      default:
        return <StepListItem item={items} goNextStep={goNextStep} key={'style-' + index} apiId={apiId} activeIndex={activeIndex} answers={answers} />;
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
