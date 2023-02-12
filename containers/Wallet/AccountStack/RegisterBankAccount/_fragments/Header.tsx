import React from 'react';

import { Box, Text } from 'native-base';

const Header = ({ isCreate }: any) => {
  return (
    <Box h={'75px'} mb={'16px'}>
      <Text size={'titleXL'} mb={'5px'}>
        {isCreate ? '출금계좌 등록' : '출금계좌 변경'}
      </Text>
      <Text size={'captionM'} color={'gray.600'}>
        사용하실 계좌번호를 입력해 주세요.
      </Text>
    </Box>
  );
};

export default Header;
