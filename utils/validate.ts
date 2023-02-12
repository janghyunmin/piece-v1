// 한글
export function checkKor(str: string) {
  const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 영어
export function checkEng(str: string) {
  const regExp = /[a-zA-Z]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 숫자
export function checkNum(str: string) {
  const regExp = /[0-9]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 이메일
export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
