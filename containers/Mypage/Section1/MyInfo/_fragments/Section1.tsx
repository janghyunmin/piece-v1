import React, { useMemo } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base';

const Section1 = (props: { memberData: any; navigation: any }) => {
  const { memberData, navigation } = props;

  const phone = useMemo(() => {
    if (memberData?.cellPhoneNo) {
      return memberData.cellPhoneNo.replace(/[^0-9]/, '')
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }
    return '';
  }, [memberData?.cellPhoneNo]);

  return (
    <Box bgColor={'white'} px={'16px'} py={'15px'} mb={'10px'}>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Text size={'titleM'} color={'gray.800'}>
          본인 확인 정보
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('auth', {
              screen: 'certification',
              params: { kind: 'REAUTH' },
            });
          }}
        >
          <Text size={'activeM'} color={'primary.500'}>
            재인증
          </Text>
        </Pressable>
      </Flex>

      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Text size={'textM'} color={'gray.600'}>
          이름
        </Text>
        <Text size={'titleM'} color={'gray.800'}>
          {memberData?.name}
        </Text>
      </Flex>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Text size={'textM'} color={'gray.600'}>
          생년월일
        </Text>
        <Text size={'titleM'} color={'gray.800'}>
          {memberData?.birthDay.replace(/-/g, '.')}
        </Text>
      </Flex>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text size={'textM'} color={'gray.600'}>
          휴대폰 번호
        </Text>
        <Text size={'titleM'} color={'gray.800'}>
          {phone}
        </Text>
      </Flex>
    </Box>
  );
};

export default Section1;
