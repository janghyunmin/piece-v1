import React from 'react'
import Agreement1 from 'components/Modal/VirtualBank/_fragments/Agreement1'
import Agreement2 from 'components/Modal/VirtualBank/_fragments/Agreement2'
import Agreement3 from 'components/Modal/VirtualBank/_fragments/Agreement3'
import Agreement4 from 'components/Modal/VirtualBank/_fragments/Agreement4'
import HTMLView from 'react-native-htmlview'


const VirtualBankAgreementBody = ({ consentCode }: any) => {
  switch (consentCode) {
    case '1':
      return <Agreement1 />;
    case '2':
      return <Agreement2 />;
    case '3':
      return <Agreement3 />;
    case '4':
      return <Agreement4 />;
    // case '1':
    //   return <HTMLView value={require('assets/html/agreement1.html')} addLineBreaks={false} />;
    // case '2':
    //   return <HTMLView value={require('assets/html/agreement2.html')} addLineBreaks={false} />;
    // case '3':
    //   return <HTMLView value={require('assets/html/agreement3.html')} addLineBreaks={false} />;
    // case '4':
    //   return <HTMLView value={require('assets/html/agreement4.html')} addLineBreaks={false} />;
    default:
      return <></>;
  }
}

export default VirtualBankAgreementBody;
