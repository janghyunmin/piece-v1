import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { cancelPurchase } from 'apis/Purchase'
import { useMutation, useQueryClient } from 'react-query'

const CancelPurchase = ({ navigation, route }: any) => {
  const { purchaseData } = route.params;
  const queryClient = useQueryClient();

  const handleCancel = () => {
    navigation.navigate('CancelPassword', { item: purchaseData })
    // mutation.mutate({
    //   portfolioId: purchaseData.portfolioId,
    //   purchaseId: purchaseData.purchaseId,
    // });
  }

  const mutation = useMutation(
    (body: {portfolioId: string, purchaseId: string}) => cancelPurchase(body),
    {
      onSuccess: () => {
        navigation.navigate('OwnPiece', { item: purchaseData, isCanceled: true });
        queryClient.invalidateQueries(['Account']);
        queryClient.invalidateQueries(['Deposit']);
        queryClient.invalidateQueries(['Purchases', 'PUS0102']);
      },
      onError: (err: any) => console.warn(err?.respones?.data),
    }
  )

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
          구매 취소
        </Text>
        <Text
          size={'textS'}
          color={'warning.500'}
          textAlign={'center'}
          mb={'30px'}
        >
          정말로 구매를 취소할까요?
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            colorScheme={'button_gray'}
            isDisabled={mutation.isLoading}
            bgColor={'#EAECF0'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              아니요
            </Text>
          </Button>
          <Button
            flex={1}
            onPress={handleCancel}
            h={'48px'}
            borderRadius={'10px'}
            colorScheme={'warning'}
            isDisabled={mutation.isLoading}
          >
            <Text size={'buttonM'} color={'white'}>
              구매 취소
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CancelPurchase;
