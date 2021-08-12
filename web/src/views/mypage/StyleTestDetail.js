import React, { useEffect, useState } from 'react';
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
    console.log(detailItem);
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="style-detail-wrap">
        <div className="total mb64 y-center">
          <div className="img-container mb30">
            <img src={detailItem.imageUrl} alt="" />
          </div>

          <div className="">
            <h4>{detailItem.description}</h4>
          </div>
        </div>

        <div className="style-item-list">
          <div className="style-item-main-title">
            <h5>모든 상품 자세히 보기</h5>
          </div>

          {detailItem.recommendItems.map((item, index) => {
            return <DetailItem key={index + 'DetailItem'} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleTestDetail;
