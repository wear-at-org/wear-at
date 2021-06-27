import React, { useCallback, useEffect } from 'react';
import xBtn from 'assets/img/x-btn-black.png';
import { useSelector } from 'react-redux';
import { userInfoName } from '../../store';
import defaultProfile from 'assets/img/default-user.png';
import SnsLoginComponent from 'components/SnsLoginComponent';
import arrRight from 'assets/img/arr-right-b.png';
import { useHistory } from 'react-router-dom';
import LogoutHook from 'hooks/useLogoutHook';

const Drawer = ({ drawerStatus, setDrawerStatus }) => {
  const [logout] = LogoutHook();
  let history = useHistory();
  const { loginStatus, info } = useSelector((state) => state[userInfoName]);
  const clickDrawerEvent = useCallback(
    (e) => {
      if (e.target.classList.contains('drawer-container')) {
        setDrawerStatus(false);
      }
    },
    [setDrawerStatus],
  );

  const navigate = (params) => {
    history.push(params);
  };

  return (
    <div className={drawerStatus ? 'drawer-container active' : 'drawer-container'} onClick={(e) => clickDrawerEvent(e)}>
      <div className="drawer-inner">
        <ul className="m-profile-container">
          <li className="d-flex x-end common-icon-size mb24" onClick={() => setDrawerStatus(false)}>
            <img src={xBtn} alt="" />
          </li>
          {loginStatus !== 'login' ? (
            <>
              <li className="d-flex y-center">
                <div className="common-icon-size2 mr10">
                  <img src={defaultProfile} alt="" />
                </div>

                <h5 className="small">
                  <div
                    onClick={() => {
                      setDrawerStatus(false);
                      navigate('/login');
                    }}
                  >
                    로그인이 필요합니다.
                  </div>
                </h5>
              </li>
            </>
          ) : (
            <li className="mypage">
              <div
                className="d-flex y-center"
                onClick={() => {
                  setDrawerStatus(false);
                  navigate('/mroute');
                }}
              >
                <div className="common-icon-size2 mr20">
                  <img src={defaultProfile} alt="user-img" />
                </div>

                <div className="">
                  <h5 className="small">{info.nickname || ''}</h5>
                </div>
              </div>
            </li>
          )}
        </ul>
        <ul className="drawer-item-container mb16">
          <li>
            <div
              className="item"
              onClick={() => {
                setDrawerStatus(false);
                navigate('/intro');
              }}
            >
              <div> 서비스 소개</div>
              <div className="">
                <img src={arrRight} alt="" />
              </div>
            </div>
          </li>
          <li>
            <div
              className="item"
              onClick={() => {
                setDrawerStatus(false);
                navigate('/styleTip');
              }}
            >
              <div> 스타일 팁</div>
              <div className="">
                <img src={arrRight} alt="" />
              </div>
            </div>
          </li>
        </ul>
        <div className="pl41 pr41">
          <div
            className="btn-style3"
            onClick={() => {
              setDrawerStatus(false);
              navigate('/styleTestIntro');
            }}
          >
            <p className="btn-font font-white d-flex y-center small">30초만에 나에게 꼭 맞는 스타일 분석</p>
          </div>
        </div>

        {loginStatus !== 'login' ? (
          <div className="sns-drawe-container">
            <SnsLoginComponent setDrawerStatus={setDrawerStatus} />
          </div>
        ) : (
          <div className="sns-drawe-container">
            <h5
              className="small"
              onClick={() => {
                setDrawerStatus(false);
                logout();
              }}
            >
              로그아웃
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
