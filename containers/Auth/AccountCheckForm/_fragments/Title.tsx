import React from 'react';

import { Text } from 'native-base';

const Title = () => {
  return (
    <>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        가입기록 확인
      </Text>
      <Text size={'captionM'} color={'gray.600'} mb={'40px'}>
        다른 경로로 피스에 가입하신 적이 있는지 확인해볼께요.
      </Text>
    </>
  );
};

export default Title;
