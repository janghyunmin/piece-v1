import React from 'react';

import { Center, Flex, Text } from 'native-base'
import { Image } from 'react-native'
import usePreventBackButton from 'hooks/usePreventBackButton';

const Texts = (props: { name: string, isWeb: boolean; }) => {
  const { name, isWeb } = props;
  return (
    <Center flex={1}>
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/hello_lopping.gif')}
        />
      </Flex>
      <Text textAlign={'center'} size={'textXL'} mb={'10px'}>
        {isWeb ? `다시 만나 기뻐요, ${name} 님` : `어서오세요, ${name} 님`}
      </Text>
      <Text size={'textS'} textAlign={'center'} color={'gray.600'}>
        {isWeb ? '기존 계정이 확인되었어요' : '피스에 오신 걸 환영해요!'}{'\n'}
        이어서 본인 확인을 진행할게요.
      </Text>
    </Center>
  );
};

export default Texts;
