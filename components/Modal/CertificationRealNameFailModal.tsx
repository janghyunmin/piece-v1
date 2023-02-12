import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

const CertificationRealNameFailModal = ({ navigation }: any) => {

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
          실명 인증에 실패했어요!
        </Text>
        <Text
          size={'captionM'}
          color={'warning.500'}
          textAlign={'center'}
          mb={'30px'}
        >
          주민등록번호를 정확하게 입력한 후 다시 시도해주세요.
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

export default CertificationRealNameFailModal;
