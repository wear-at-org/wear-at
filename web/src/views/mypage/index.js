import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import defaultProfile from 'assets/img/profile.svg';

const Mypage = () => {
  const [showPost, setShowPost] = useState(false)
  const inputRef = useRef(null);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

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
    console.log(event)
    let reader = new FileReader();
    let file = event.target.files[0];
    if(file) {
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
              <input className="file-input" type="file" name="docx" ref={inputRef} onChange={uploadImage}/>
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
                <li className='logout'>로그아웃</li>
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
                <input type="text" className="input-style1" id="name" placeholder="scot@sample.com"/>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이름
                </label>
              </div>

              <div className="mb6">
                <input type="text" className="input-style1" id="name" placeholder="홍길동"/>
              </div>
            </div>     

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  생년월일
                </label>
              </div>

              <div className="date-birth-container">
                <div className="">
                  <select className="select-style1" name="" id=""></select>
                </div>
                <div className="">
                  <select name="" id=""></select>
                </div>
                <div className="">
                  <select name="" id=""></select>
                </div>
              </div>
            </div>                     


            <div className="radio-wrap">
              <div className="radio-btn-con">
                <input type="radio" id="woman" className="radio-style-0" name="gender" />
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
            {
              showPost && <div className=""><DaumPostcode onComplete={handleComplete} /></div>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
