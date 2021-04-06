import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import defaultProfile from 'assets/img/profile.svg';
import api from 'api';

const Mypage = () => {
  useEffect(() => {}, []);
  const [showPost, setShowPost] = useState(false);
  const inputRef = useRef(null);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let zoneCode = data.zonecode;
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const uploadImage = (event) => {
    console.log(event);
    let reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const user = {
    nickName: '닉네임',
    email: 'test@test.com',
    name: '홍길동',
    gender: 1,
    postNumber: 13123,
    post1: '',
    post2: '',
    agreeMarketing: true,
  };

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-1034">
        <form className="mypage-container pr15 pl15">
          <div className="left-router">
            <h4 className="mb24 fontweight700">안녕하세요 {user.nickName}</h4>

            <div className="">
              <div className="profile-container" onMouseUpCapture={(e) => inputRef.current.click()}>
                <img src={profileImage} alt="defaultProfile" />
              </div>
              <input
                className="file-input"
                type="file"
                name="docx"
                ref={inputRef}
                onChange={uploadImage}
              />
            </div>

            <div className="left-link-container">
              <ul>
                <li>
                  <Link>스타일테스트 내역</Link>
                </li>
                <li>
                  <Link>북마크</Link>
                </li>
                <li>
                  <Link>작성한 글</Link>
                </li>
                <li className="active">
                  <Link>프로필 수정</Link>
                </li>
                <li>
                  <Link>비밀번호 변경</Link>
                </li>
                <li className="logout">로그아웃</li>
              </ul>
            </div>
          </div>

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
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="scot@sample.com"
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
                <input type="text" className="input-style1" id="name" placeholder="홍길동" />
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
                  <input type="radio" id="woman" className="radio-style-0" name="gender" checked />
                  <label htmlFor="woman">여자</label>
                </div>
                <div className="radio-btn-con">
                  <input type="radio" id="man" className="radio-style-0" name="gender" />
                  <label htmlFor="man">남자</label>
                </div>
                <div className="radio-btn-con">
                  <input type="radio" id="none" className="radio-style-0" name="gender" />
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
                    placeholder="소소한다람쥐"
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
                    />
                  </div>

                  <div className="address-btn-container">
                    <div className="width-100 btn-style1">
                      <p className="btn-font-style1 tc" onClick={() => setShowPost(!showPost)}>
                        주소검색
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showPost && (
              <div className="mt10 mb16">
                <DaumPostcode onComplete={handleComplete} width="400px" />
              </div>
            )}

            <div className="mb64">
              <div className="mb16">
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="검색버튼을 눌러 주소를 검색해주세요."
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="상세주소를 입력해주세요."
                />
              </div>
            </div>

            <div className="mb36">
              <h5 className="mb28 fontweight700">마케팅 수신 동의에 동의합니다. </h5>
              <div className="chkbox-con mb20">
                <input type="checkbox" id="agreeInfo" className="input-style-checkbox" />
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
