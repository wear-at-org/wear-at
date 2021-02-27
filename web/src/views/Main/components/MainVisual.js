import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/swiper-bundle.css';
import main1 from 'assets/img/main1.jpg';
import main2 from 'assets/img/main2.jpg';
import main3 from 'assets/img/main3.jpg';
import main4 from 'assets/img/main4.jpg';

const MainVisual = () => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      spaceBetween={50}
      slidesPerView={1}
    >
      <SwiperSlide>
        <div className="swiper-inner">
          <img src={main1} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
          <img src={main2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
          <img src={main3} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-inner">
          <img src={main4} alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainVisual;
