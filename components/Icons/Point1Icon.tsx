import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3539 27.7422H7.875V34.9986H13.3539V27.7422Z" fill="#D7E7FF"/>
<path d="M22.7289 22.0938H17.25V34.9995H22.7289V22.0938Z" fill="#4CDBEF"/>
<path d="M32.1273 16.4688H26.6484V34.9995H32.1273V16.4688Z" fill="#D7E7FF"/>
<path d="M30.8816 5.0974L22.7973 5C22.6025 5 22.4807 5.21915 22.6025 5.38961L23.7713 7.11849L8.16283 18.5C7.40797 19.0601 7.65126 20.4139 8.16262 21.2418C8.69833 22.094 10.1234 22.5357 11 22L26.596 11.2824L27.7648 13.0113C27.8865 13.1818 28.13 13.1574 28.2031 12.9626L31.1251 5.43831C31.1495 5.26786 31.0521 5.0974 30.8816 5.0974Z" fill="#252D70"/>
</svg>
`;

const Point1Icon = () => {
  return <SvgXml xml={xml} />;
};

export default Point1Icon;
