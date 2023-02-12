import React from 'react';

import { Box, Button, Text } from 'native-base';

import { SignUpCompleteBottomProps } from 'interfaces/auth.type';

const BottomContainer = (props: SignUpCompleteBottomProps) => {
  const { handleNext } = props;

  return (
    <Box w="100%">
      <Text
        size={'captionM'}
        color={'gray.600'}
        textAlign={'center'}
        mb={'10px'}
      >
        확인을 누르면 첫 화면으로 이동해요
      </Text>
      <Button
        onPress={handleNext}
        w={'100%'}
        h={'48px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
      >
        <Text color={'white'} size={'buttonM'}>
          확인
        </Text>
      </Button>
    </Box>
  );
};

export default BottomContainer;
