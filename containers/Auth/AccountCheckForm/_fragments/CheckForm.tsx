import React from 'react';

import { Input, Text } from 'native-base';

import { CheckInputProps } from 'interfaces/auth.type';
import { useDispatch } from 'react-redux'
import { setForm } from 'features/certificationFormSlice'

const CheckForm = (props: any) => {
  const { name, email, emailIncorrect, setEmailIncorrect } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Text size={'titleS'} color={'gray.500'}>
        이름
      </Text>
      <Input
        value={name}
        onChangeText={(text: string) => dispatch(setForm({ name: 'name', value: text}))}
        mb={'28px'}
        h={'52px'}
        placeholder={'이름 입력'}
        variant={'underlined'}
      />
      <Text size={'titleS'} color={'gray.500'}>
        이메일
      </Text>
      <Input
        value={email}
        onChangeText={(text: string) => {
          if (emailIncorrect) setEmailIncorrect('');
          dispatch(setForm({ name: 'email', value: text }))
        }}
        h={'52px'}
        placeholder={'이메일 입력'}
        variant={emailIncorrect ? 'warn' : 'underlined'}
      />
      {!!emailIncorrect && (
        <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
          {emailIncorrect}
        </Text>
      )}
    </>
  );
};

export default CheckForm;
