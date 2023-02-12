const balance_1 = require('assets/images/balance_1.png');
const balance_2 = require('assets/images/balance_2.png');
const balance_3 = require('assets/images/balance_3.png');
const balance_4 = require('assets/images/balance_4.png');
const balance_5 = require('assets/images/balance_5.png');
const balance_6 = require('assets/images/balance_6.png');
const balance_7 = require('assets/images/balance_7.png');
const balance_8 = require('assets/images/balance_8.png');
const balance_9 = require('assets/images/balance_9.png');
const balance_10 = require('assets/images/balance_10.png');

export const convertCode = (code: string) => {
  switch (code) {
    case 'MDR0101':
      return {
        title: '예치금 입금',
        image: balance_1,
      };

    case 'MDR0306':
      return {
        title: '예치금 출금 완료',
        image: balance_2,
      };

    case 'MDR0103':
      return {
        title: '분배금 입금',
        image: balance_3,
      };

    case 'MDR0105':
      return {
        title: '분배금 입금',
        image: balance_3,
      };

    case 'MDR0104':
      return {
        title: '분배 수수료',
        image: balance_7,
      };

    case 'MDR0201':
      return {
        title: '조각 구매',
        image: balance_6,
      };

    case 'MDR0202':
      return {
        title: '구매 취소',
        image: balance_4,
      };

    case 'MDR0203':
      return {
        title: '조각 판매',
        image: balance_5,
      };

    case 'MDR0204':
      return {
        title: '부가가치세 지불',
        image: balance_9,
      };

    case 'MDR0205':
      return {
        title: '부가가치세 환불',
        image: balance_8,
      };

    case 'MDR0301':
      return {
        title: '예치금 출금 신청',
        image: balance_10,
      };

    default:
      return {
        title: '',
        image: 0,
      };
  }
};
