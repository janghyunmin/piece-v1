import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import AgreementIcon from 'components/Icons/AgreementIcon';
import MypageAlarmIcon from 'components/Icons/MypageAlarmIcon';
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import SecurityIcon from 'components/Icons/SecurityIcon';

const Section2 = ({ navigation }: any) => {
  return (
    <Box px={'16px'} pt={'10px'} pb={'10px'} bgColor={'white'} mb={'10px'}>
      <Box py={'15px'}>
        <Box
          pb={'15px'}
          mb={'15px'}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
        >
          <Text size={'titleM'} color={'gray.800'}>
            설정
          </Text>
        </Box>

        <Pressable onPress={() => navigation.navigate('Security')} mb={'30px'}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <SecurityIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                인증 및 보안
              </Text>
            </Flex>
            <NextGrayIcon />
          </Flex>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('MyPageAlarm')}
          mb={'30px'}
        >
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <MypageAlarmIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                알림 설정
              </Text>
            </Flex>
            <NextGrayIcon />
          </Flex>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Policy')}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <AgreementIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                약관 및 개인정보 처리 등 동의
              </Text>
            </Flex>
            {/* <Image
              style={{ width: 24, height: 24 }}
              source={require('assets/images/icons/next_gray.png')}
            /> */}
            <NextGrayIcon />
          </Flex>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Section2;
