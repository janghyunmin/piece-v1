export const convertFaqCategory = (code: string) => {
  switch (code) {
    case 'BRT0301':
      return '결제';
    case 'BRT0302':
      return '환불/취소';
    case 'BRT0303':
      return '이용문의';
    case 'BRT0304':
      return '기타';
    default:
      return '전체';
  }
};
