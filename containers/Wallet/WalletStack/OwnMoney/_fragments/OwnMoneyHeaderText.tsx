import React from 'react';

import { Text } from 'native-base';
import { comma } from 'utils/comma';

const OwnMoneyHeaderText = (props: any) => {
  const { data } = props;
  return (
    <>
      <Text size={'textS'} color={'gray.700'} mb={'5px'}>
        출금 가능 금액
      </Text>
      <Text size={'titleXL'} mb={'20px'}>
        {comma(data.depositBalance)} 원
      </Text>
    </>
  );
};

export default OwnMoneyHeaderText;
