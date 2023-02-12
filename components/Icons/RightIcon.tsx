import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M8.5 18.8779L15.523 11.9297L8.5 5.5" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const RightIcon = () => {
  return <SvgXml xml={xml} />;
};

export default RightIcon;
