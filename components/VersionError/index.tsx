import React from 'react';

import { Box, Button, Flex, Image, Text } from 'native-base';

import Layout from 'components/Layout';
import { Linking, Platform } from 'react-native';


const VersionError = () => {

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
            최신버전이 아니에요
          </Text>
          <Text size={'captionM'} color={'gray.600'} textAlign="center">
            업데이트 후 이용해주세요.
          </Text>
        </Flex>

        <Button
          borderRadius={'10px'}
          w={'100%'}
          h={'48px'}
          onPress={() => {
            if (Platform.OS === 'ios') Linking.openURL(`itms-apps://itunes.apple.com/app/1615510313`);
            else Linking.openURL(`market://details?id=run.piece.dev`);
          }}
        >
          <Text size={'buttonM'} color={'white'}>
            업데이트
          </Text>
        </Button>
      </Flex>
    </Layout>
  );
};

export default VersionError;
