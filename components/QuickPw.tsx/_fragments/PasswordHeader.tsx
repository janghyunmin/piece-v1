import React from 'react';

import { Box, Flex, Text } from 'native-base';

import GoBack from 'components/GoBack';

import { PasswordBox, PasswordHeaderProps } from 'interfaces/auth.type';

const PasswordHeader = (props: PasswordHeaderProps) => {
  const { navigation, passwordBox, passwordIncorrect } = props;

  return (
    <Box>
      <GoBack navigation={navigation} />

      <Box mb={'40px'}>
        <Text
          mb={'5px'}
          textAlign={'center'}
          size={'titleXL'}
          color={'gray.800'}
        >
          간펀 비밀번호
        </Text>
        <Text textAlign={'center'} size={'captionM'} color={'gray.500'}>
          간편 비밀번호를 입력해 주세요.
        </Text>
      </Box>

      <Flex alignItems="center">
        <Flex direction="row" w={'146px'} justifyContent="space-between">
          {passwordBox.map((data: PasswordBox, index: number) => (
            <Box
              key={index}
              bgColor={data.active ? 'primary.500' : 'transparent'}
              borderWidth={data.active ? 0 : 1}
              borderColor={'gray.300'}
              borderRadius={'8px'}
              w={'16px'}
              h={'16px'}
            ></Box>
          ))}
        </Flex>
        {passwordIncorrect !== '' && (
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

export default PasswordHeader;
