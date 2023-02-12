import React from 'react';

import { Flex, Text } from 'native-base';
import { Image } from 'react-native';

const Intro = ({ width }: { width: number }) => {
  return (
    <>
      <Flex alignItems={'center'} mt={'74px'} mb={'10px'}>
        <Image
          style={{ width: 80, height: 20, marginBottom: 30 }}
          source={require('assets/images/logo.png')}
        />
        <Text size={'titleXL'} color={'white'} textAlign={'center'}>
          세상에서 가장 값진 한 조각{'\n'}
          조각투자의 표준 PIECE
        </Text>
      </Flex>
      <Flex alignItems={'center'} px={'14px'}>
        <Image
          style={{ width: (width-28), height: (width) * 1.126 }}
          source={require('assets/images/hello_lopping.gif')}
        />
      </Flex>
    </>
  );
};

export default Intro;
