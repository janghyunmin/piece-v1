import React from 'react';

import { Button, Flex, Image, Text } from 'native-base';

import Layout from 'components/Layout';
import ModalClose from 'components/ModalClose';
import { setIsTour } from 'features/tourSlice'
import { useDispatch } from 'react-redux'

const LoginRedirect = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
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
            source={require('assets/images/login_redirect.png')}
            w={'150px'}
            h={'150px'}
            alt={'login_redirect'}
          />
          <Text size={'textXL'} textAlign={'center'} mb={'20px'}>
            로그인이 필요한{'\n'}
            서비스에요
          </Text>
          <Text size={'captionM'} color={'gray.600'} textAlign="center">
            해당 서비스는 로그인 후 이용 가능해요{'\n'}
            계정이 없다면 회원가입을 먼저 진행해 주세요.
          </Text>
        </Flex>

        <Button
          borderRadius={'10px'}
          w={'100%'}
          h={'48px'}
          bgColor={'#10CFC9'}
          onPress={() => {
            dispatch(setIsTour(false));
            if (route.params?.isUser) {
              return navigation.reset({routes: [{name: 'login'}]});
            }
            return navigation.reset({routes: [{name: 'Start'}]});
          }}
        >
          <Text size={'buttonM'} color={'white'}>
            로그인 / 회원가입
          </Text>
        </Button>
      </Flex>
    </Layout>
  );
};

export default LoginRedirect;
