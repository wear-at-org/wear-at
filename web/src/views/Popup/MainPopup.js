import React from 'react';

export default function MainPopup(props) {
  const { closePopup } = props;
  return (
    <div className="popup-wrapper" onClick={closePopup}>
      <div className="dim" />
      <div className="popup-container">
        <div className="inner">
          <h3 className="mb20 mb-sm-10 mt-sm-10">
            title
          </h3>

          <div className="d3-desc font-size-30 mb30">
            <span>
              title desc
            </span>
          </div>

          <div className="row">
            <div className="">
              <span>이름</span>
            </div>

            <div className="">
              <input type="text" />
            </div>
          </div>

          <div className="row">
            <div className="">
              <span>메일</span>
            </div>

            <div className="">
              <input type="email" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
