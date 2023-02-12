import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

const BankAccountCheckFailModal = ({ navigation }: any) => {

  return (
    <Flex
      position={'absolute'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      flex={1}
      w={'100%'}
      justifyContent={'center'}
      px={'16px'}
      zIndex={'999'}
    >
      <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
        <Text
          size={'titleL'}
          textAlign={'center'}
          mb={'10px'}
          color={'gray.800'}
        >
          계좌 확인에 실패했어요.
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          정보를 다시 확인해주세요.
        </Text>

        <Button
          onPress={() => navigation.goBack()}
          h={'48px'}
          borderRadius={'10px'}
          // colorScheme={'primary'}
          bgColor={'#10CFC9'}
        >
          <Text size={'buttonM'} color={'white'}>
            다시 시도하기
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default BankAccountCheckFailModal;
