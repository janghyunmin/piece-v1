import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { Linking, Platform } from 'react-native';

const UnableToWithdraw = ({ navigation }: any) => {
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
          탈퇴 불가
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          예치금이나 조각이 남아있는 경우 탈퇴가 불가능해요
        </Text>

        <HStack space={'10px'}>
          <Button
            flex={1}
            onPress={() => navigation.goBack()}
            h={'48px'}
            borderRadius={'10px'}
            colorScheme={'button_gray'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              탈퇴 취소
            </Text>
          </Button>

          <Button
            flex={1}
            onPress={() => {
              let kakaoLink = Platform.OS === 'ios' ? 'kakaoplus://plusfriend/chat/_XLxjmK' : 'https://pf.kakao.com/_XLxjmK/chat'
              Linking.openURL(kakaoLink)
                .catch((_) => {
                  navigation.navigate('KakaoFailModal');
                })
            }}
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              카카오톡 상담하기
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default UnableToWithdraw;
