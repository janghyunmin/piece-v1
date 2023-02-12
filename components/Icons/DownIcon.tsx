import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
<path d="M16 1.25L8.5 8.75L1 1.25" stroke="#292A2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DownIcon = () => {
  return <SvgXml xml={xml} />;
};

export default DownIcon;
