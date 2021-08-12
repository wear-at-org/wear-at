import React from 'react';

const DetailItem = ({ item }) => {
  return (
    <div className="detail-item">
      <div className="left-img">
        <img src={item.imageUrl} alt={item.imageUrl} />
      </div>

      <div className="right-info">
        <div className="mb0">
          <h5>{item.brand}</h5>
        </div>
        <div className="mb4">
          <h4>{item.title}</h4>
        </div>
        <div className="mb4">
          <h4>{item.description}</h4>
        </div>
        <div className="price-value mb16">
          <h5 className="small color-blue">{item.price}</h5>
        </div>
        <a href={item.linkUrl} target="_blank" rel="noreferrer" className="info-price">
          <div className="btn-style2 middle center">
            <p className="btn-font color-black333 bold">바로 구매하기</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DetailItem;
