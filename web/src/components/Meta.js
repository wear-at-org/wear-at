import React from 'react';
import { Helmet } from 'react-helmet';
import logo from 'assets/img/logo.png';
const locales = {
  en: 'en_US',
  ko: 'ko_KR',
};

const Meta = () => {
  const lang = locales['ko'];
  const title = '웨어앳 :: 나만의 AI스타일리스트';
  const description = '시간들여 공들여 옷 찾지 말고, 인공지능 스타일리스트가 찾아주는 내게 꼭 맞는 옷을!';
  const image = logo;
  const type = 'website';
  const width = 400;
  const height = 400;

  return (
    <Helmet titleTemplate="%s">
      <html lang="ko_KR" />
      <title>웨어앳 :: 나만의 AI스타일리스트</title>
      <meta
        name="keywords"
        content="옷추천,스타일리스트,디자이너 브랜드,편집샵,미니멀,낫띵리튼,프라이탁,디오디너리,어나더오피스,노앙,로우로우,포터,라이플,컨버스,브렌다브랜든서울,파르티멘토,헤브어굿타임,스튜디오콘크리트,칼하트,이자벨마랑,메종키츠네,던스트,킨더살몬,아워레가시"
      />
      <meta name="description" content={description} />
      <meta name="author" content="wearAt" />
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemprop="image" content={image} /> : null}

      <meta property="og:site_name" content="Weat At" />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:locale" content={locales[lang]} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}
      {width ? <meta property="og:image:width" content={width} /> : null}
      {height ? <meta property="og:image:height" content={height} /> : null}
    </Helmet>
  );
};

export default Meta;
