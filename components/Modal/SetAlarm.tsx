import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';

import { Box, Button, Flex, HStack, Text } from 'native-base';

const SetAlarm = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  }, []);

  return (
    <Flex
      position={'absolute'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      flex={1}
      w={'100%'}
      justifyContent={'center'}
      px={'38px'}
      zIndex={'999'}
    >
      <Flex
        alignItems={'center'}
        bgColor={'white'}
        borderRadius={'10px'}
        py={'30px'}
        px={'25.5px'}
      >
        <Text size={'titleM'} textAlign={'center'} color={'primary.500'}>
          알림 신청이 완료되었어요
        </Text>

        <LottieView
          style={{ width: 100, height: 100 }}
          source={require('assets/lottie/message_alarm.json')}
          autoPlay
          loop={false}
        />

        <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
          포트폴리오가 오픈되면 등록하신 번호로 가장 먼저 알려 드려요!
        </Text>
      </Flex>
    </Flex>
  );
};

export default SetAlarm;
