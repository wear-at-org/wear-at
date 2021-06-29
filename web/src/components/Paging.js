import React from 'react';
import arrRight from 'assets/img/arr-right-b.png';
import arrLeft from 'assets/img/arr-left-b.png';
import dotV from 'assets/img/dot-v.png';

const Paginig = () => {
  return (
    <div className="paging-container">
      <div className="paging-item arr">
        <img src={arrLeft} alt="" />
      </div>
      <div className="paging-item active">1</div>
      <div className="paging-item">2</div>
      <div className="paging-item">3</div>
      <div className="paging-item">4</div>
      <div className="paging-item dot">
        <img src={dotV} alt="" />
      </div>
      <div className="paging-item arr">
        <img src={arrRight} alt="" />
      </div>
    </div>
  );
};

export default Paginig;
