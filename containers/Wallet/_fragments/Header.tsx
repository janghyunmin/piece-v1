import React from 'react';

import { Flex, Text } from 'native-base';

const Header = () => {
  return (
    <Flex h={'80px'} justifyContent={'center'}>
      <Text size={'titleXL'}>내 지갑</Text>
    </Flex>
  );
};

export default Header;
