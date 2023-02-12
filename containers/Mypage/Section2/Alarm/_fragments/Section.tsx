import React from 'react';

import { Box, Text } from 'native-base';


const Section = (props: any) => {
  const { title, children } = props;

  return (
    <Box bgColor={'white'} mb={'10px'} px={'16px'}>
      <Text py={'20px'} size={'titleM'} color={'gray.800'}>
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default Section;
