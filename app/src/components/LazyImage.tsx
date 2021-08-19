import FastImage from 'react-native-fast-image';
import * as React from 'react';
import {useState} from 'react';

type ImgProps = {imgUri: string};

const LazyImage: React.FC<ImgProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return <FastImage source={require('assets/img/default.png')} />;
  }

  return <FastImage source={{uri: props.imgUri}} onLoadEnd={() => setIsLoading(false)} />;
};

export default LazyImage;
