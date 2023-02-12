import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M9 14.75H15" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 11.75H15" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0002 4.25H18.75C18.9489 4.25 19.1397 4.32902 19.2803 4.46967C19.421 4.61032 19.5 4.80109 19.5 5V20.75C19.5 20.9489 19.421 21.1397 19.2803 21.2803C19.1397 21.421 18.9489 21.5 18.75 21.5H5.25C5.05109 21.5 4.86032 21.421 4.71967 21.2803C4.57902 21.1397 4.5 20.9489 4.5 20.75V5C4.5 4.80109 4.57902 4.61032 4.71967 4.46967C4.86032 4.32902 5.05109 4.25 5.25 4.25H8.9998" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 7.25V6.5C8.25 5.50544 8.64509 4.55161 9.34835 3.84835C10.0516 3.14509 11.0054 2.75 12 2.75C12.9946 2.75 13.9484 3.14509 14.6517 3.84835C15.3549 4.55161 15.75 5.50544 15.75 6.5V7.25H8.25Z" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const AgreementIcon = () => {
  return <SvgXml xml={xml} />;
};

export default AgreementIcon;
