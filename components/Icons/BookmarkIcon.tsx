import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M9.38766 14.065C9.5582 13.9112 9.77968 13.8261 10.0093 13.8261C10.239 13.8261 10.4604 13.9112 10.631 14.065L15.3318 18.4458C15.373 18.4855 15.4245 18.5127 15.4805 18.5243C15.5364 18.5359 15.5945 18.5315 15.6481 18.5116C15.7017 18.4916 15.7485 18.457 15.7832 18.4116C15.8179 18.3662 15.8391 18.3119 15.8443 18.255V3.47328C15.8409 3.39737 15.8074 3.32596 15.7513 3.27471C15.6952 3.22346 15.6211 3.1966 15.5452 3.19999H4.47265C4.39688 3.19683 4.32295 3.22379 4.26704 3.27502C4.21112 3.32625 4.17778 3.39752 4.17432 3.47328V18.255C4.17951 18.3118 4.20063 18.366 4.23524 18.4114C4.26985 18.4567 4.31655 18.4914 4.36998 18.5114C4.42342 18.5314 4.48141 18.536 4.53731 18.5245C4.59321 18.513 4.64473 18.4861 4.68598 18.4466L9.38766 14.065Z" fill="white" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>
`;

const BookmarkIcon = () => {
  return <SvgXml xml={xml} />;
};

export default BookmarkIcon;