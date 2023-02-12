import React from 'react';

import { Box, Flex, Text } from 'native-base';

import ToggleBtn from 'components/ToggleBtn';

import { WithToggleProps } from 'interfaces/mypage.type';

const OptionalItem = (props: WithToggleProps) => {
  const { toggle, handleToggle } = props;

  return (
    <Box bgColor={'white'} px={'16px'}>
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text py={'20px'} size={'textM'} color={'gray.800'}>
          [선택] 마케팅 정보 수신 동의
        </Text>
        <ToggleBtn toggle={toggle} handleToggle={handleToggle} />
      </Flex>
    </Box>
  );
};

export default OptionalItem;
