import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';

import { updateMember, updateMemberFido } from 'apis/Member'
import Storage from '@react-native-async-storage/async-storage'
import { setIsFido } from 'features/authSlice'
import { authenticateAsync } from 'expo-local-authentication'
import { useDispatch } from 'react-redux'
import useDeviceBio from 'hooks/useDeviceBio'

const BioAuth = ({ navigation, route }: any) => {
  const { isFido } = route.params;
  const dispatch = useDispatch();
  const deviceBio = useDeviceBio();

  const handlePress = () => {
    if (isFido === 'Y') {
      updateMember({isFido: 'N'}).then((res) => {
        Storage.removeItem('@isFido').then(() => {
          dispatch(setIsFido('N'));
        });
      })
    } else {
      if (!deviceBio) {
        console.warn('바이오 불가');
        return;
      }

      authenticateAsync({
        promptMessage: '피스 생체인증'
      })
        .then((res) => {
          if (res.success) {
            updateMember({isFido: 'Y'}).then((res) => {
              Storage.setItem('@isFido', 'Y').then(() => {
                dispatch(setIsFido('Y'));
              });
            });
          }
        });
    }
    navigation.goBack();
  }

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
          {isFido === 'N' ? '생체인증 등록이 필요해요' : '생체인증 해제'}
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {isFido === 'N'
            ? '생체인증 등록을 진행해 주세요'
            : '생체인증을 사용하지 않도록 설정할까요?'}
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            bg={'#EAECF0'}
            colorScheme={'button_gray'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              {isFido === 'N' ? '뒤로' : '취소'}
            </Text>
          </Button>
          <Button
            flex={1}
            onPress={handlePress}
            h={'48px'}
            bgColor={'#10CFC9'}
            borderRadius={'10px'}
            colorScheme={isFido === 'N' ? 'primary' : 'warning'}
          >
            <Text size={'buttonM'} color={'white'}>
              {isFido === 'N' ? '등록' : '해제'}
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default BioAuth;
