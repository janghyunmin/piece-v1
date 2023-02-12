import React from 'react';

import { Flex, Text } from 'native-base';
import { comma } from 'utils/comma';

const Remittable = (props: any) => {
  const { type, depositData, status } = props;

  return (
    <Flex alignSelf={'flex-start'} mb={'38px'}>
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
          {type ? `출금 후 예치금 잔액${' '}` : `입금 후 예치금 잔액${' '}`}
        </Text>
        <Text size={'titleS'} color={'gray.700'}>
          {type
            ? comma(depositData.depositBalance - status)
            : comma(depositData.depositBalance + status)}
          원
        </Text>
      </Flex>
    </Flex>
  );
};

export default Remittable;
