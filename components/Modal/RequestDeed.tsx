import React from 'react';

import { Box, Button, Flex, Text } from 'native-base';

const RequestDeed = ({ navigation, route }: any) => {
  const { type } = route.params;

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
          {type === 'post' ? '우편 신청 완료' : '이메일 신청 완료'}
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          {type === 'post'
            ? '소유 증서를 우편으로 보내 드릴게요.\n받으실 때까지 최대 1주일이 걸릴 수 있어요.'
            : '소유 증서를 이메일로 보내 드릴게요.\n최대 1~5분의 시간이 소요될 수 있어요.'}
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

export default RequestDeed;
