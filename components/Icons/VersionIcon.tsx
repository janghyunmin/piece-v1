import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<g clip-path="url(#clip0_3329_59527)">
<path d="M12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5Z" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.25 11.75H12.0001L12 17H12.75" stroke="#8C919F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.8125 9.3125C12.3303 9.3125 12.75 8.89277 12.75 8.375C12.75 7.85723 12.3303 7.4375 11.8125 7.4375C11.2947 7.4375 10.875 7.85723 10.875 8.375C10.875 8.89277 11.2947 9.3125 11.8125 9.3125Z" fill="#8C919F"/>
</g>
<defs>
<clipPath id="clip0_3329_59527">
<rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`;

const VersionIcon = () => {
  return <SvgXml xml={xml} />;
};

export default VersionIcon;
