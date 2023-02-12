import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M4.47803 7.01807L7.89001 10.5131L11.423 7.01807" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DownSmIcon = () => {
  return <SvgXml xml={xml} />;
};

export default DownSmIcon;
