import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M4.5 15.5L12 8L19.5 15.5" stroke="#B8BCC8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const UpGrayIcon = () => {
  return <SvgXml xml={xml} />;
};

export default UpGrayIcon;
