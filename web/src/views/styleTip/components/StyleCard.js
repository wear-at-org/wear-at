import React from 'react';

const StyleCard = ({ item }) => {
  const { img, title, author } = item;
  return (
    <div className="style-tip-card">
      <div className="img-container">
        <img src={img} alt="" />
      </div>
      <div className="desc-container">
        <p>{title}</p>
        <p>{author}</p>
      </div>
    </div>
  );
};

export default StyleCard;
