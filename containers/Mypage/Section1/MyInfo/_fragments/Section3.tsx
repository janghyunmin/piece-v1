import { Box, Flex, Pressable, Text } from 'native-base';
import React from 'react';

const Section3 = (props: { navigation: any; memberData: any; }) => {
  const { navigation, memberData } = props;

  return (
    <Box bgColor={'white'} px={'16px'} py={'20px'}>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Text size={'titleM'} color={'gray.800'}>
          등록된 이메일
        </Text>
        <Pressable
          onPress={() => navigation.navigate('UpdateEmailModal', { isEmail: !!memberData?.email, from: 'MyInfo' })}
        >
          <Text size={'activeM'} color={'primary.500'}>
            {!memberData?.email ? '이메일 등록' : '이메일 변경'}
          </Text>
        </Pressable>
      </Flex>

      <Flex direction={'row'} alignItems={'flex-start'}>
        <Flex alignItems={!memberData?.email ? 'center' : 'flex-end'} flex={1}>
          <Text
            size={'titleM'}
            color={!memberData?.email ? 'gray.500' : 'gray.800'}
          >
            {!memberData?.email ? '등록된 이메일이 없어요' : memberData?.email}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Section3;
