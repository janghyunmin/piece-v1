import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
<path d="M28.1006 14.4C28.1006 6.94416 22.0564 0.900002 14.6006 0.900002C7.14474 0.900002 1.10059 6.94416 1.10059 14.4C1.10059 21.8558 7.14474 27.9 14.6006 27.9C22.0564 27.9 28.1006 21.8558 28.1006 14.4Z" stroke="#B8BCC8" stroke-width="1.8"/>
<path d="M7.86816 14.1029L13.0774 19.1584L20.5989 10.3396" stroke="#B8BCC8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CircleCheckIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CircleCheckIcon;
