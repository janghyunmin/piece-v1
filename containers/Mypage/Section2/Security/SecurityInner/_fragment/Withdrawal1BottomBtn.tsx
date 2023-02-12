import React from 'react';

import { Box, Button, Text } from 'native-base';

import { Withdrawal1BottomBtnProps } from 'interfaces/mypage.type';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const bottomHeight = getBottomSpace() + 10;

const Withdrawal1BottomBtn = (props: Withdrawal1BottomBtnProps) => {
  const { navigation, buttonSelected, withdrawalReasonCode, withdrawalReasonText } = props;

  return (
    <Box px={'16px'} bgColor={'white'} >
      <Button
        isDisabled={!buttonSelected}
        onPress={() => navigation.navigate('withdrawal2', {
          withdrawalReasonCode,
          withdrawalReasonText,
        })}
        borderRadius={'10px'}
        h={'50px'}
        bgColor={'primary.500'}
      >
        <Text color={'white'} size={'buttonM'}>
          확인
        </Text>
      </Button>
    </Box>
  );
};

export default Withdrawal1BottomBtn;
