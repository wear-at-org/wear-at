import React, { useEffect, useState } from 'react';
import buyIcon from 'assets/img/icon-shopping.png';
import DetailItem from './DetailItem';
import useStepHook from 'hooks/useStepHook';
import xBtn from 'assets/img/x-btn-black.png';

const StyleDetailModal = ({ showPop, setShowPop, clickId }) => {
  const [detailItem, setDetailItem] = useState({ recommendItems: [] });
  const { getRecommendDetail } = useStepHook();

  useEffect(() => {
    const getDetailItem = async () => {
      const res = await getRecommendDetail(clickId);
      setDetailItem(res);
    };
    if (clickId && showPop) {
      getDetailItem();
    }
  }, [clickId, showPop]);

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
        <div className="mb64">
          <div className="total">
            <div
              className="x-btn-container"
              onClick={() => {
                setShowPop(false);
              }}
            >
              <img src={xBtn} alt="" />
            </div>
            <div className="buy-btn">
              <img src={buyIcon} alt="" />
              <h5 className="color-white small ml10 hover-txt">제품 상세보기</h5>
            </div>
            {detailItem.recommendItems.map((item) => {
              return (
                <div className="item">
                  <img src={item.imageUrl} alt={item.imageUrl} />

                  <a href={item.linkUrl} target="_blank" rel="noreferrer" className="info-price">
                    <div className="mb4">
                      <h5>{item.title}</h5>
                    </div>
                    <div className="price-value">
                      <h5 className="small color-blue">₩{item.price.toLocaleString('ko-KR')}</h5>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="style-item-list">
          {detailItem.recommendItems.map((item) => {
            return <DetailItem item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleDetailModal;
