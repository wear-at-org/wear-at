import React, { useState } from 'react';
import Address from './Address';
import useEditUserInfo from 'hooks/useEditUserInfo';
import Lnb from 'components/layout/Lnb';

const Mypage = () => {
  const [showPost, setShowPost] = useState(false);
  const [user, dispatch, putUser] = useEditUserInfo();

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-1034">
        <form className="mypage-container pr15 pl15">
          <Lnb />
          <div className="right-container">
            <h5 className="mb20 fontweight700">기본정보</h5>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이메일
                </label>
              </div>

              <div className="mb6">
                <input
                  value={user.email}
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="scot@sample.com"
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_EMAIL', email: e.target.value });
                  }}
                />
              </div>
            </div>

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
                  value={user.name}
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_NAME', name: e.target.value });
                  }}
                />
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
                  <select className="select-style1" name="" id="" required>
                    <option value="" disabled selected hidden>
                      년도
                    </option>
                    <option value="aa">aa</option>
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select className="select-style1" name="" id="" required>
                    <option value="" disabled selected hidden>
                      월
                    </option>
                    <option value="bb">bb</option>
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select className="select-style1" name="" id="" required>
                    <option value="" disabled selected hidden>
                      일
                    </option>
                    <option value="cc">cc</option>
                    <option value="cc">cc</option>
                    <option value="cc">cc</option>
                    <option value="cc">cc</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb40">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  성별
                </label>
              </div>
              <div className="radio-wrap">
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="woman"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'w'}
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
                  />
                  <label htmlFor="man">남자</label>
                </div>
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="none"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'n' || true}
                  />
                  <label htmlFor="none">선택안함</label>
                </div>
              </div>
            </div>

            <div className="">
              <h5 className="mb20 fontweight700">추가정보</h5>

              <div className="mb20">
                <div className="label-container">
                  <label htmlFor="name" className="input-label-style1">
                    닉네임 변경
                  </label>
                </div>

                <div className="mb6">
                  <input
                    type="text"
                    className="input-style1"
                    id="name"
                    placeholder="닉네임을 입력해주세요."
                    value={user.nickname}
                  />
                </div>
              </div>

              <div className="mb20">
                <div className="label-container">
                  <label htmlFor="name" className="input-label-style1">
                    주소
                  </label>
                </div>

                <div className="d-flex">
                  <div className="adress-container pr8">
                    <input
                      type="text"
                      className="input-style1"
                      id="name"
                      placeholder="우편번호"
                      readOnly
                      value={user.zipCode}
                    />
                  </div>

                  <div className="address-btn-container">
                    <div className="width-100 btn-style1">
                      <p className="btn-font font-white tc" onClick={() => setShowPost(!showPost)}>
                        주소검색
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Address
              showPost={showPost}
              setShowPost={setShowPost}
              onChange={(value) => {
                console.log(value);
              }}
            />

            <div className="mb64">
              <div className="mb16">
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="검색버튼을 눌러 주소를 검색해주세요."
                  readOnly
                  value={user.address}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="상세주소를 입력해주세요."
                  value={user.detailAddress}
                />
              </div>
            </div>

            <div className="mb36">
              <h5 className="mb28 fontweight700">마케팅 수신 동의에 동의합니다. </h5>
              <div className="chkbox-con mb20">
                <input
                  type="checkbox"
                  id="agreeInfo"
                  className="input-style-checkbox"
                  checked={user.checkReceivingConsent}
                />
                <label htmlFor="agreeInfo">
                  스콧에서 진행하는 이벤트, 프로모션에 관한 광고를 수신하겠습니다.
                </label>
              </div>
            </div>

            <div className="mb15">
              <input
                disabled
                type="button"
                className="width-100 btn-style1 tc white"
                value="정보 수정 완료"
              />
            </div>

            <div>
              <p className="secession-font">탈퇴하기</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
