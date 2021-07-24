import React from 'react';
import bookmark from 'assets/img/bookmark.png';
import bookmarkActive from 'assets/img/bookmark-active.png';
import eye from 'assets/img/eye.png';
import like from 'assets/img/like.png';
import bookmarkSmall from 'assets/img/bookmark-small.png';
import { useHistory } from 'react-router-dom';

const CardStyle = ({ item }) => {
  const { img, title, author, isBookmark, see, lo, vi, key } = item;
  let history = useHistory();
  return (
    <div
      className="card-style"
      onClick={() => {
        history.push(`/styleTip/detail?id=${key}`);
      }}
    >
      <div className="img-container">
        <div className="bookmark-container">
          <img src={isBookmark ? bookmarkActive : bookmark} alt="" />
        </div>
        <img src={img} alt="" />
        <div className="view-container">
          <div className="inner">
            <div className="cnt-item">
              <div className="mr5">
                <img src={eye} alt="eye" />
              </div>
              <p>{see.toLocaleString('ko-KR')}</p>
            </div>
            <div className="cnt-item">
              <div className="mr5">
                <img src={like} alt="like" />
              </div>
              <p>{lo.toLocaleString('ko-KR')}</p>
            </div>
            <div className="cnt-item">
              <div className="mr5">
                <img src={bookmarkSmall} alt="bookmarkSmall" />
              </div>
              <p>{vi.toLocaleString('ko-KR')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="desc-container">
        <div className="mb5">
          <h4 className="bold">{title}</h4>
        </div>
        <h5 className="small color-grayAEAE">
          <span className="font-Georgia">by</span> {author}
        </h5>
      </div>
    </div>
  );
};

export default CardStyle;
