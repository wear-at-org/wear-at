import React from 'react';

const DetailItem = () => {
  return (
    <div className="detail-item">
      <div className="left-img">
        <img src="https://wooilsin.co.kr/web/product/big/202011/03e1483ad7df44f8e4ab0dc0e8bd6fb7.jpg" alt="" />
      </div>

      <div className="right-info">
        <div className="mb4">
          <h5>텍스트 티셔츠</h5>
        </div>
        <div className="price-value mb16">
          <h5 className="small color-blue">₩10,000</h5>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
