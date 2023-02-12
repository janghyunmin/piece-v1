import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M12 15.5C15.3137 15.5 18 12.8137 18 9.5C18 6.18629 15.3137 3.5 12 3.5C8.68629 3.5 6 6.18629 6 9.5C6 12.8137 8.68629 15.5 12 15.5Z" stroke="#8C919F" stroke-miterlimit="10"/>
<path d="M2.90625 20.7501C3.82775 19.1537 5.15328 17.828 6.74958 16.9062C8.34588 15.9845 10.1567 15.4993 12 15.4993C13.8433 15.4993 15.6541 15.9845 17.2504 16.9062C18.8467 17.828 20.1722 19.1537 21.0938 20.7501" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const UserIcon = () => {
  return <SvgXml xml={xml} />;
};

export default UserIcon;
