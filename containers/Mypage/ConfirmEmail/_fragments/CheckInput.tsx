import React from 'react';

import { Box, Input, KeyboardAvoidingView, Text } from 'native-base';

import { CheckInputProps } from 'interfaces/auth.type';

const CheckInput = (props: CheckInputProps) => {
  const { email, setEmail } = props;

  return (
    <KeyboardAvoidingView>
      <Text size={'titleS'} color={'gray.500'}>
        이메일
      </Text>
      <Input
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        h={'52px'}
        placeholder={'이메일 입력'}
        variant={'underlined'}
      />
    </KeyboardAvoidingView>
  );
};

export default CheckInput;
