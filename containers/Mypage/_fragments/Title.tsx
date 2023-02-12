import React, { useEffect, useMemo, useState } from 'react'

import { Box, Flex, HStack, Pressable, Text } from 'native-base';

import RightWhiteIcon from 'components/Icons/RightWhiteIcon';

import { getMember } from 'apis/Member';
import useMemberQuery from 'hooks/useMemberQuery'

const Title = ({ navigation, memberData }: any) => {
  const day = useMemo(() => {
    if (memberData?.createdAt) {
      const today = +new Date();
      const time = +new Date(memberData.createdAt+'+09:00');
      return Math.ceil((today - time) / (1000 * 60 * 60 * 24));
    }
    return 1;
  }, [memberData?.createdAt])

  return (
    <Box bgColor={'white'}>
      <Flex
        px={'16px'}
        pb={'20px'}
        w={'100%'}
        h={'240px'}
        bgColor={'primary.500'}
        borderBottomLeftRadius={'20px'}
        borderBottomRightRadius={'20px'}
        justifyContent={'flex-end'}
      >
        <Pressable onPress={() => navigation.navigate('MyInfo')}>
          <HStack space={'5px'} mb={'34px'} alignItems={'center'}>
            <Text size={'titleXL'} color={'white'}>
              {memberData?.name} 님
            </Text>
            <RightWhiteIcon />
          </HStack>
        </Pressable>
        <Text size={'titleS'} color={'white'}>
          피스와 함께한 지
        </Text>
        <Text size={'display'} color={'white'}>
          {day}일
        </Text>
      </Flex>
    </Box>
  );
};

export default Title;
