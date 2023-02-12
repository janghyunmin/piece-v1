import React from 'react';

import { Box, Button, Text } from 'native-base';

import { SignUpCompleteBottomProps } from 'interfaces/auth.type';

const BottomContainer = (props: SignUpCompleteBottomProps) => {
  const { handleNext, statusCode, isLoading } = props;

  return (
    <Box w="100%">
      {/*{!isLoading ? (*/}
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'10px'}
        >
          {statusCode === 'PUR0101' ? '확인을 누르면 내 지갑으로 이동해요' : '확인을 누르면 포트폴리오로 이동해요'}
        </Text>
      {/*) : (*/}
      {/*  <Box h={'26px'} />*/}
      {/*)}*/}
      <Button
        onPress={handleNext}
        w={'100%'}
        h={'48px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
        // isLoading={isLoading}
      >
        {/*{!isLoading && (*/}
          <Text color={'white'} size={'buttonM'}>
            확인
          </Text>
        {/*)}*/}
      </Button>
    </Box>
  );
};

export default BottomContainer;
