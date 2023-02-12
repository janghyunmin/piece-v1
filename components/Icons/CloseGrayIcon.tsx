import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M5 5L14.4314 14.4314" stroke="#8C919F" stroke-width="2" stroke-linecap="round"/>
<path d="M14.4309 5L4.99952 14.4314" stroke="#8C919F" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const CloseGrayIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CloseGrayIcon;
