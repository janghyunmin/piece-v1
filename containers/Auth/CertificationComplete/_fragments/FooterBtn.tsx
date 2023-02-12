import React from 'react';

import { Box, Button, Text } from 'native-base';

const FooterBtn = (props: { navigation: any, isLogin: boolean; }) => {
  const { navigation, isLogin } = props;

  return (
    <Box bottom={'0'} px={'16px'}>
      <Button
        onPress={() => navigation.navigate('password')}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
        h={'48px'}
      >
        <Text size={'buttonM'} color={'white'}>
          비밀번호 설정하기
        </Text>
      </Button>
    </Box>
  );
};

export default FooterBtn;
