import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { useMutation } from 'react-query'
import { sendPurchaseDocument } from 'apis/Purchase'

const HaveInfo = ({ navigation, route }: any) => {
  const { type, memberId, purchaseData } = route.params;
  const nextPage = () => {
    mutation.mutate({
      memberId,
      purchaseId: purchaseData.purchaseId,
      sendMethod: type,
    })
  };

  const mutation = useMutation(
    (body: any) => sendPurchaseDocument(body),
    {
      onSuccess: (res) => {
        navigation.navigate('ownDeed', {
          purchaseData,
          next: {
            route: 'requestDeed',
            params: { type },
          },
        });
      },
      onError: (err) => {
        navigation.navigate('ownDeed', {
          purchaseData,
          next: {
            route: 'requestDeedFail',
            params: { type },
          },
        });
      }
    }
  );

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
          {type === 'post'
            ? '소유 증서 우편으로 받기'
            : '소유 증서 이메일로 받기'}
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {type === 'post'
            ? '등록된 주소로 소유증서를 직접 받아보실 수 있어요'
            : '등록된 이메일로 소유증서를 직접 받아보실 수 있어요'}
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            isDisabled={mutation.isLoading}
            h={'48px'}
            borderRadius={'10px'}
            bgColor={'#EAECF0'}
            colorScheme={'button_gray'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              뒤로
            </Text>
          </Button>
          <Button
            onPress={nextPage}
            isDisabled={mutation.isLoading}
            flex={1}
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              {type === 'post' ? '우편으로 받기' : '이메일로 받기'}
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default HaveInfo;
