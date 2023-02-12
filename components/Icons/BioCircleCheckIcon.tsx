import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.75 12C23.75 5.7868 18.7132 0.75 12.5 0.75C6.2868 0.75 1.25 5.7868 1.25 12C1.25 18.2132 6.2868 23.25 12.5 23.25C18.7132 23.25 23.75 18.2132 23.75 12Z" stroke="#B8BCC8" stroke-width="1.5"/>
<path d="M6.88965 11.7523L11.2307 15.9652L17.4986 8.61621" stroke="#B8BCC8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const BioFaceIDIcon = () => {
  return <SvgXml xml={xml} />;
};

export default BioFaceIDIcon;
