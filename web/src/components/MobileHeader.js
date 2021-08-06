import React from 'react';
import { useHistory } from 'react-router-dom';
import arrLeft from 'assets/img/arr-right.png';
import { checkMobile } from 'utils';

const MobileHeader = () => {
  const history = useHistory();

  return checkMobile() !== 'other' ? (
    <div className="mobile-header-wrap">
      <div className="inner">
        <div className="mobile-header">
          <div
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={arrLeft} alt="" />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MobileHeader;
