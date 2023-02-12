import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M6.39014 12.2513L10.7311 16.4642L16.9991 9.11523" stroke="#B8BCC8" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CheckIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CheckIcon;
