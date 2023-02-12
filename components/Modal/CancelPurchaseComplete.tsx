import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';

const CancelPurchaseComplete = ({ navigation, route }: any) => {
  const { purchaseData } = route.params;

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
          구매 취소 완료
        </Text>
        <Text
          size={'textS'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {purchaseData.title}{'\n'}
          {purchaseData.purchasePieceVolume} PIECE가 구매 취소되었어요.
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              확인
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CancelPurchaseComplete;
