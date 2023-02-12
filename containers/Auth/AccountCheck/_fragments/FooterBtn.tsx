import React from 'react';

import { Button, Text } from 'native-base';

import { CheckFooterBtnProps } from 'interfaces/auth.type';

const FooterBtn = (props: CheckFooterBtnProps) => {
  const { next } = props;

  return (
    <Button
      w={'100%'}
      // colorScheme={'primary'}
      bgColor={'#10CFC9'}
      onPress={next}
      borderRadius={'10px'}
      h={'48px'}
    >
      <Text size={'buttonM'} color={'white'}>
        다음
      </Text>
    </Button>
  );
};

export default FooterBtn;
