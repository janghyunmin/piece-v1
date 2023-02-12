import React from 'react';

import { Box, Flex, Text } from 'native-base';

import { PasswordBox } from 'interfaces/auth.type';
import GoBack from 'components/GoBack'

const LoginHeader = (props: any) => {
  const { navigation, password, passwordIncorrect } = props;

  return (
    <Box>
      <Box h={'80px'}/>

      <Box mb={'40px'}>
        <Text
          mb={'5px'}
          textAlign={'center'}
          size={'titleXL'}
          color={'gray.800'}
        >
          간편 비밀번호 입력
        </Text>
        <Text textAlign={'center'} size={'captionM'} color={'gray.700'}>
          숫자 6자리를 입력해 주세요.
        </Text>
      </Box>

      <Flex alignItems="center">
        <Flex direction="row" w={'146px'} justifyContent="space-between">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box
              key={index}
              bgColor={password.length >= index ? 'primary.500' : 'transparent'}
              borderWidth={password.length >= index ? 0 : 1}
              borderColor={'gray.300'}
              borderRadius={'8px'}
              w={'16px'}
              h={'16px'}
            />
          ))}
        </Flex>
        {!!passwordIncorrect && (
          <Text
            textAlign={'center'}
            mt={'10px'}
            size={'captionM'}
            color={'warning.500'}
          >
            {passwordIncorrect}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default LoginHeader;
