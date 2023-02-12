import React from 'react';

import { Box, Flex, Text } from 'native-base';
import { Image } from 'react-native';

const WithdrawalCompleteTop = () => {
  return (
    <Box w={'100%'}>
      {/* <Image /> */}
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/withdrawal_image.png')}
        />
      </Flex>

      <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
        그동안 피스를 이용해 주셔서{'\n'}
        감사합니다
      </Text>
      <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
        더 좋은 서비스로 찾아뵐게요.
      </Text>
    </Box>
  );
};

export default WithdrawalCompleteTop;
