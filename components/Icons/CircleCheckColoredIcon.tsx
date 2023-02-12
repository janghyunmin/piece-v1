import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
<path d="M29.0002 14.4C29.0002 6.4471 22.5531 0 14.6002 0C6.64729 0 0.200195 6.4471 0.200195 14.4C0.200195 22.3529 6.64729 28.8 14.6002 28.8C22.5531 28.8 29.0002 22.3529 29.0002 14.4Z" fill="#10CFC9"/>
<path d="M7.86816 14.1029L13.0774 19.1584L20.5989 10.3396" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CircleCheckColoredIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CircleCheckColoredIcon;
