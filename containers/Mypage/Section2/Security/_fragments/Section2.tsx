import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';
import NextGrayIcon from 'components/Icons/NextGrayIcon';

const Section2 = (props: { navigation: any }) => {
  const { navigation } = props;

  return (
    <Box bgColor={'white'} px={'16px'}>
      <Text py={'20px'} size={'titleM'} color={'gray.800'}>
        탈퇴
      </Text>
      <Pressable onPress={() => navigation.navigate('withdrawal')}>
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderTopColor={'gray.200'}
        >
          <Text py={'20px'} size={'textM'} color={'gray.800'}>
            회원 탈퇴
          </Text>
          <NextGrayIcon />
        </Flex>
      </Pressable>
    </Box>
  );
};

export default Section2;
