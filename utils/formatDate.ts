import { Alert } from 'react-native';


export const formatDate = (d: any) => {
  let date = null;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d + 'Z');
  const diffTimezone = 540 + date.getTimezoneOffset();
  if (diffTimezone) {
    date = new Date(+date + date.getTimezoneOffset()*60*1000);
  }
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${year}.${`0${monthIndex}`.slice(-2)}.${`0${day}`.slice(-2)}`;
};

export function formatDateOpenPortfolio(d: any) {
  let date;
  if (d instanceof Date) {
    date = d;
  }
  date = new Date(d + 'Z');
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth() + 1;

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const days = date.getUTCDay();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${`0${monthIndex}`.slice(-2)}.${`0${day}`.slice(-2)}(${week[days]}) ${hours}:${minutes}`;
}
