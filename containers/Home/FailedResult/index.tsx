import React from 'react';

import { Box, Button, Flex, Text } from 'native-base'

import Layout from 'components/Layout';
import { Image } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import usePreventBackButton from 'hooks/usePreventBackButton';

const FailedResult = ({ navigation, route }: any) => {
  const { item, errorDetail, errorCode } = route.params;
  usePreventBackButton();
  const handleNext = () => {
    navigation.navigate('Portfolio', { item });
  };

  return (
    <Layout>
      <Flex
        px={'16px'}
        flex={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box/>

        <Box w={'100%'}>
          <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require('assets/images/fail.png')}
            />
          </Flex>

          <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
            구매에 실패했어요.
          </Text>
          {errorDetail ? (
            <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
              {errorDetail}
            </Text>
          ) : (
            <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
              에러코드: {errorCode ?? 500}{'\n'}
              다시 시도해주세요.
            </Text>
          )}
        </Box>

        <Box w="100%">
          <Button
            onPress={handleNext}
            w={'100%'}
            h={'48px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
            borderRadius={'10px'}
          >
            <Text color={'white'} size={'buttonM'}>
              확인
            </Text>
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default FailedResult;
