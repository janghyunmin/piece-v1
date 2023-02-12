import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

const ConfirmEmailModal = ({ navigation, route }: any) => {
  const { isEmail } = route.params;
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
          {!isEmail ? '이메일 등록 완료' : '이메일 변경 완료'}
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {!isEmail ? '이메일이 성공적으로 등록되었어요' : '이메일이 성공적으로 등록되었어요'}
        </Text>

        <Button
          onPress={() => navigation.goBack()}
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

export default ConfirmEmailModal;
