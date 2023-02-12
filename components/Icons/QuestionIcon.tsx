import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#8C919F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 17C12.5178 17 12.9375 16.5803 12.9375 16.0625C12.9375 15.5447 12.5178 15.125 12 15.125C11.4822 15.125 11.0625 15.5447 11.0625 16.0625C11.0625 16.5803 11.4822 17 12 17Z" fill="#8C919F"/>
<path d="M12 13.25V12.625C12.4326 12.625 12.8556 12.4967 13.2153 12.2563C13.575 12.016 13.8554 11.6743 14.021 11.2746C14.1866 10.8749 14.2299 10.4351 14.1455 10.0107C14.0611 9.58641 13.8527 9.19663 13.5468 8.89071C13.2409 8.58478 12.8511 8.37644 12.4268 8.29203C12.0024 8.20763 11.5626 8.25095 11.1629 8.41651C10.7632 8.58208 10.4215 8.86246 10.1812 9.22219C9.9408 9.58192 9.8125 10.0049 9.8125 10.4375" stroke="#8C919F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const QuestionIcon = () => {
  return <SvgXml xml={xml} />;
};

export default QuestionIcon;
