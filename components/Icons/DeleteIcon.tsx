import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
<path d="M12.3965 38.2717L3.8335 24L12.3965 9.72825C12.5298 9.50614 12.7183 9.32232 12.9437 9.1947C13.1691 9.06708 13.4238 9 13.6828 9H41.3335C41.7313 9 42.1129 9.15804 42.3942 9.43934C42.6755 9.72064 42.8335 10.1022 42.8335 10.5V37.5C42.8335 37.8978 42.6755 38.2794 42.3942 38.5607C42.1129 38.842 41.7313 39 41.3335 39H13.6828C13.4238 39 13.1691 38.9329 12.9437 38.8053C12.7183 38.6777 12.5298 38.4939 12.3965 38.2717V38.2717Z" stroke="#4A4D55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.8335 19.5L21.8335 28.5" stroke="#4A4D55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.8335 28.5L21.8335 19.5" stroke="#4A4D55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DeleteIcon = () => {
  return <SvgXml xml={xml} />;
};

export default DeleteIcon;
