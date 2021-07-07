import React from 'react';
import buyIcon from 'assets/img/icon-shopping.png';
import DetailItem from './DetailItem';

const StyleDetailModal = ({ showPop, setShowPop }) => {
  if (!showPop) {
    return <></>;
  }
  return (
    <div
      className="style-detail-wrap"
      onClick={(e) => {
        if (e.target.classList.contains('style-detail-wrap')) {
          setShowPop(false);
        }
      }}
    >
      <div className="inner">
        <div className="total mb64">
          <div className="buy-btn">
            <img src={buyIcon} alt="" />
            <h5 className="color-white small ml10 hover-txt">제품 상세보기</h5>
          </div>
          <div className="item">
            <img src="https://wooilsin.co.kr/web/product/big/202011/03e1483ad7df44f8e4ab0dc0e8bd6fb7.jpg" alt="" />
            <div className="info-price">
              <div className="mb4">
                <h5>텍스트 티셔츠</h5>
              </div>
              <div className="price-value">
                <h5 className="small color-blue">₩10,000</h5>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2ZRouiCp-A35Udmex3dbQaOA-7GYPjjMZQ&usqp=CAU" alt="" />
            <div className="info-price">
              <div className="mb4">
                <h5>텍스트 티셔츠</h5>
              </div>
              <div className="price-value">
                <h5 className="small color-blue">₩10,000</h5>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="http://image.auction.co.kr/itemimage/20/eb/12/20eb123656.jpg" alt="" />
            <div className="info-price">
              <div className="mb4">
                <h5>텍스트 티셔츠</h5>
              </div>
              <div className="price-value">
                <h5 className="small color-blue">₩10,000</h5>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="https://image.msscdn.net/images/goods_img/20201217/1725492/1725492_5_500.jpg" alt="" />
            <div className="info-price">
              <div className="mb4">
                <h5>텍스트 티셔츠</h5>
              </div>
              <div className="price-value">
                <h5 className="small color-blue">₩10,000</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="style-item-list">
          <DetailItem />
        </div>
      </div>
    </div>
  );
};

export default StyleDetailModal;
