import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import ToggleBtn from 'components/ToggleBtn';

import { WithToggleProps } from 'interfaces/mypage.type';
import NextGrayIcon from 'components/Icons/NextGrayIcon';

const Section1 = (props: WithToggleProps) => {
  const { toggle, handleToggle, navigation, deviceBio } = props;
  console.log('deviceBio : ' + deviceBio);
  console.log('!!deviceBio : ' + !!deviceBio);
  return (
    <Box bgColor={'white'} mb={'10px'} px={'16px'}>
      <Text py={'20px'} size={'titleM'} color={'gray.800'}>
        정보 관리
      </Text>
      {!!deviceBio && (
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderTopColor={'gray.200'}
        >
          <Text py={'20px'} size={'textM'} color={'gray.800'}>
            생체인증 사용
          </Text>

          <ToggleBtn toggle={toggle} handleToggle={handleToggle} />
        </Flex>
      )}

      <Pressable onPress={() => navigation.navigate('changePw')}>
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderTopColor={'gray.200'}
        >
          <Text py={'20px'} size={'textM'} color={'gray.800'}>
            간편 비밀번호 변경
          </Text>
          {/* <Image
            style={{ width: 24, height: 24 }}
            source={require('assets/images/icons/next_gray.png')}
          /> */}
          <NextGrayIcon />
        </Flex>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('logout')}>
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderTopColor={'gray.200'}
        >
          <Text py={'20px'} size={'textM'} color={'gray.800'}>
            로그아웃
          </Text>
          {/* <Image
            style={{ width: 24, height: 24 }}
            source={require('assets/images/icons/next_gray.png')}
          /> */}
          <NextGrayIcon />
        </Flex>
      </Pressable>
    </Box>
  );
};

export default Section1;
