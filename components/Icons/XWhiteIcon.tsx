import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4.47595 4.47607L18.476 18.4761" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M18.476 4.47607L4.47595 18.4761" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const XWhiteIcon = () => {
  return <SvgXml xml={xml} />;
};

export default XWhiteIcon;
