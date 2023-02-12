import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';
import NextGrayIcon from 'components/Icons/NextGrayIcon';

const Withdrawal2Check = (props: { navigation: any }) => {
  const { navigation } = props;

  return (
    <>
      <Box px={'16px'} bgColor={'white'}>
        <Pressable onPress={() => navigation.navigate('OwnMoneyStack')}>
          <Flex
            borderBottomWidth={'1px'}
            borderBottomColor={'gray.200'}
            py={'20px'}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text>예치금 출금 신청하기</Text>
            <NextGrayIcon />
          </Flex>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('wallet')}>
          <Flex
            py={'20px'}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={'20px'}
          >
            <Text>소유 조각 보러 가기</Text>
            <NextGrayIcon />
          </Flex>
        </Pressable>
      </Box>

      <Box px={'14px'} bgColor={'white'}>
        <Text size={'captionM'} color={'warning.500'}>
          예치금이나 소유 조각이 남아 있는 경우 회원 탈퇴를 처리할 수 없어요.{'\n'}
          고객센터(
          <Text underline={true} color={'gray.600'}>
            help@buysellstandards.com
          </Text>
          )에 알려 주세요.
        </Text>
      </Box>
    </>
  );
};

export default Withdrawal2Check;
