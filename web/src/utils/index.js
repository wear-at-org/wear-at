// 비밀번호 정규식
export const regCheckPassword = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

// 이메일 정규식
export const regCheckEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,10}$/i;

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
export const isMobile = () => {
  const UserAgent = navigator.userAgent;

  if (
    UserAgent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
    ) != null ||
    UserAgent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return false;
  } else {
    return true;
  }
};
