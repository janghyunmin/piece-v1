import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19.209 16.6372C18.5913 16.2932 17.8707 16.1822 17.1782 16.3244C16.4856 16.4667 15.8671 16.8526 15.435 17.4122L8.32397 13.4922C8.48427 13.0339 8.53062 12.5436 8.45901 12.0634C8.38741 11.5832 8.2 11.1277 7.91298 10.7362L15.581 6.3922C16.0583 6.99434 16.7446 7.39493 17.5037 7.51444C18.2627 7.63394 19.0389 7.4636 19.6782 7.03725C20.3174 6.6109 20.7729 5.95973 20.9543 5.21304C21.1356 4.46636 21.0295 3.67878 20.657 3.00673C20.2845 2.33468 19.6728 1.82731 18.9435 1.58537C18.2142 1.34344 17.4206 1.38465 16.7203 1.70081C16.0199 2.01696 15.4641 2.58495 15.1632 3.29196C14.8623 3.99898 14.8383 4.79331 15.096 5.5172L7.14998 10.0172C7.08098 9.9722 7.02098 9.91719 6.94998 9.87819C6.44903 9.59326 5.87681 9.45808 5.30131 9.48871C4.72581 9.51933 4.17119 9.71447 3.7033 10.051C3.23542 10.3875 2.87393 10.8512 2.66177 11.387C2.44961 11.9228 2.39569 12.5083 2.50641 13.0739C2.61712 13.6395 2.88782 14.1614 3.28637 14.5777C3.68492 14.994 4.19458 15.2872 4.7548 15.4224C5.31503 15.5576 5.9023 15.5292 6.44687 15.3406C6.99144 15.152 7.47044 14.811 7.82698 14.3582L14.938 18.2782C14.7492 18.8185 14.719 19.4015 14.8508 19.9584C14.9826 20.5153 15.2709 21.0229 15.6817 21.4213C16.0926 21.8197 16.6088 22.0922 17.1696 22.2068C17.7303 22.3214 18.312 22.2732 18.8462 22.0679C19.3805 21.8626 19.8448 21.5088 20.1845 21.0483C20.5242 20.5877 20.7251 20.0395 20.7634 19.4685C20.8017 18.8975 20.676 18.3275 20.4009 17.8256C20.1258 17.3238 19.7129 16.911 19.211 16.6362L19.209 16.6372ZM16.154 3.53719C16.3449 3.19077 16.6343 2.90875 16.9856 2.72681C17.3368 2.54486 17.7341 2.47116 18.1272 2.51502C18.5203 2.55887 18.8916 2.71832 19.1941 2.97319C19.4967 3.22806 19.7168 3.56692 19.8267 3.9469C19.9366 4.32688 19.9314 4.73093 19.8117 5.10794C19.692 5.48496 19.4632 5.818 19.1542 6.06497C18.8452 6.31194 18.4699 6.46174 18.0758 6.49542C17.6816 6.5291 17.2864 6.44516 16.94 6.2542C16.7097 6.12741 16.5067 5.95646 16.3425 5.75115C16.1784 5.54583 16.0563 5.31016 15.9833 5.05763C15.9103 4.8051 15.8878 4.54065 15.9171 4.27942C15.9464 4.01819 16.0269 3.76529 16.154 3.53519V3.53719ZM5.49698 14.5092C5.05852 14.5087 4.63238 14.3642 4.28412 14.0978C3.93585 13.8314 3.68477 13.458 3.56952 13.0349C3.45426 12.6119 3.48121 12.1627 3.64622 11.7565C3.81123 11.3503 4.10517 11.0095 4.48278 10.7867C4.8604 10.5639 5.30076 10.4713 5.73613 10.5233C6.17149 10.5752 6.57773 10.7688 6.89232 11.0742C7.2069 11.3796 7.41241 11.78 7.47722 12.2136C7.54202 12.6472 7.46253 13.0902 7.25097 13.4742C7.07785 13.7876 6.82376 14.0488 6.51522 14.2305C6.20669 14.4122 5.85504 14.5078 5.49698 14.5072V14.5092ZM19.512 20.2322C19.321 20.5786 19.0316 20.8606 18.6804 21.0426C18.3292 21.2245 17.9318 21.2982 17.5387 21.2544C17.1456 21.2105 16.7743 21.0511 16.4718 20.7962C16.1693 20.5413 15.9492 20.2025 15.8392 19.8225C15.7293 19.4425 15.7345 19.0385 15.8542 18.6614C15.9739 18.2844 16.2028 17.9514 16.5118 17.7044C16.8208 17.4574 17.196 17.3076 17.5902 17.274C17.9843 17.2403 18.3795 17.3242 18.726 17.5152C19.19 17.7713 19.5333 18.201 19.6807 18.7101C19.8281 19.2191 19.7674 19.7659 19.512 20.2302V20.2322Z" fill="white" stroke="white" stroke-width="0.5"/>
</svg>
`;

const ShareIcon = () => {
  return <SvgXml xml={xml} />;
};

export default ShareIcon;
