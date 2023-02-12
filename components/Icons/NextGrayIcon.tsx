import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M9 5L16.5 12.5L9 20" stroke="#8C919F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const NextGrayIcon = () => {
  return <SvgXml xml={xml} />;
};

export default NextGrayIcon;
