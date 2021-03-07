import React, { useCallback } from 'react';
import Logo from 'assets/img/logo.png';

const Drawer = ({ drawerStatus, setDrawerStatus }) => {
  const clickDrawerEvent = useCallback((e) => {
    if (e.target.classList.contains('drawer-container')) {
      setDrawerStatus(false);
    }
  }, [setDrawerStatus]);
  return (
    <div
      className={drawerStatus ? 'drawer-container active' : 'drawer-container'}
      onClick={(e) => clickDrawerEvent(e)}
    >
      <div className="drawer-inner">
        <div className="tc">
          <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
