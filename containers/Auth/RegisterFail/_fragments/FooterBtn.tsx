import React from 'react';

import { Box, Button, Text } from 'native-base';

const FooterBtn = (props: { navigation: any }) => {
  const { navigation } = props;

  return (
    <Box bottom={'0'} px={'16px'}>
      <Text
        size={'captionM'}
        color={'gray.600'}
        textAlign={'center'}
        mb={'10px'}
      >
        확인을 누르면 첫 화면으로 이동해요
      </Text>
      <Button
        onPress={() => navigation.navigate('Start')}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        borderRadius={'10px'}
        h={'48px'}
      >
        <Text size={'buttonM'} color={'white'}>
          확인
        </Text>
      </Button>
    </Box>
  );
};

export default FooterBtn;
