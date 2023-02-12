import React from 'react';

import { Box, Text } from 'native-base';
import { Text as RnText } from 'react-native';

const PortfolioInnerDescText1 = () => {
  return (
    <Box pb={'40px'} w={'100%'}>
      <Text size={'textM'} color={'gray.700'}>
        조각 판매 후 해당 자산을 매각해 조각 구매자에게 발생한 차익을
        조각 수에 비례하여 분배하기까지 걸리는 기간입니다.{'\n'}
        운용 기간은 포트폴리오에 따라 미리 정해져 있습니다.{'\n'}
        단, 해당 자산의 매각 상황에 따라 예정보다 빨리 분배되거나 운용 기간이
        연장될 수 있습니다.{'\n'}
      </Text>
    </Box>
  );
};

export default PortfolioInnerDescText1;
