import React, { useEffect, useState } from 'react';
import buyIcon from 'assets/img/icon-shopping.png';
import DetailItem from './components/DetailItem';
import useStepHook from 'hooks/useStepHook';
import { useParams } from 'react-router-dom';

const StyleTestDetail = () => {
  const { id } = useParams();
  const [detailItem, setDetailItem] = useState({ recommendItems: [] });
  const { getRecommendDetail } = useStepHook();

  useEffect(() => {
    const getDetailItem = async () => {
      const res = await getRecommendDetail(id);
      setDetailItem(res);
    };

    getDetailItem();
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="style-detail-wrap">
        <div className="total mb64">
          <div className="buy-btn">
            <img src={buyIcon} alt="" />
            <h5 className="color-white small ml10 hover-txt">제품 상세보기</h5>
          </div>
          {detailItem.recommendItems.map((item, index) => {
            return (
              <div className="item" key={`${index}-item`}>
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

        <div className="style-item-list">
          {detailItem.recommendItems.map((item, index) => {
            return <DetailItem key={index + 'DetailItem'} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleTestDetail;
