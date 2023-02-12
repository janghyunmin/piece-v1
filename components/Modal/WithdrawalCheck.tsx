import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { withdrawalMember } from 'apis/Member'
import { useMutation, useQueryClient } from 'react-query'
import { RequestWithdrawalType } from 'apis/SMS/sms.type'
import Storage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { initAuth, setIsFido } from 'features/authSlice';

const WithdrawalCheck = ({ navigation, route }: any) => {
  const {
    withdrawalReasonCode,
    withdrawalReasonText,
  } = route.params;
  const dispatch = useDispatch();

  const handleWithdrawal = () => {
    let body;
    if (withdrawalReasonText) {
      body = {
        withdrawalReasonCode,
        withdrawalReasonText,
      }
    } else {
      body = {
        withdrawalReasonCode,
      }
    }
    mutation.mutate(body);
  }

  const mutation = useMutation(
    (body: RequestWithdrawalType) => withdrawalMember(body),
    {
      onSuccess: (res) => {
        Storage.removeItem('@auth');
        Storage.removeItem('@isFido');
        Storage.setItem('@isLogin', 'false');
        dispatch(initAuth());
        dispatch(setIsFido('N'));
        navigation.navigate('withdrawalComplete');
      },
      onError: (err: any) => console.log(err?.response?.data),
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
          정말로 탈퇴하시겠습니까?
        </Text>
        <Text
          size={'captionM'}
          color={'warning.500'}
          textAlign={'center'}
          mb={'30px'}
        >
          회원 탈퇴 시 90일 간 재가입이 불가능해요.
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            isDisabled={mutation.isLoading}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            colorScheme={'button_gray'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              취소
            </Text>
          </Button>
          <Button
            flex={1}
            isDisabled={mutation.isLoading}
            onPress={handleWithdrawal}
            h={'48px'}
            borderRadius={'10px'}
            colorScheme={'warning'}
          >
            <Text size={'buttonM'} color={'white'}>
              탈퇴
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default WithdrawalCheck;
