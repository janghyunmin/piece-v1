import React from 'react';

import { Center, Flex, Text } from 'native-base'
import { Image } from 'react-native'

const Texts = (props: { name: string; }) => {
  const { name } = props;

  return (
    <Center flex={1}>
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/hello_lopping.gif')}
        />
      </Flex>
      <Text textAlign={'center'} size={'textXL'} mb={'10px'}>
        회원정보가 확인되었어요!
      </Text>
      <Text size={'textS'} textAlign={'center'} color={'gray.600'}>
        이미 기존 회원이시네요!
      </Text>
    </Center>
  );
};

export default Texts;
