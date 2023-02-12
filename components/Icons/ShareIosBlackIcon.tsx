import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M8.0625 5.4375L12 1.5L15.9375 5.4375" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12V1.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 9H18.75C18.9489 9 19.1397 9.07902 19.2803 9.21967C19.421 9.36032 19.5 9.55109 19.5 9.75V19.5C19.5 19.6989 19.421 19.8897 19.2803 20.0303C19.1397 20.171 18.9489 20.25 18.75 20.25H5.25C5.05109 20.25 4.86032 20.171 4.71967 20.0303C4.57902 19.8897 4.5 19.6989 4.5 19.5V9.75C4.5 9.55109 4.57902 9.36032 4.71967 9.21967C4.86032 9.07902 5.05109 9 5.25 9H7.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const ShareBlackIosIcon = () => {
  return <SvgXml xml={xml} />;
};

export default ShareBlackIosIcon;
