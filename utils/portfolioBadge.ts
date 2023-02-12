import { PortfolioStatus } from 'interfaces/home.type';

export default function portfolioBadgeColor(status: PortfolioStatus) {
  switch (status) {
    case 'PRS0101':
      return {
        bgColor: 'white',
        color: 'gray.700',
        text: '오픈예정',
      };
    case 'PRS0102':
      return {
        bgColor: 'white',
        color: 'primary.500',
        text: '판매 중',
      };
    case 'PRS0103':
      return {
        bgColor: 'primary.600',
        color: 'white',
        text: '조각완판',
      };
    case 'PRS0104':
      return {
        bgColor: 'white',
        color: 'gray.700',
        text: '매각대기',
      };
    case 'PRS0105':
      return {
        bgColor: 'white',
        color: 'gray.900',
        text: '매각진행',
      };
    case 'PRS0106':
      return {
        bgColor: 'white',
        color: 'secondary.500',
        text: '매각완료',
      };
    case 'PRS0107':
      return {
        bgColor: 'white',
        color: 'secondary.500',
        text: '정산중',
      };
    case 'PRS0108':
      return {
        bgColor: 'secondary.500',
        color: 'white',
        text: '분배완료',
      };
    case 'PRS0109':
      return {
        bgColor: 'white',
        color: 'warning.500',
        text: '일시중지',
      };
    case 'PRS0110':
      return {
        bgColor: 'gray.600',
        color: 'gray.800',
        text: '기한만료',
      };
    case 'PRS0111':
      return {
        bgColor: 'gray.600',
        color: 'gray.800',
        text: '수익분배',
      };

    default:
      return {
        bgColor: 'gray.500',
        color: 'gray.800',
        text: '',
      };
  }
}
