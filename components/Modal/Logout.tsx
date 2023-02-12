import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { useQueryClient } from 'react-query'
import Storage from '@react-native-async-storage/async-storage'
import { initAuth, setAuth, setIsFido } from 'features/authSlice';
import { useDispatch } from "react-redux";

const Logout = ({ navigation }: any) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleLogout = async () => {
     queryClient.invalidateQueries();
    // Storage.setItem('@isLogin', 'false');
    // navigation.reset({routes: [{name: 'login', params: { unFido: true }}]});

    // bskr_jhm 0530 Logout 기능 추가
    await Storage.removeItem('@auth');
    await Storage.removeItem('@isFido');
    dispatch(setIsFido('N'));
    dispatch(initAuth());
    navigation.reset({routes: [{ name: 'Start', params: { isLogout: true } }]});
  };

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
          로그아웃
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          일부 메뉴는 이용하지 못할 수도 있어요.{'\n'}
          그래도 로그아웃할까요?
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            bgColor={'#EAECF0'}
            // colorScheme={'button_gray'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              취소
            </Text>
          </Button>
          <Button
            flex={1}
            onPress={handleLogout}
            h={'48px'}
            borderRadius={'10px'}
            bgColor={'#10CFC9'}
            // colorScheme={'primary'}
          >
            <Text size={'buttonM'} color={'white'}>
              로그아웃
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Logout;
