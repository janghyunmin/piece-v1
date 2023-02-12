import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4.25895 17.0939C3.14076 15.2089 2.74916 12.9805 3.15768 10.8272C3.56621 8.6739 4.74675 6.7438 6.47764 5.39933C8.20853 4.05486 10.3707 3.3885 12.5581 3.52539C14.7455 3.66227 16.8078 4.59298 18.3575 6.14274C19.9073 7.69251 20.838 9.75472 20.9749 11.9421C21.1118 14.1296 20.4455 16.2917 19.101 18.0226C17.7565 19.7535 15.8264 20.9341 13.6732 21.3426C11.5199 21.7511 9.29149 21.3596 7.40649 20.2414L7.40651 20.2413L4.29808 21.1294C4.16947 21.1662 4.03338 21.1678 3.90391 21.1343C3.77443 21.1007 3.65628 21.0332 3.5617 20.9386C3.46713 20.844 3.39956 20.7259 3.36601 20.5964C3.33246 20.4669 3.33415 20.3308 3.37089 20.2022L4.25901 17.0938L4.25895 17.0939Z" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 13.4375C12.5178 13.4375 12.9375 13.0178 12.9375 12.5C12.9375 11.9822 12.5178 11.5625 12 11.5625C11.4822 11.5625 11.0625 11.9822 11.0625 12.5C11.0625 13.0178 11.4822 13.4375 12 13.4375Z" fill="#8C919F"/>
<path d="M16.5 13.4375C17.0178 13.4375 17.4375 13.0178 17.4375 12.5C17.4375 11.9822 17.0178 11.5625 16.5 11.5625C15.9822 11.5625 15.5625 11.9822 15.5625 12.5C15.5625 13.0178 15.9822 13.4375 16.5 13.4375Z" fill="#8C919F"/>
<path d="M7.5 13.4375C8.01777 13.4375 8.4375 13.0178 8.4375 12.5C8.4375 11.9822 8.01777 11.5625 7.5 11.5625C6.98223 11.5625 6.5625 11.9822 6.5625 12.5C6.5625 13.0178 6.98223 13.4375 7.5 13.4375Z" fill="#8C919F"/>
</svg>
`;

const FaqIcon = () => {
  return <SvgXml xml={xml} />;
};

export default FaqIcon;