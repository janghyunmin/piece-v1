import React from 'react';

import { Box, Flex, Text } from 'native-base';

import { BankAccountCompleteTopContainerProps } from 'interfaces/wallet.type';

const TopContainer = (props: BankAccountCompleteTopContainerProps) => {
  const { accountChecked } = props;
  return (
    <Box w={'100%'}>
      {/* <Image /> */}
      <Flex w={'100%'} alignItems={'center'} mb={'40px'}>
        <Box w={'160px'} h={'160px'} bgColor={'black'}/>
      </Flex>
      <Text size={'titleXL'} textAlign={'center'} mb={'10px'}>
        {accountChecked ? '계좌가 확인되었어요' : '계좌 확인에 실패했어요'}
      </Text>
      <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
        {accountChecked
          ? '계좌를 등록하고 피스를 더욱 편리하게 이용해보세요'
          : '특정 사유로 계좌 확인을 실패했을 시'}
      </Text>
    </Box>
  );
};

export default TopContainer;
