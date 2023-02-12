import React from 'react';

import { Box, Button, Text } from 'native-base';

import { SignUpCompleteBottomProps } from 'interfaces/auth.type';

const BottomContainer = (props: SignUpCompleteBottomProps) => {
  const { handleNext, success } = props;

  return (
    <Box w="100%">
      <Button
        onPress={handleNext}
        w={'100%'}
        h={'48px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
      >
        <Text color={'white'} size={'buttonM'}>
          {success ? '확인' : '다시 충전하기'}
        </Text>
      </Button>
    </Box>
  );
};

export default BottomContainer;
