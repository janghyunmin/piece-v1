import React from 'react';

import { Box, List, Text } from 'native-base';
import { Text as RnText } from 'react-native';

const PortfolioInnerDescText2 = () => {
  return (
    <Box pb={'40px'} w={'100%'}>
      <Text size={'textM'} color={'gray.700'}>
        포트폴리오의 현재 자산 가치와 운용 기간 이후의 실현 가치 및 시세
        상승률을 평가해 SS/S 2단계로 분류한 피스의 등급 체계입니다.{'\n'}PIECE
        종합등급은 자산 평가의 3가지 기준인 안정성, 환금성, 수익성을 종합적으로
        분석해 부여합니다.{'\n'}
      </Text>

      <Text size={'titleM'} color={'gray.700'}>
        {'\u2022'}
        {'  '}안정성 - 상품 가치에 대한 담보력
      </Text>
      <Text size={'titleM'} color={'gray.700'}>
        {'\u2022'}
        {'  '}환금성 - 부실 발생 시 매각 가능성 또는 회수력
      </Text>
      <Text size={'titleM'} color={'gray.700'}>
        {'\u2022'}
        {'  '}수익성 - 예상 시세 상승률
      </Text>
    </Box>
  );
};

export default PortfolioInnerDescText2;
