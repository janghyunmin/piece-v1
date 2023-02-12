import React from 'react';

import { Text } from 'native-base';
import { comma } from 'utils/comma';

const Notice = (props: any) => {
  const { status } = props;

  return (
    <Text
      size={'titleXL'}
      color={typeof status === 'string' ? 'gray.400' : 'black'}
      mb={'20px'}
    >
      {`${comma(status)}원을 출금 신청할게요`}
    </Text>
  );
};

export default Notice;
