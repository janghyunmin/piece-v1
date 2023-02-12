import React from 'react';

import { Box, Flex, Text } from 'native-base';
import { Image } from 'react-native'

const TopContainer = ({ isCreate }: any) => {
  return (
    <Box w={'100%'} px={'16px'}>
      {/* <Image /> */}
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/withdraw_complete_lopping.gif')}
        />
      </Flex>
      <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
        {isCreate ? '계좌 등록이 완료되었어요.' : '계좌 변경이 완료되었어요.'}
      </Text>
      <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
        이제 등록하신 계좌로 예치금을 출금할 수 있어요.
      </Text>
    </Box>
  );
};

export default TopContainer;
