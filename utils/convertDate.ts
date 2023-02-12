export const convertDate = (date: number) => {
  const divided = date / 86400000;
  if (divided < 365) return `${parseInt(String(divided))}일`;
  if (divided >= 365) return `${Math.floor(divided / 365)}년`;
};
