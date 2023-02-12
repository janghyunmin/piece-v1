import React from 'react';

import { Box, Button, Text } from 'native-base';

import { RegisterBankAccountFooterBtnProps } from 'interfaces/wallet.type';

const FooterBtn = (props: RegisterBankAccountFooterBtnProps) => {
  const { registerUserAccount, formFilled, isCreate, isLoading } = props;
  return (
    <Box
      bottom={'0'}
      left={'0'}
      right={'0'}
      px={'16px'}
      mt={'20px'}
      bgColor={'white'}
    >
      <Button
        isDisabled={!formFilled || isLoading}
        onPress={registerUserAccount}
        w={'100%'}
        h={'50px'}
        borderRadius={'10px'}
        // colorScheme="primary"
        bgColor={'#10CFC9'}
      >
        <Text color="white" size={'buttonM'}>
          {isCreate ? '계좌 등록' : '계좌 변경'}
        </Text>
      </Button>
    </Box>
  );
};

export default FooterBtn;
