import React, { useEffect } from 'react';

import { Box, Flex, Text } from 'native-base';

import GoBack from 'components/GoBack';

import { PasswordBox, PasswordHeaderProps } from 'interfaces/auth.type';

const PasswordHeader = (props: any) => {
  const { navigation, step, password, passwordIncorrect } = props;

  return (
    <Box>
      <GoBack navigation={navigation} />

      <Box px={'16px'}>
        <Box mb={'40px'}>
          <Text
            mb={'5px'}
            textAlign={'center'}
            size={'titleXL'}
            color={'gray.800'}
          >
            간편 비밀번호 재등록
          </Text>
          <Text textAlign={'center'} size={'captionM'} color={'gray.700'}>
            {step === 1
              ? '현재 비밀번호를 입력해 주세요.'
              : step === 2 ? '새로운 비밀번호를 입력해 주세요.'
              : '한 번 더 입력해 주세요.'}
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
    </Box>
  );
};

export default PasswordHeader;
