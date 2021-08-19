import * as React from 'react';
import {useState, useEffect} from 'react';
import api from 'api';
import StepHook from 'hooks/useStepHook';
import {View} from 'react-native';
import StepListItem from './steps/StepListItem';
import StepListImage from './steps/StepListImage';
import StepTwoDepthItem from './steps/StepTwoDepthItem';
import StepListBody from './steps/StepListBody';
import StepUploadImage from './steps/StepUploadImage';
import StyleTestHeader from './steps/StyleTestHeader';

interface propsTypes {
  id?: string;
}

const Styletest: React.FC<propsTypes> = (props) => {
  const [apiId, setApiId] = useState<string>('0');
  const {makeStyleTestList} = StepHook();
  const [stepArray, setStepArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const hooks = StepHook();

  useEffect(() => {
    const makeList = async () => {
      api.get('subscribe/query').then(async ({data}) => {
        let idParams = '';
        if (props.id) {
          idParams = props.id;
        }
        console.log(data);
        makeStyleTestList(data, idParams).then((res) => {
          console.log('res.resultArray');
          console.log(res.resultArray);
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

  const renderStepComponent = (item, index: number) => {
    const {items, type} = item;
    if (index !== activeIndex) {
      return;
    }
    console.log(item);

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
    <View>
      <StyleTestHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} stepLength={stepArray.length} apiId={apiId} hooks={hooks} />
      {stepArray.map((item, index) => {
        return renderStepComponent(item, index);
      })}
    </View>
  );
};

export default Styletest;
