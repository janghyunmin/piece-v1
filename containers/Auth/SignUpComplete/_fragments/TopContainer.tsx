import React from 'react'

import { Box, Flex, Text } from 'native-base';
import { Image } from 'react-native';

import { useRootState } from 'hooks/useRootState';


const TopContainer = () => {
  const { form: { name } } = useRootState((state) => state.certificationForm);

  return (
    <Box w={'100%'}>
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('assets/images/join_complete_looping.gif')}
        />
      </Flex>

      <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
        반가워요, {name} 님
      </Text>
      <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
        이제 {name} 님만의 조각을 만나 보세요.
      </Text>
    </Box>
  );
};

export default TopContainer;
