import React, { useMemo } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base';

import { MyInfoSection2Props } from 'interfaces/mypage.type';

const Section2 = (props: any) => {
  const { navigation, memberData } = props;

  return (
    <Box bgColor={'white'} px={'16px'} py={'20px'} mb={'10px'}>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Text size={'titleM'} color={'gray.800'}>
          등록된 주소
        </Text>
        <Pressable onPress={() => navigation.navigate('searchAddress', { from: 'MyInfo' })}>
          <Text size={'activeM'} color={'primary.500'}>
            {!memberData?.baseAddress ? '주소 등록' : '주소 변경'}
          </Text>
        </Pressable>
      </Flex>

      <Flex direction={'row'} alignItems={'flex-start'}>
        <Flex alignItems={!memberData?.baseAddress ? 'center' : 'flex-end'} flex={1}>
          <Text
            size={'titleM'}
            color={!memberData?.baseAddress ? 'gray.500' : 'gray.800'}
          >
            {!memberData?.baseAddress ? '등록된 주소가 없어요' : memberData?.baseAddress}
          </Text>
          {memberData?.baseAddress && memberData?.detailAddress && (
            <Text size={'textM'} color={'gray.800'}>
              {memberData?.detailAddress}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Section2;
