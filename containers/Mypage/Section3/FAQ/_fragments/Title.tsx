import React from 'react';

import { Box, Text } from 'native-base';
import { Image } from 'react-native';

import GoBack from 'components/GoBack';

const Title = (props: { navigation: any }) => {
  const { navigation } = props;

  return (
    <>
      <Box mb={'24px'} position={'relative'} pt={'20px'} px={'16px'}>
        <Text size={'titleXL'} mb={'10px'} color={'gray.800'}>
          무엇을{'\n'}도와드릴까요?
        </Text>
        <Text size={'textS'} color={'gray.600'}>
          챗봇 상담을 이용하기 전에{'\n'}
          원하는 답변을 더 빠르게 찾을 수 있어요
        </Text>

        <Box position={'absolute'} right={0}>
          <Image
            style={{ width: 140, height: 140 }}
            source={require('assets/images/FAQ.png')}
          />
        </Box>
      </Box>
    </>
  );
};

export default Title;
