import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M18.3636 9.75H5.63636C5.28491 9.75 5 10.0858 5 10.5V21C5 21.4142 5.28491 21.75 5.63636 21.75H18.3636C18.7151 21.75 19 21.4142 19 21V10.5C19 10.0858 18.7151 9.75 18.3636 9.75Z" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 9.5V6C8 5.07174 8.42143 4.1815 9.17157 3.52513C9.92172 2.86875 10.9391 2.5 12 2.5C13.0609 2.5 14.0783 2.86875 14.8284 3.52513C15.5786 4.1815 16 5.07174 16 6V9.5" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const SecurityIcon = () => {
  return <SvgXml xml={xml} />;
};

export default SecurityIcon;
