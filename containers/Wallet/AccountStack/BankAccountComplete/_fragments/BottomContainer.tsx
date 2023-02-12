import React from 'react';

import { Box, Button, Text } from 'native-base';

import { BankAccountCompleteBottomContainerProps } from 'interfaces/wallet.type';

const BottomContainer = (props: BankAccountCompleteBottomContainerProps) => {
  const { accountChecked, handleGoBack } = props;

  return (
    <Box w="100%" mb={'30px'}>
      <Text
        size={'captionM'}
        color={'gray.600'}
        textAlign={'center'}
        mb={'10px'}
      >
        {accountChecked
          ? '확인을 누르시면 사용하실 계좌가 등록돼요'
          : '확인을 누르면 내 지갑으로 이동해요'}
      </Text>
      <Button
        onPress={handleGoBack}
        w={'100%'}
        h={'48px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
      >
        <Text color={'white'} size={'buttonM'}>
          {accountChecked ? '계좌 등록' : '확인'}
        </Text>
      </Button>
    </Box>
  );
};

export default BottomContainer;
