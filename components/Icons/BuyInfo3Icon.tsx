import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6542 12.9657C17.7295 10.9024 15.009 10.0918 13.9428 11.8599L3.33416 29.4522C2.65879 30.5721 3.22239 32.0283 4.47578 32.4017L9.40534 33.8705L14.3349 35.3392C15.5883 35.7126 16.8569 34.8024 16.9046 33.4954L17.6542 12.9657Z" fill="#10CFC9"/>
<path d="M19.9883 25.111C19.9129 27.1744 22.6334 27.9849 23.6996 26.2168L34.3083 8.62456C34.9836 7.5046 34.42 6.04845 33.1667 5.67502L28.2371 4.20629L23.3075 2.73756C22.0541 2.36412 20.7855 3.27436 20.7378 4.58132L19.9883 25.111Z" fill="#21B5B5"/>
</svg>
`;

type SvgProps = {
  width?: number;
  height?: number;
}

const BuyInfo3Icon = ({ width = 40, height = 40 }: SvgProps) => {
  return <SvgXml xml={xml} width={width} height={height} />;
};

export default BuyInfo3Icon;
