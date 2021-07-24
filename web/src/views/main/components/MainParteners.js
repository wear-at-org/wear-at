import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/swiper-bundle.css';
import main1 from 'assets/img/main1.jpg';
import main2 from 'assets/img/main2.jpg';
import main3 from 'assets/img/main3.jpg';
import main4 from 'assets/img/main4.jpg';

const MainParteners = () => {
  SwiperCore.use([Autoplay]);

  return (
    <section className="col-12">
      {/*  eslint-disable-next-line jsx-a11y/no-distracting-elements */}
      <marquee className="partners-container" scrollamount="2" scrolldely="50">
        <div className="inner">
          <div className="partners-item">
            <img src={main1} alt="" />
          </div>
          <div className="partners-item">
            <img src={main2} alt="" />
          </div>
          <div className="partners-item">
            <img src={main3} alt="" />
          </div>
          <div className="partners-item">
            <img src={main4} alt="" />
          </div>
          <div className="partners-item">
            <img src={main1} alt="" />
          </div>
          <div className="partners-item">
            <img src={main2} alt="" />
          </div>
          <div className="partners-item">
            <img src={main3} alt="" />
          </div>
          <div className="partners-item">
            <img src={main4} alt="" />
          </div>
          <div className="partners-item">
            <img src={main1} alt="" />
          </div>
          <div className="partners-item">
            <img src={main2} alt="" />
          </div>
          <div className="partners-item">
            <img src={main3} alt="" />
          </div>
          <div className="partners-item">
            <img src={main4} alt="" />
          </div>
        </div>
      </marquee>
    </section>
  );
};

export default MainParteners;
