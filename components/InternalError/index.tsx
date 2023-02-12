import React from 'react';

import { Box, Button, Flex, Image, Text } from 'native-base';

import Layout from 'components/Layout';

const InternalError = ({ resetErrorBoundary }: any) => {

  return (
    <Layout>
      <Box h={'80px'} />
      <Flex
        flex={1}
        px={'16px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={'center'} pt={'120px'}>
          <Image
            source={require('assets/images/result_fail.png')}
            w={'150px'}
            h={'150px'}
            alt={'login_redirect'}
          />
          <Text size={'textXL'} textAlign={'center'} mb={'20px'}>
            알 수 없는 오류가{'\n'}
            발생했어요
          </Text>
          <Text size={'captionM'} color={'gray.600'} textAlign="center">
            잠시 후 다시 시도해주세요.
          </Text>
        </Flex>

        <Button
          borderRadius={'10px'}
          w={'100%'}
          h={'48px'}
          onPress={() => resetErrorBoundary()}
        >
          <Text size={'buttonM'} color={'white'}>
            확인
          </Text>
        </Button>
      </Flex>
    </Layout>
  );
};

export default InternalError;
