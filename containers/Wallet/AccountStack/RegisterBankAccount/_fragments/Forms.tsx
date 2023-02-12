import React from 'react';

import { Box, Input, Text } from 'native-base';

import { RegisterBankAccountProps } from 'interfaces/wallet.type';

const Forms = (props: RegisterBankAccountProps) => {
  const {
    name,
    bankAccountFocus,
    bankAccount,
    setBankAccountFocus,
    setBankAccount,
    bankAccountIncorrect,
  } = props;

  return (
    <>
      <Box mb={'30px'}>
        <Text size={'titleS'} color={'gray.500'}>
          예금주
        </Text>
        <Input
          value={name}
          padding={0}
          variant={'underlined'}
          h={'52px'}
          isReadOnly
          isDisabled
        />
      </Box>

      <Box mb={'100px'}>
        <Text
          size={'titleS'}
          color={bankAccountFocus ? 'gray.800' : 'gray.500'}
        >
          계좌번호
        </Text>
        <Input
          keyboardType={'number-pad'}
          value={bankAccount}
          onFocus={() => setBankAccountFocus(true)}
          onBlur={() => setBankAccountFocus(false)}
          onChangeText={(text) => setBankAccount(text.replace(/[^0-9]/g, ''))}
          padding={0}
          variant={bankAccountIncorrect === '' ? 'underlined' : 'warn'}
          placeholder={'하이픈( - ) 없이 입력'}
          h={'52px'}
        />
        {bankAccountIncorrect !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {bankAccountIncorrect}
          </Text>
        )}
      </Box>
    </>
  );
};

export default Forms;
