import React from 'react';

import { Text } from 'native-base';

import { comma } from 'utils/comma';

const Status = (props: any) => {
  const { status, type } = props;

  return (
    <Text
      size={'titleXL'}
      color={!status ? 'gray.400' : 'black'}
      mb={'8px'}
    >
      {!!status ? (
        `${comma(status)}원`
      ) : (
        type === 'send' ? '얼마를 신청할까요?' : '얼마를 충전할까요?'
      )}
    </Text>
  );
};

export default Status;
