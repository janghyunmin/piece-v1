export const convertTime = (time: number) => {
  let timeStr = []

  const days = Math.floor(time/86400);
  time -= 86400*days;
  const hours = Math.floor(time/3600);
  time -= 3600*hours;
  const minutes = Math.floor(time/60);
  time -= 60*minutes;
  const seconds = time;

  if (days) timeStr.push(`${days}일`);
  if (hours) timeStr.push(`${hours}시간`);

  if (days) return timeStr.join(' ');  // days 가 있을 경우 hours 까지 출력

  if (minutes) timeStr.push(`${minutes}분`);

  if (hours) return timeStr.join(' ');  // hours 가 있을 경우 minutes 까지 출력

  if (seconds) timeStr.push(`${time}초`);

  return timeStr.join(' ');
}