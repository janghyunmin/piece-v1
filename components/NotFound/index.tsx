import React from 'react';

import { Button, Flex, Image, Text } from 'native-base';

import Layout from 'components/Layout';
import ModalClose from 'components/ModalClose';

const NotFound = ({ navigation }: any) => {
  return (
    <Layout>
      <ModalClose navigation={navigation} />
      <Flex
        flex={1}
        px={'16px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={'center'} pt={'120px'}>
          <Image
            source={require('assets/images/NotFound.png')}
            w={'150px'}
            h={'150px'}
            alt={'not_found'}
          />
          <Text size={'textXL'} textAlign={'center'} mb={'20px'}>
            요청하신 페이지를{'\n'}
            찾을 수 없어요
          </Text>
          <Text size={'captionM'} color={'gray.600'} textAlign="center">
            페이지가 삭제되었거나{'\n'}
            주소가 변경되었을 수 있어요.
          </Text>
        </Flex>

        <Button
          borderRadius={'10px'}
          w={'100%'}
          h={'48px'}
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <Text size={'buttonM'} color={'white'}>
            처음으로
          </Text>
        </Button>
      </Flex>
    </Layout>
  );
};

export default NotFound;
