import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/swiper-bundle.css';
import main1 from 'assets/img/main1.png';
import main2 from 'assets/img/main2.png';
import main3 from 'assets/img/main3.png';
import main4 from 'assets/img/main4.png';
import main5 from 'assets/img/main5.png';
import main6 from 'assets/img/main6.png';
import main7 from 'assets/img/main7.png';
import main8 from 'assets/img/main8.png';
import main9 from 'assets/img/main9.png';

const MainParteners = () => {
  SwiperCore.use([Autoplay]);

  return (
    <section className="col-12">
      {/*  eslint-disable-next-line jsx-a11y/no-distracting-elements */}
      <marquee className="partners-container" scrollamount="2" scrolldely="50">
        <div className="inner">
          <div className="partners-item">
            <img src={main1} alt="logo1" />
          </div>
          <div className="partners-item">
            <img src={main2} alt="logo2" />
          </div>
          <div className="partners-item">
            <img src={main3} alt="logo3" />
          </div>
          <div className="partners-item">
            <img src={main4} alt="logo4" />
          </div>
          <div className="partners-item">
            <img src={main5} alt="logo5" />
          </div>
          <div className="partners-item">
            <img src={main6} alt="logo6" />
          </div>
          <div className="partners-item">
            <img src={main7} alt="logo7" />
          </div>
          <div className="partners-item">
            <img src={main8} alt="logo8" />
          </div>
          <div className="partners-item">
            <img src={main9} alt="logo9" />
          </div>
        </div>
      </marquee>
    </section>
  );
};

export default MainParteners;
