import React, { useReducer } from 'react';
import { userReducer, initData, checkEmailApi, checkNicknameApi } from 'utils/UserReducer';
import SignHook from 'hooks/useSignHook';

const Signup = () => {
  const { signup } = SignHook();
  const [user, dispatch] = useReducer(userReducer, initData);
  const signupProcess = (e) => {
    e.preventDefault();
    signup(user);
  };

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-610 pt40 pt-sm-0">
        <form className="pr25 pl25 signup-container">
          <div className="mb32 tc">
            <h3>회원가입</h3>
          </div>

          <div>
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
                  onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })}
                  value={user.name || ''}
                />
              </div>

              <div className="signup-desc-text">
                <p>이름은 표준 한글 또는 영문만 입력 가능합니다.</p>
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
                    type="email"
                    className={user.error.emailError.isError ? 'input-style1 with-button error' : 'input-style1 with-button'}
                    id="email"
                    placeholder="wearAt@sample.com"
                    onChange={(e) => dispatch({ type: 'CHANGE_EMAIL', email: e.target.value })}
                    value={user.email || ''}
                  />

                  <button
                    disabled={user.email === '' || user.error.emailError.isError || user.checkEmail}
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

              <div className={user.error.emailError.isError ? 'error-container active' : 'error-container'}>
                <p className="error-font">{user.error.emailError.content}</p>
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
                    type="nickname"
                    className={'input-style1 with-button'}
                    id="nickname"
                    placeholder="wearAt"
                    onChange={(e) => dispatch({ type: 'CHANGE_NICKNAME', nickname: e.target.value })}
                    value={user.nickname || ''}
                  />

                  <button
                    disabled={user.nickname === '' || user.checkNickName}
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

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="password" className="input-label-style1">
                  비밀번호
                </label>
              </div>

              <div className="mb16">
                <input
                  placeholder="8자 이상~20자 이하 / 영문 대 소문자, 숫자, 특수문자"
                  type="password"
                  className={user.error.passwordError.isError ? 'input-style1 error' : 'input-style1'}
                  id="password"
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_PASSWORD', password: e.target.value });
                  }}
                  autoComplete="off"
                  value={user.password || ''}
                />
              </div>

              <div className={user.error.passwordError.isError ? 'error-container active' : 'error-container'}>
                <p className="error-font">{user.error.passwordError.content}</p>
              </div>
            </div>

            <div className="mb32">
              <div className="label-container">
                <label htmlFor="passwordCheck" className="input-label-style1">
                  비밀번호 확인
                </label>
              </div>

              <div className="mb16">
                <input
                  placeholder="8자 이상~20자 이하 / 영문 대 소문자, 숫자, 특수문자"
                  type="password"
                  className={user.error.passwordConfirmError.isError ? 'input-style1 error' : 'input-style1'}
                  id="passwordCheck"
                  onChange={(e) => {
                    dispatch({
                      type: 'CHANGE_PASSWORD_CONFIRM',
                      passwordConfirm: e.target.value,
                      password: user.password,
                    });
                  }}
                  autoComplete="off"
                  value={user.passwordConfirm || ''}
                />
              </div>

              <div className={user.error.passwordConfirmError.isError ? 'error-container active' : 'error-container'}>
                <p className="error-font">{user.error.passwordConfirmError.content}</p>
              </div>
            </div>

            <div className="signup-btn-wrap mb32">
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

            <div>
              <input
                type="submit"
                value="동의하고 회원가입"
                className="btn-style1 wid100 btn-font font-white middle"
                onClick={(e) => signupProcess(e)}
                disabled={
                  !(
                    user.name &&
                    user.nickname &&
                    !user.error.emailError.isError &&
                    !user.error.passwordError.isError &&
                    !user.error.passwordConfirmError.isError &&
                    user.checkPrivacyPolicy &&
                    user.checkServiceTerms &&
                    user.checkEmail &&
                    user.checkNickName
                  )
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
