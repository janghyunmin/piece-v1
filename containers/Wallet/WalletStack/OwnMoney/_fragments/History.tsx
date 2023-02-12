import React, { useEffect } from 'react';

import { Box, Flex, Text, VStack } from 'native-base';

import NoHistory from './NoHistory';
import HistoryLeft from './HistoryLeft';
import HistoryRight from './HistoryRight';

import { HistoryType } from 'interfaces/wallet.type';

const History = (props: { data: HistoryType[] }) => {
  const { data } = props;

  return (
    <Box px={'16px'} height={'100%'}>
      {data?.length > 0 ? (
        <VStack space={'30px'} height={'100%'}>
          {data?.map((item: any, index: number) => (
            <Flex
              key={index}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <HistoryLeft data={item} />
              <HistoryRight data={item} />
            </Flex>
          ))}
        </VStack>
      ) : (
        <NoHistory />
      )}
    </Box>
  );
};

export default History;
