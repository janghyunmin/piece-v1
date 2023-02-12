import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

const CertificationRealNameCompleteModal = ({ navigation, route }: any) => {
  const { amount } = route.params;

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
          실명 인증 완료
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          이제부터 간편하게 이용하세요.
        </Text>

        <Button
          onPress={() => {
            navigation.goBack();
            navigation.navigate('CertificationRealName', { amount: amount });
          }}
          h={'48px'}
          borderRadius={'10px'}
          // colorScheme={'primary'}
          bgColor={'#10CFC9'}
        >
          <Text size={'buttonM'} color={'white'}>
            확인
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default CertificationRealNameCompleteModal;
