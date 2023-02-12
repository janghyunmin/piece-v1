import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4.47607 4.47601L18.4761 18.476" stroke="#131313" stroke-width="2" stroke-linecap="round"/>
<path d="M18.4761 4.47601L4.47607 18.476" stroke="#131313" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const CloseIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CloseIcon;
