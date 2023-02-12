import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M20.25 8H3.75C3.33579 8 3 8.33579 3 8.75V11.75C3 12.1642 3.33579 12.5 3.75 12.5H20.25C20.6642 12.5 21 12.1642 21 11.75V8.75C21 8.33579 20.6642 8 20.25 8Z" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.5 12.5V19.25C19.5 19.4489 19.421 19.6397 19.2803 19.7803C19.1397 19.921 18.9489 20 18.75 20H5.25C5.05109 20 4.86032 19.921 4.71967 19.7803C4.57902 19.6397 4.5 19.4489 4.5 19.25V12.5" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8V20" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.2426 6.93945C15.182 8.00011 12 8.00011 12 8.00011C12 8.00011 12 4.81813 13.0607 3.75747C13.4827 3.33591 14.0549 3.0992 14.6514 3.09937C15.2479 3.09954 15.8199 3.33657 16.2417 3.75837C16.6635 4.18017 16.9006 4.75221 16.9007 5.34873C16.9009 5.94524 16.6642 6.51741 16.2426 6.93945V6.93945Z" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.75771 6.93921C8.81837 7.99987 12.0004 7.99987 12.0004 7.99987C12.0004 7.99987 12.0004 4.81789 10.9397 3.75723C10.5177 3.33567 9.94548 3.09895 9.34897 3.09912C8.75245 3.09929 8.18042 3.33633 7.75862 3.75813C7.33682 4.17993 7.09978 4.75197 7.09961 5.34848C7.09944 5.945 7.33615 6.51717 7.75771 6.93921V6.93921Z" stroke="#8C919F" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const EventIcon = () => {
  return <SvgXml xml={xml} />;
};

export default EventIcon;
