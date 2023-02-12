import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

import { RegisterCompleteBottomContinerProps } from 'interfaces/wallet.type';
import { Image } from 'react-native';

const BottomContainer = (props: RegisterCompleteBottomContinerProps) => {
  const { accountInfo, handleGoBack } = props;
  return (
    <Box w="100%" mb={'30px'} px={'16px'}>
      <Flex
        direction={'row'}
        alignItems={'center'}
        w={'100%'}
        py={'22px'}
        px={'19px'}
        mb={'20px'}
        bgColor={'gray.100'}
        borderRadius={'20px'}
      >
        <Image
          source={accountInfo.image}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Box>
          <Text size={'titleS'} color={'gray.700'}>
            나의 출금계좌
          </Text>
          <Text size={'textS'} color={'gray.700'}>
            {accountInfo.bankName} {accountInfo.bankAccount}
          </Text>
        </Box>
      </Flex>
      <Button
        onPress={() => handleGoBack()}
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
