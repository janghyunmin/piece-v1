import { comma } from 'utils/comma'


export const convertPrice = (price: number) => {
  const unitWords = ['', '만', '억'];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (price % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = `${String(comma(resultArray[i]))}${unitWords[i]} ${resultString}`;
  }
  if (resultString.endsWith(' ')) resultString = resultString.slice(0, -1);
  return resultString ? resultString : '0';
};
