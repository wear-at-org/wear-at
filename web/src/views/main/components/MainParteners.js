import React from 'react';
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
  return (
    <section className="col-12">
      <div class="marquee">
        <ul class="marquee-content">
          <li class="marquee-item">
            <img src={main1} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main2} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main3} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main4} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main5} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main6} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main7} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main8} alt="logo1" />
          </li>
          <li class="marquee-item">
            <img src={main9} alt="logo1" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MainParteners;
