import React from 'react';

import { Box, Text } from 'native-base';

const Header = () => {
  return (
    <Box h={'81px'} mb={'20px'}>
      <Text size={'titleXL'} mb={'5px'}>
        은행 선택
      </Text>
      <Text size={'captionM'} color={'gray.600'}>
        본인 명의의 계좌가 개설된 은행을 선택해 주세요.
      </Text>
    </Box>
  );
};

export default Header;
