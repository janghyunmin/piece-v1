import React from 'react';

import { Box, Text } from 'native-base';

import { comma } from 'utils/comma';

const HistoryRight = (props: any) => {
  const { data } = props;

  return (
    <Box flex={1}>
      <Text
        size={'titleM'}
        color={
          data.changeReason === 'MDR0101' ||
          data.changeReason === 'MDR0202' ||
          data.changeReason === 'MDR0103' ||
          data.changeReason === 'MDR0205'
            ? 'primary.500'
            : data.changeReason === 'MDR0301'
              ? 'gray.600'
              : 'black'
        }
        textAlign={'right'}
      >
        {comma(data.changeAmount)}원
      </Text>
      {!!data.remainAmount && (
        <Text size={'captionM'} color={'gray.700'} textAlign={'right'}>
          {comma(data.remainAmount)}원
        </Text>
      )}
    </Box>
  );
};

export default HistoryRight;
