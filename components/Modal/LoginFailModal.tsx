import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';

import { updateMemberFido } from 'apis/Member';

const LoginFailModal = ({ navigation }: any) => {
  const handleResetPassword = () => {
    navigation.goBack();
    navigation.navigate('StackNavigation', {
      screen: 'auth',
      params: {
        screen: 'certification',
        params: { kind: 'RESET_PASSWORD' },
      }
    });
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
          비밀번호가 틀렸어요
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          비밀번호를 잊으셨나요?
        </Text>

        <HStack space={'10px'}>
          <Button
            onPress={() => {
              navigation.goBack()
            }}
            bgColor={'#E6F9FA'}
            colorScheme={'button_primary_light'}
            borderRadius={'10px'}
            flex={1}
            h={'48px'}
          >
            <Text color={'primary.500'} size={'buttonM'}>
              닫기
            </Text>
          </Button>
          <Button
            flex={1}
            onPress={() => handleResetPassword()}
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              재설정
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default LoginFailModal;
