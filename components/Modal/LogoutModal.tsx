import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';

// bskr_jhm 0607 로그아웃 기능 변경 완료

const LogoutModal = ({ navigation, route }: any) => {
  // console.log('route params1 : ' + route.params?.isDeviceLogout)
  // console.log('route params2 : ' + route.params?.isTokenLogout)
  // console.log('route params3 : ' + route.params?.isLogout)
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
          {/* {route.params?.isTokenLogout
              ? '네트워크가 불안정해요.'
              : '새로운 기기 로그인'
           } */}
          {route.params?.isLogout ?
            '로그아웃 알림' :
            (route.params?.isTokenLogout
              ? '네트워크가 불안정해요.'
              : '새로운 기기 로그인'
            )
          }

        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {/* {route.params?.isTokenLogout
            ? '보안을 위해 로그아웃 되었어요.'
            : '혹시, 고객님이 로그인 하셨나요?'
          } */}
          {route.params?.isLogout ?
            '로그아웃 되었어요.' :
            (route.params?.isTokenLogout
              ? '보안을 위해 로그아웃 되었어요.'
              : '혹시, 고객님이 로그인 하셨나요?'
            )
          }

        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.navigate('Start')}
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

export default LogoutModal;
