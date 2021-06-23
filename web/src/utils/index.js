import circle1 from 'assets/img/circle1.svg';
import circle2 from 'assets/img/circle2.svg';
import circle3 from 'assets/img/circle3.svg';
import circle4 from 'assets/img/circle4.svg';
import circle5 from 'assets/img/circle5.svg';
import circle6 from 'assets/img/circle6.svg';
import circle7 from 'assets/img/circle7.svg';
import circle8 from 'assets/img/circle8.svg';

// 비밀번호 정규식
export const regCheckPassword = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

// 이메일 정규식
export const regCheckEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,10}$/i;

// 특수문자 확인
export const checkSpecial = (str) => {
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  if (special_pattern.test(str) === true) {
    return true;
  } else {
    return false;
  }
};

// 대소문자 확인
export const checkLetter = (str) => {
  const special_pattern = /[a-zA-z]/gi;
  if (special_pattern.test(str) === true) {
    return true;
  } else {
    return false;
  }
};

// 임시
export const styleImgSwich = (index) => {
  switch (index) {
    case 0:
      return circle4;
    case 1:
      return circle5;
    case 2:
      return circle3;
    case 3:
      return circle2;
    case 4:
      return circle6;
    case 5:
      return circle7;
    case 6:
      return circle1;
    case 7:
      return circle8;
    default:
      break;
  }
};
