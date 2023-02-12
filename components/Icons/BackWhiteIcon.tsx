import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.52299 18.8779L1.5 11.9297L8.52299 5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

const BackWhiteIcon = () => {
  return <SvgXml xml={xml} />;
};

export default BackWhiteIcon;
