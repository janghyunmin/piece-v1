import React from 'react';

import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.3125 7.03125C29.4688 7.5625 28 9 27.4688 10.875C27.4375 11 27.2812 11 27.25 10.875C26.7187 9.03125 25.2812 7.5625 23.4062 7.03125C23.2812 7 23.2812 6.84375 23.4062 6.8125C25.25 6.28125 26.7187 4.84375 27.25 2.96875C27.2812 2.84375 27.4375 2.84375 27.4688 2.96875C28 4.8125 29.4375 6.28125 31.3125 6.8125C31.4375 6.84375 31.4375 7 31.3125 7.03125ZM9 32.875C7.15625 33.4062 5.6875 34.8438 5.15625 36.7188C5.125 36.8438 4.96875 36.8438 4.9375 36.7188C4.40625 34.875 2.96875 33.4062 1.09375 32.875C0.96875 32.8438 0.96875 32.6875 1.09375 32.6562C2.9375 32.125 4.40625 30.6875 4.9375 28.8125C4.96875 28.6875 5.125 28.6875 5.15625 28.8125C5.6875 30.6562 7.125 32.125 9 32.6562C9.125 32.6875 9.125 32.8438 9 32.875Z" fill="#4CDBEF"/>
<path d="M11.375 26.1875C10.875 26.1875 10.4063 25.9063 10.1563 25.4688C9.5 24.375 6.28125 19.6563 5.3125 18.5V24.875C5.3125 25.5938 4.71875 26.1875 4 26.1875C3.28125 26.1875 2.6875 25.5938 2.6875 24.875V15.9688C2.6875 15.125 3.375 14.4688 4.1875 14.4688C4.625 14.4688 5 14.6563 5.28125 14.9688C5.53125 15.2188 9.71875 20.7813 10.125 21.4063V15.7813C10.125 15.0625 10.7188 14.4688 11.4375 14.4688C12.1562 14.4688 12.75 15.0625 12.75 15.7813V24.7812C12.7812 25.5625 12.1562 26.1875 11.375 26.1875ZM15.4688 25.5V15.1563C15.4688 14.7813 15.7813 14.4688 16.1563 14.4688H22.2812C22.9062 14.4688 23.375 14.9688 23.375 15.5625C23.375 16.1875 22.875 16.6562 22.2812 16.6562H18.125V18.9688H21.7188C22.3125 18.9688 22.8125 19.4688 22.8125 20.0625C22.8125 20.6563 22.3125 21.1563 21.7188 21.1563H18.125V23.9688H22.6875C23.3125 23.9688 23.7812 24.4688 23.7812 25.0625C23.7812 25.6875 23.2812 26.1562 22.6875 26.1562H16.1563C15.7813 26.1875 15.4688 25.875 15.4688 25.5ZM32.5 15.7188C33.1562 15.7188 33.75 16.1563 33.9375 16.7813C33.9688 16.9375 34.0312 17.0938 34.0625 17.2812C34.2187 17.875 34.4062 18.4688 34.5938 19.0938C34.7812 19.7188 34.9687 20.3438 35.1562 20.9688C35.3438 21.5938 35.5312 22.1563 35.7188 22.6875C35.875 22.125 36.0312 21.5 36.1562 20.8125C36.3125 20.125 36.4688 19.4375 36.5938 18.7188C36.7188 18 36.875 17.2813 37 16.5625C37.0625 16.2188 37.125 15.9063 37.1875 15.5938C37.3125 14.9688 37.8438 14.5 38.5 14.5C39.3438 14.5 39.9688 15.2813 39.7812 16.0938C39.4688 17.5313 39.125 19 38.75 20.4688C38.3438 22.0625 37.9062 23.5938 37.4375 25.0313C37.2188 25.7188 36.5625 26.2188 35.8438 26.2188C35.125 26.2188 34.5 25.7812 34.25 25.0938C34 24.3438 33.75 23.5938 33.5 22.8125C33.125 21.625 32.75 20.4375 32.4062 19.25C32.0312 20.4375 31.6875 21.625 31.3125 22.8125C31.0625 23.5938 30.8437 24.3438 30.5625 25.0938C30.3438 25.7812 29.6875 26.2188 28.9688 26.2188C28.25 26.2188 27.5938 25.75 27.375 25.0313C26.9062 23.5625 26.5 22.0312 26.0937 20.4688C25.7187 19.0313 25.375 17.5938 25.0625 16.1875C24.875 15.3125 25.5312 14.5 26.4062 14.5C27.0625 14.5 27.6562 14.9688 27.75 15.625C27.8125 15.9375 27.875 16.25 27.9375 16.5625C28.0625 17.2813 28.2188 18 28.375 18.7188C28.5312 19.4375 28.6875 20.125 28.8125 20.8125C28.9688 21.5 29.125 22.125 29.2812 22.6875C29.5 22.125 29.6875 21.5625 29.875 20.9375C30.0625 20.3125 30.25 19.6875 30.4375 19.0625C30.625 18.4375 30.7812 17.8438 30.9375 17.2812C30.9687 17.125 31.0312 16.9688 31.0625 16.8438C31.2187 16.1563 31.8125 15.7188 32.5 15.7188Z" fill="#252D70"/>
<path d="M34.8438 30.8125C33.5625 31.1563 32.5938 32.1563 32.2188 33.4375C32.1875 33.5 32.0938 33.5 32.0625 33.4375C31.7188 32.1563 30.7188 31.1875 29.4375 30.8125C29.375 30.7813 29.375 30.6875 29.4375 30.6563C30.7188 30.3125 31.6875 29.3125 32.0625 28.0312C32.0938 27.9688 32.1875 27.9688 32.2188 28.0312C32.5625 29.3125 33.5625 30.2813 34.8438 30.6563C34.9063 30.6875 34.9063 30.8125 34.8438 30.8125Z" fill="#A1ECF6"/>
<path d="M6.8125 10.5938C7.15625 9.34375 8.15625 8.34375 9.4375 8C9.5 7.96875 9.5 7.875 9.4375 7.8125C8.15625 7.4375 7.15625 6.46875 6.8125 5.1875C6.78125 5.125 6.6875 5.125 6.65625 5.1875C6.28125 6.46875 5.3125 7.46875 4.03125 7.8125C3.96875 7.84375 3.96875 7.9375 4.03125 7.96875C5.3125 8.34375 6.3125 9.3125 6.65625 10.5938C6.6875 10.6562 6.78125 10.6562 6.8125 10.5938Z" fill="#D7E7FF"/>
</svg>
`;

const Point2Icon = () => {
  return <SvgXml xml={xml} />;
};

export default Point2Icon;
