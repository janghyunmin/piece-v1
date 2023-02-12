import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="354" height="224" viewBox="0 0 354 224" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_175_328)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 28C8 16.9543 16.9543 8 28 8H326C337.046 8 346 16.9543 346 28V143.35C338.012 144.972 332 152.034 332 160.5C332 168.966 338.012 176.028 346 177.65V196C346 207.046 337.046 216 326 216H28C16.9543 216 8 207.046 8 196V177.65C15.9878 176.028 22 168.966 22 160.5C22 152.034 15.9878 144.972 8 143.35V28Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28 8C16.9543 8 8 16.9543 8 28V143.35C15.9878 144.972 22 152.034 22 160.5C22 161.005 21.9786 161.506 21.9366 162H332.063C332.021 161.506 332 161.005 332 160.5C332 152.034 338.012 144.972 346 143.35V28C346 16.9543 337.046 8 326 8H28Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 177.65V196C8 207.046 16.9543 216 28 216H326C337.046 216 346 207.046 346 196V177.65C338.489 176.125 332.725 169.79 332.063 162H21.9366C21.2753 169.79 15.5111 176.125 8 177.65Z" fill="#CBF4FA"/>
<defs>
<filter id="filter0_d_175_328" x="0" y="0" width="354" height="224" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_175_328"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_175_328" result="shape"/>
</filter>
</defs>
</svg>

`;

const CouponLayoutIcon = () => {
  return <SvgXml xml={xml} />;
};

export default CouponLayoutIcon;
