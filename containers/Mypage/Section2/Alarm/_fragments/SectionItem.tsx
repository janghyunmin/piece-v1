import React from 'react';

import { Box, Flex, Text } from 'native-base';

import ToggleBtn from 'components/ToggleBtn';

import { AlarmData, AlarmSectionProps } from 'interfaces/mypage.type';

const SectionItem = (props: any) => {
  const { title, subTitle, toggle, handleToggle } = props;

  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderTopWidth={'1px'}
      borderTopColor={'gray.200'}
    >
      <Box py={'20px'}>
        <Text mb={'5px'} size={'textM'} color={'gray.800'}>
          {title}
        </Text>
        {subTitle && (
          <Text size={'captionM'} color={'gray.500'}>
            {subTitle}
          </Text>
        )}
      </Box>

      <ToggleBtn toggle={toggle} handleToggle={handleToggle} />
    </Flex>
  );
};

export default SectionItem;
