import React from 'react';

import { Box, Text } from 'native-base';

const Title = () => {
  return (
    <Box px={'16px'}>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        본인 확인
      </Text>
      <Text mb="40px" size={'captionM'} color={'gray.600'}>
        피스를 더 안전하게 이용하기 위한 절차예요.
      </Text>
    </Box>
  );
};

export default Title;
