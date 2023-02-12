import React from 'react';

import { Center, Text } from 'native-base';

const NoHistory = () => {
  return (
    <Center flex={1}>
      <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
        예치금 입출금 내역이 없어요.{'\n'}
        지금 예치금을 충전할까요?
      </Text>
    </Center>
  );
};

export default NoHistory;
