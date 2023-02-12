import React from 'react';

import { Box, Button, HStack, Text } from 'native-base';

import { CheckButtonProps } from 'interfaces/auth.type';

const CheckButton = (props: CheckButtonProps) => {
  const { haveAccount, setHaveAccount } = props;

  return (
    <Box>
      <Box mb={'27px'}>
        <HStack
          direction={'row'}
          space={'11px'}
          bgColor={'gray.200'}
          borderRadius={'10px'}
          padding={'4px'}
          h={'52px'}
          mt={'37px'}
        >
          <Button
            onPress={() => setHaveAccount(true)}
            borderRadius={'10px'}
            flex={1}
            bgColor={haveAccount ? 'primary.500' : 'transparent'}
          >
            <Text size={'buttonM'} color={haveAccount ? 'white' : 'gray.500'}>
              네, 어플 회원이에요
            </Text>
          </Button>
          <Button
            onPress={() => setHaveAccount(false)}
            borderRadius={'10px'}
            flex={1}
            bgColor={!haveAccount ? 'primary.500' : 'transparent'}
          >
            <Text size={'buttonM'} color={!haveAccount ? 'white' : 'gray.500'}>
              아니요, 처음이에요
            </Text>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default CheckButton;
