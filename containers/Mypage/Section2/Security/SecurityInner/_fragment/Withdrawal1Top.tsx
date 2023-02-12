import React from 'react';

import { Box, Text } from 'native-base';

const Withdrawal1Top = () => {
  return (
    <Box px={'16px'}>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        회원 탈퇴
      </Text>
      <Text size={'textS'} color={'gray.600'} mb={'20px'}>
        탈퇴하려는 이유를 알려 주시면 더 좋은 서비스로 찾아뵐게요.
      </Text>
    </Box>
  );
};

export default Withdrawal1Top;
