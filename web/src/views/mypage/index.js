import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import defaultProfile from 'assets/img/profile.svg';

const Mypage = () => {
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
    inputRef.current.click();
    // let reader = new FileReader();
    // let file = event.target.files[0];
    // reader.onloadend = () => {
    //   setProfileImage(reader.result);
    // };
    // reader.readAsDataURL(file);
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
            <div className="">
              <h4 className="mb24">안녕하세요 {user.nickName}</h4>
            </div>

            <div className="">
              <div className="">
                <div className="mb50 mt50" onMouseUpCapture={() => uploadImage()}>
                  <img src={profileImage} alt="defaultProfile" />
                </div>
                <input className="file-input" type="file" name="docx" ref={inputRef} />
              </div>
            </div>

            <div className="">
              {/* <ul>
                <li>
                  <Link>스타일테스트 내역</Link>
                </li>
                <li>
                  <Link>북마크</Link>
                </li>
                <li>
                  <Link>작성한 글</Link>
                </li>
                <li>
                  <Link>프로필 수정</Link>
                </li>
                <li>
                  <Link>비밀번호 변경</Link>
                </li>
                <li>로그아웃</li>
              </ul> */}
            </div>
          </div>
          <div className="right-container">
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
            {/* <DaumPostcode onComplete={handleComplete} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
