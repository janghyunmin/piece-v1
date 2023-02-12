import React from 'react';

import { Center, Flex, Text } from 'native-base'
import { Image } from 'react-native'

const Texts = () => {
  return (
    <Center flex={1}>
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/fail.png')}
        />
      </Flex>
      <Text textAlign={'center'} size={'textXL'} mb={'10px'}>
        탈퇴한 회원이시네요
      </Text>
      <Text size={'textS'} textAlign={'center'} color={'gray.600'}>
        아직 90일이 경과되지 않아서 가입이 불가능해요.
      </Text>
    </Center>
  );
};

export default Texts;
