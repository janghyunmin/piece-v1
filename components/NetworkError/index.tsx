import React, { useEffect } from 'react';

import { Box, Button, Flex, Image, Text } from 'native-base';
import * as Network from 'expo-network';

import Layout from 'components/Layout';
import ModalClose from 'components/ModalClose';
import { useQueryClient } from 'react-query'
import usePreventBackButton from 'hooks/usePreventBackButton';

const NetworkError = ({ navigation, route }: any) => {
  const queryClient = useQueryClient();
  const queryKey = route.params?.queryKey;
  const isConnected = route.params?.isConnected;
  usePreventBackButton(isConnected === false);

  useEffect(() => {
    if (isConnected === false) {
      const removeInterval = setInterval(async () => {
        const networkState = await Network.getNetworkStateAsync();
        if (networkState.isConnected) navigation.goBack();
      }, 1000)
      return () => {
        clearInterval(removeInterval);
      }
    }
  }, [isConnected]);

  return (
    <Layout>
      {/*{isConnected !== false ? (*/}
        <ModalClose navigation={navigation} />
      {/*) : (*/}
      {/*  <Box h={'80px'} />*/}
      {/*)}*/}
      <Flex
        flex={1}
        px={'16px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={'center'} pt={'120px'}>
          <Image
            source={require('assets/images/network_error.png')}
            w={'150px'}
            h={'150px'}
            alt={'network_error'}
          />
          <Text size={'textXL'} textAlign={'center'} mb={'20px'}>
            네트워크가 원활하지 않아요.
            {/*네트워크 오류가{'\n'}발생했어요*/}
          </Text>
          <Text size={'captionM'} color={'gray.600'} textAlign={'center'}>
            확인 후 다시 시도해 주세요.
          </Text>
        </Flex>
        {/*{isConnected !== false && (*/}
          <Button
            borderRadius={'10px'}
            w={'100%'}
            h={'48px'}
            bgColor={'#10CFC9'}
            onPress={async () => {
              if (isConnected === false) {
                navigation.goBack();
                const isConnected = (await Network.getNetworkStateAsync()).isConnected;
                if (!isConnected) {
                  return setTimeout(() => navigation.navigate('NetworkError', { isConnected }), 600);
                }
                return queryClient.refetchQueries();
              }

              if (queryKey) queryClient.refetchQueries(queryKey);
              navigation.goBack();
            }}
          >
            <Text size={'buttonM'} color={'white'}>
              다시 시도
            </Text>
          </Button>
        {/*)}*/}
      </Flex>
    </Layout>
  );
};

export default NetworkError;
