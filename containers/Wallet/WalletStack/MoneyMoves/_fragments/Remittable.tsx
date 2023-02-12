import React from 'react';

import { Flex, Pressable, Text } from 'native-base'
import { comma } from 'utils/comma';

const Remittable = (props: any) => {
  const { pageType, depositData, handleAllAmount } = props;

  return (
    <Flex alignSelf={'flex-start'}>
      <Pressable onPress={handleAllAmount}>
        <Flex
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'15px'}
          py={'5px'}
          bgColor={'gray.300'}
          borderRadius={'10px'}
        >
          <Text size={'textS'} color={'gray.700'}>
            {pageType ? `출금 가능 금액 ` : `현재 예치금 잔액 `}
          </Text>
          <Text size={'titleS'} color={'gray.700'}>
            {comma(depositData.depositBalance)}원
          </Text>
        </Flex>
      </Pressable>
    </Flex>
  );
};

export default Remittable;
