import React from 'react';

import { Flex, Text } from 'native-base';

const MoneyMoveTitle = (props: any) => {
  const { pageType } = props;

  return (
    <Flex direction={'row'}>
      <Text size={'titleL'}>
        {pageType ? '등록된 내 계좌' : '충전하실 금액'}
      </Text>
      <Text size={'textL'}>{pageType ? '로' : '을 입력해주세요.'}</Text>
    </Flex>
  );
};

export default MoneyMoveTitle;
