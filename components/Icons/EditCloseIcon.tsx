import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="9" r="9" fill="#B8BCC8"/>
<path d="M12.8572 5.14286L5.14289 12.8571" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8572 12.8571L5.14289 5.14286" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const EditCloseIcon = () => {
  return <SvgXml xml={xml} />;
};

export default EditCloseIcon;
