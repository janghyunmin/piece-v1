import React from 'react';

import { Box, Button, Text } from 'native-base';

const WithdrawalCompleteBottom = (props: { navigation: any }) => {
  const { navigation } = props;

  return (
    <Box w="100%" mb={'30px'}>
      <Button
        onPress={() => navigation.reset({routes: [{name: 'Start'}]})}
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

export default WithdrawalCompleteBottom;
