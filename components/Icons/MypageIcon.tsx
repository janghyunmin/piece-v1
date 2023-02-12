import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17.6 11.7C17.6 13.1912 18.8088 14.4 20.3 14.4C21.7912 14.4 23 13.1912 23 11.7C23 10.2088 21.7912 9 20.3 9C18.8088 9 17.6 10.2088 17.6 11.7Z" fill="#DADCE3"/>
<path d="M9.4335 11.7C9.4335 13.1912 10.6423 14.4 12.1335 14.4C13.6247 14.4 14.8335 13.1912 14.8335 11.7C14.8335 10.2088 13.6247 9 12.1335 9C10.6423 9 9.4335 10.2088 9.4335 11.7Z" fill="#DADCE3"/>
<path d="M1.26699 11.7C1.26699 13.1912 2.47582 14.4 3.96699 14.4C5.45816 14.4 6.66699 13.1912 6.66699 11.7C6.66699 10.2088 5.45816 9 3.96699 9C2.47582 9 1.26699 10.2088 1.26699 11.7Z" fill="#DADCE3"/>
</svg>
`;

const FaqIcon = () => {
  return <SvgXml xml={xml} />;
};

export default FaqIcon;
