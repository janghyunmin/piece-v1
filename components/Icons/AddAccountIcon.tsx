import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
<circle cx="25.5" cy="25" r="19.5" fill="#E6F9FA" stroke="#10CFC9"/>
<path d="M25.5 16V34" stroke="#10CFC9" stroke-width="2" stroke-linecap="round"/>
<path d="M34.5 25H16.5" stroke="#10CFC9" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const AddAccountIcon = () => {
  return <SvgXml xml={xml} />;
};

export default AddAccountIcon;
