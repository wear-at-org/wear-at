import React from 'react';
import { Helmet } from 'react-helmet';
import logo from 'assets/img/logo.png';
const locales = {
  en: 'en_US',
  ko: 'ko_KR',
};

const Meta = () => {
  const lang = locales['ko'];
  const title = 'Wear At';
  const description = '한 손으로 전문 스타일리스트의 퍼스널 스타일링 을 받아보세요. 사용자의 취향분석을 통해 최적의 코디를 추천해드립니다.';
  const image = logo;
  const type = 'website';
  const width = 400;
  const height = 400;

  return (
    <Helmet titleTemplate="%s">
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
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
