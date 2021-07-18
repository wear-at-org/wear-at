import React, { useReducer, useEffect, useState } from 'react';
import api from 'api';
import SignHook from 'hooks/useSignHook';
import { userReducer, initData, checkEmailApi, checkNicknameApi } from 'utils/UserReducer';
import { loginProcess } from 'store/userinfo-store';
import store from '../../store';

const SnsLogin = () => {
  const { signup } = SignHook();
  const [user, dispatch] = useReducer(userReducer, initData);
  const [snsId, setSnsId] = useState(0);
  const signupProcess = (e) => {
    e.preventDefault();
    user.id = snsId;
    signup(user, true);
  };

  useEffect(() => {
    const getUserData = async () => {
      const {
        data,
        data: { id },
      } = await api.get('user');
      store.dispatch(
        loginProcess({
          info: {
            id: id,
            nickname: '',
            email: data?.email || '',
            prividerType: data.provider,
          },
          loginStatus: 'login',
        }),
      );
      setSnsId(id);
      dispatch({ type: 'CHANGE_NAME', name: data?.name || '' });
      dispatch({ type: 'CHANGE_EMAIL', email: data?.email || '' });
      if (data.email) {
        dispatch({ type: 'CHANGE_CHECK_EMAIL', checkEmail: true });
      }
    };
    getUserData();
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center pt50 pt-sm-0">
        <form className="mw-610 col-center pr15 pl15">
          <div className="right-container">
            <h3 className="mb32 bold tc">추가 정보 입력</h3>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이름
                </label>
              </div>

              <div className="mb6">
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="홍길동"
                  value={user.name || ''}
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_NAME', name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="email" className="input-label-style1">
                  이메일
                </label>
              </div>

              <div className="mb16">
                <div className="input-container">
                  <input
                    disabled={user.email === '' || user.checkEmail}
                    type="email"
                    className={'input-style1 with-button'}
                    id="email"
                    placeholder="wearAt"
                    onChange={(e) => dispatch({ type: 'CHANGE_EMAIL', email: e.target.value })}
                    value={user.email || ''}
                  />

                  <button
                    disabled={user.email === '' || user.checkEmail}
                    className="ml16 check-btn-style1"
                    onClick={(e) => {
                      e.preventDefault();
                      checkEmailApi(user.email, dispatch);
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="email" className="input-label-style1">
                  닉네임
                </label>
              </div>

              <div className="mb16">
                <div className="input-container">
                  <input
                    disabled={user.checkNickName}
                    type="nickname"
                    className={'input-style1 with-button'}
                    id="nickname"
                    placeholder="wearAt"
                    onChange={(e) => dispatch({ type: 'CHANGE_NICKNAME', nickname: e.target.value })}
                    value={user.nickname || ''}
                  />

                  <button
                    disabled={user.checkNickName}
                    className="ml16 check-btn-style1"
                    onClick={(e) => {
                      e.preventDefault();
                      checkNicknameApi(user.nickname, dispatch);
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </div>
            </div>

            <div className="mb40">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  성별
                </label>
              </div>
              <div className="radio-wrap pl0 pl-sm-20">
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="woman"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'w'}
                    value={'w'}
                    onChange={(e) => {
                      dispatch({ type: 'CHANGE_GENDER', gender: 'w' });
                    }}
                  />
                  <label htmlFor="woman">여자</label>
                </div>
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="man"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'm'}
                    value={'m'}
                    onChange={(e) => {
                      dispatch({ type: 'CHANGE_GENDER', gender: 'm' });
                    }}
                  />
                  <label htmlFor="man">남자</label>
                </div>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  생년월일
                </label>
              </div>

              <div className="date-birth-container">
                <div className="width-per-33 pl4 pr4">
                  <select
                    className="select-style1"
                    id="year"
                    required
                    onChange={(e) => dispatch({ type: 'CHANHE_YEAR', year: e.target.value })}
                    defaultValue={''}
                  >
                    <option value="" disabled hidden>
                      년도
                    </option>
                    {Array(60)
                      .fill(0)
                      .map((n, i) => {
                        const startYear = new Date().getFullYear();
                        return (
                          <option value={startYear - i} key={startYear - i + 'year'}>
                            {startYear - i}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select
                    className="select-style1"
                    id="month"
                    required
                    onChange={(e) => dispatch({ type: 'CHANHE_MONTH', month: e.target.value })}
                    defaultValue={''}
                  >
                    <option value="" disabled hidden>
                      월
                    </option>
                    {Array(12)
                      .fill(0)
                      .map((n, i) => {
                        return (
                          <option value={i + 1} key={i + 1 + 'moment'}>
                            {i + 1}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select
                    className="select-style1"
                    id="day"
                    required
                    onChange={(e) => dispatch({ type: 'CHANHE_DAY', day: e.target.value })}
                    defaultValue={''}
                  >
                    <option value="" disabled hidden>
                      일
                    </option>
                    {Array(31)
                      .fill(0)
                      .map((n, i) => {
                        return (
                          <option value={i + 1} key={i + 1 + 'day'}>
                            {i + 1}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <div className="signup-btn-wrap mb32 pl0 pr0 pl-sm-32 pr-sm-32">
              <div className="chkbox-con mb20">
                <input
                  type="checkbox"
                  id="agreeInfoAll"
                  className="input-style-checkbox"
                  checked={user.allCheck}
                  onChange={(e) => dispatch({ type: 'CHANGE_CHECK_ALL', allCheck: !user.allCheck })}
                />
                <div className="chk-label-container">
                  <label htmlFor="agreeInfoAll" className="all">
                    전체 약관에 동의합니다.
                  </label>
                </div>
              </div>

              <div className="chkbox-con mb20">
                <input
                  type="checkbox"
                  id="agreeInfoServiceTerms"
                  className="input-style-checkbox"
                  checked={user.checkServiceTerms}
                  onChange={() =>
                    dispatch({
                      type: 'CHAHNE_SERVICE_TERMS',
                      checkServiceTerms: !user.checkServiceTerms,
                    })
                  }
                />
                <div className="chk-label-container">
                  <label htmlFor="agreeInfoServiceTerms">
                    <span className="option-font">(필수)</span> 이용약관 동의
                  </label>
                  <p className="more-font">상세 보기</p>
                </div>
              </div>

              <div className="chkbox-con mb20">
                <input
                  type="checkbox"
                  id="agreeInfoPrivacyPolicy"
                  className="input-style-checkbox"
                  checked={user.checkPrivacyPolicy}
                  onChange={() =>
                    dispatch({
                      type: 'CHAHNE_PRIVACY_POLICY',
                      checkPrivacyPolicy: !user.checkPrivacyPolicy,
                    })
                  }
                />
                <div className="chk-label-container">
                  <label htmlFor="agreeInfoPrivacyPolicy">
                    <span className="option-font">(필수)</span> 개인정보처리방침 동의
                  </label>
                  <p className="more-font">상세 보기</p>
                </div>
              </div>

              <div className="chkbox-con">
                <input
                  type="checkbox"
                  id="agreeInfoReciving"
                  className="input-style-checkbox"
                  checked={user.checkReceivingConsent}
                  onChange={() =>
                    dispatch({
                      type: 'CHAHNE_RECEIVING_CONSENT',
                      checkReceivingConsent: !user.checkReceivingConsent,
                    })
                  }
                />
                <div className="chk-label-container">
                  <label htmlFor="agreeInfoReciving">
                    <span className="option-font">(선택)</span> 마케팅 목적 혜택/정보 수신 동의
                  </label>
                </div>
              </div>
            </div>

            <div className="mb15">
              <input
                disabled={
                  !(
                    user.name &&
                    user.nickname &&
                    !user.error.emailError.isError &&
                    user.checkPrivacyPolicy &&
                    user.checkServiceTerms &&
                    user.checkEmail &&
                    user.checkNickName
                  )
                }
                type="button"
                className="width-100 btn-style1 tc white btn-font"
                value="회원 가입 완료"
                onClick={(e) => signupProcess(e)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnsLogin;
