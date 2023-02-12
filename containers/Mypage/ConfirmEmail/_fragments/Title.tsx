import React from 'react';

import { Text } from 'native-base';

const Title = () => {
  return (
    <>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        이메일 등록
      </Text>
      <Text size={'captionM'} color={'gray.600'} mb={'40px'}>
        이메일을 입력하고 소유증서를 이메일로 받아보세요
      </Text>
    </>
  );
};

export default Title;
