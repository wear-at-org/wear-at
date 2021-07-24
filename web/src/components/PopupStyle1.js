import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import store, { globalPopupName } from '../store';
import { removePopup } from 'store/globalpopup-store';

const PopupStyle1 = () => {
  const history = useHistory();
  const popup = useSelector((state) => state[globalPopupName]);
  const { dispatch } = store;
  const { isActive, title, btnMsg, goLink } = popup;

  return (
    <div className={`global-popup-container ${isActive && 'active'}`}>
      <div className="inner">
        <div className="mb33">
          <h5 className="tc">
            {title &&
              title.split('\n').map((line) => (
                <div key={`tip-item-${line}`}>
                  {line}
                  <br />
                </div>
              ))}
          </h5>
        </div>
        <div
          className="btn-style1 middle width-100"
          onClick={() => {
            dispatch(removePopup());
            if (goLink) history.push(goLink);
          }}
        >
          <p className="btn-font font-white d-flex x-center y-center">{btnMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default PopupStyle1;
