export default function bankColorChange(bankName: string) {
  switch (bankName) {
    case '004':
      return {
        color: '#776C61',
        name: 'KB국민은행',
        icon: require('assets/images/bank1.png'),
      };
    case '026':
      return {
        color: '#0079C1',
        name: '신한은행',
        icon: require('assets/images/bank2.png'),
      };
    case '005':
      return {
        color: '#008375',
        name: '하나은행',
        icon: require('assets/images/bank3.png'),
      };
    case '039':
      return {
        color: '#D81920',
        name: '경남은행',
        icon: require('assets/images/bank4.png'),
      };
    case '034':
      return {
        color: '#1A3282',
        name: '광주은행',
        icon: require('assets/images/bank5.png'),
      };
    case '031':
      return {
        color: '#007DC5',
        name: '대구은행',
        icon: require('assets/images/bank6.png'),
      };
    case '032':
      return {
        color: '#D81920',
        name: '부산은행',
        icon: require('assets/images/bank7.png'),
      };
    case '007':
      return {
        color: '#016EBD',
        name: '수협은행',
        icon: require('assets/images/bank8.png'),
      };
    case '020':
      return {
        color: '#1898D6',
        name: '우리은행',
        icon: require('assets/images/bank9.png'),
      };
    case '037':
      return {
        color: '#1A3282',
        name: '전북은행',
        icon: require('assets/images/bank10.png'),
      };
    case '035':
      return {
        color: '#0079C1',
        name: '제주은행',
        icon: require('assets/images/bank11.png'),
      };
    case '090':
      return {
        color: '#FFE300',
        name: '카카오뱅크',
        icon: require('assets/images/bank12.png'),
      };
    case '089':
      return {
        color: '#DD5471',
        name: '케이뱅크',
        icon: require('assets/images/bank13.png'),
      };
    case '092':
      return {
        color: '#0064FF',
        name: '토스뱅크',
        icon: require('assets/images/bank14.png'),
      };
    case '027':
      return {
        color: '#003B70',
        name: '씨티은행',
        icon: require('assets/images/bank15.png'),
      };
    case '003':
      return {
        color: '#145BA9',
        name: 'IBK기업은행',
        icon: require('assets/images/bank16.png'),
      };
    case '002':
      return {
        color: '#084088',
        name: 'KDB산업은행',
        icon: require('assets/images/bank17.png'),
      };
    case '011':
      return {
        color: '#1FB25A',
        name: 'NH농협은행',
        icon: require('assets/images/bank18.png'),
      };
    case '023':
      return {
        color: '#0473EA',
        name: 'SC제일은행',
        icon: require('assets/images/bank19.png'),
      };
    case '071':
      return {
        color: '#EE2722',
        name: '우체국은행',
        icon: require('assets/images/bank20.png'),
      };
    case '외환':
      return {
        color: '#DC1B4A',
        name: '외환은행',
        icon: require('assets/images/bank21.png'),
      };
    case '047':
      return {
        color: '#295CB3',
        name: '신협은행',
        icon: require('assets/images/bank22.png'),
      };
    case '064':
      return {
        color: '#42B191',
        name: '산림조합은행',
        icon: require('assets/images/bank23.png'),
      };
    case '045':
      return {
        color: '#31B6E8',
        name: '새마을은행',
        icon: require('assets/images/bank24.png'),
      };

    default:
      return {
        color: 'white',
        name: '',
        icon: require('assets/images/bank1.png'),
      };
  }
}
