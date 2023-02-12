import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';

const HaveNoInfo = ({ navigation, route }: any) => {
  const { type } = route.params;
  const nextPage = () => {
    if (type === 'post') {
      navigation.navigate('ownDeed', {
        ...route.params,
        next: {
          route: 'searchAddress',
          params: {
            ...route.params,
            from: 'ownDeed',
          },
        },
      });
    } else {
      navigation.navigate('ownDeed', {
        ...route.params,
        next: {
          route: 'UpdateEmailModal',
          params: {
            ...route.params,
            isEmail: false,
            from: 'ownDeed',
          },
        },
      });
    }
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
          {type === 'post' ? '등록된 주소가 없어요': '등록된 이메일이 없어요'}
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {type === 'post' ? '소유 증서를 받을 주소를 등록해 주세요.': '소유 증서를 받을 이메일을 등록해 주세요.'}
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
              뒤로
            </Text>
          </Button>
          <Button
            onPress={nextPage}
            flex={1}
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              {type === 'post' ? '주소 등록' : '이메일 등록'}
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default HaveNoInfo;
