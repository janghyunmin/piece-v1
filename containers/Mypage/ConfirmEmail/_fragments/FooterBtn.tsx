import React from 'react';

import { Button, Text } from 'native-base';

import { CheckFooterBtnProps } from 'interfaces/auth.type';

import { validateEmail } from 'utils/validate';

const FooterBtn = (props: CheckFooterBtnProps) => {
  const { email, next } = props;

  return (
    <Button
      w={'100%'}
      // colorScheme={'primary'}
      bgColor={'#10CFC9'}
      isDisabled={!validateEmail(email)}
      onPress={next}
      borderRadius={'10px'}
      h={'48px'}
    >
      <Text size={'buttonM'} color={'white'}>
        이메일 변경
      </Text>
    </Button>
  );
};

export default FooterBtn;
