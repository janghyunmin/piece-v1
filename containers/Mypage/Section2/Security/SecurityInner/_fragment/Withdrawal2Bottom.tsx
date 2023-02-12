import React, { useState } from 'react';

import { Box, Button, Flex, HStack, Pressable, Text } from 'native-base';
import { Image } from 'react-native';
import CheckboxIcon from 'components/Icons/CheckboxIcon';

const Withdrawal2Bottom = (props: { navigation: any, allowedWithdrawal: boolean, params: any }) => {
  const { navigation, allowedWithdrawal, params } = props;

  const [agree, setAgree] = useState<boolean>(false);

  return (
    <Box position={'absolute'} bottom={'30px'} w={'100%'}>
      <Flex
        bgColor={'white'}
        direction={'row'}
        px={'14px'}
        alignItems={'center'}
        mb={'20px'}
      >
        <Pressable onPress={() => setAgree((prev) => !prev)}>
          {agree ? (
            <Box mr={'5px'}>
              <CheckboxIcon />
            </Box>
          ) : (
            <Box
              w={'20px'}
              h={'20px'}
              borderWidth={'1px'}
              borderColor={'gray.500'}
              borderRadius={'5px'}
              bgColor={'white'}
              mr={'5px'}
            />
          )}
        </Pressable>

        <Text size={'captionM'} color={'gray.500'}>
          위의 내용을 모두 확인하고 동의합니다.
        </Text>
      </Flex>

      <HStack space={'10px'} px={'16px'}>
        <Button
          onPress={() => navigation.navigate('securityPage')}
          flex={1}
          bgColor={'primary.100'}
          h={'48px'}
          borderRadius={'10px'}
        >
          <Text size={'buttonM'} color={'primary.500'}>
            취소
          </Text>
        </Button>
        <Button
          onPress={() => {
            if (agree) {
              if (allowedWithdrawal) navigation.navigate('withdrawalCheck', params);
              else navigation.navigate('unableToWithdraw');
            }
          }}
          flex={1}
          colorScheme={agree ? '#10CFC9' : 'button_gray'}
          color={'white'}
          h={'48px'}
          borderRadius={'10px'}
        >
          <Text size={'buttonM'} color={'white'}>
            탈퇴
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default Withdrawal2Bottom;
