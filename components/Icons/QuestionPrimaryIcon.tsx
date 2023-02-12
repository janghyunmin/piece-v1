import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clip-path="url(#clip0_3475_64263)">
<path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#10CFC9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99976 14.6589C10.3292 14.6589 10.5962 14.3919 10.5962 14.0625C10.5962 13.7331 10.3292 13.4661 9.99976 13.4661C9.67036 13.4661 9.40332 13.7331 9.40332 14.0625C9.40332 14.3919 9.67036 14.6589 9.99976 14.6589Z" fill="#10CFC9"/>
<path d="M10 11.7428V10.6255C10.4326 10.6255 10.8556 10.4972 11.2153 10.2568C11.575 10.0165 11.8554 9.67482 12.021 9.27511C12.1866 8.8754 12.2299 8.43556 12.1455 8.01123C12.0611 7.5869 11.8527 7.19712 11.5468 6.89119C11.2409 6.58527 10.8511 6.37693 10.4268 6.29252C10.0024 6.20812 9.56259 6.25144 9.16288 6.417C8.76317 6.58257 8.42153 6.86295 8.18116 7.22268C7.9408 7.58241 7.8125 8.00534 7.8125 8.43799" stroke="#10CFC9" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3475_64263">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const QuestionPrimaryIcon = () => {
  return <SvgXml xml={xml} />;
};

export default QuestionPrimaryIcon;
