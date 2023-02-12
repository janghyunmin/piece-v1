import React from 'react';

import { Box, Flex, Input, Pressable, Text, TextArea } from 'native-base';
import { Image } from 'react-native';

import {
  WithdrawalReasonProps,
  WithdrawalReasonType,
} from 'interfaces/mypage.type';
import CheckPrimaryIcon from 'components/Icons/CheckPrimaryIcon';

const Withdrawal1Reason = (props: any) => {
  const {
    reasonList,
    handleSelect,
    withdrawalReasonCode,
    withdrawalReasonText,
    setWithdrawalReasonText,
    scrollRef,
  } = props;
  return (
    <Box px={'16px'}>
      {reasonList.map((reason: WithdrawalReasonType, index: number) => (
        <Pressable
          key={reason.withdrawalReasonCode}
          onPress={() => handleSelect(reason.withdrawalReasonCode)}
          py={'20px'}
          borderBottomWidth={index === reasonList.length - 1 ? 0 : '1px'}
          borderBottomColor={'gray.200'}
        >
          <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              size={'textM'}
              color={withdrawalReasonCode === reason.withdrawalReasonCode ? 'primary.500' : 'gray.600'}
            >
              {reason.title}
            </Text>

            {withdrawalReasonCode === reason.withdrawalReasonCode && (
              <CheckPrimaryIcon />
            )}
          </Flex>
        </Pressable>
      ))}
      {withdrawalReasonCode === 'MWR0106' && (
        <Input
          multiline={true}
          onFocus={() => scrollRef.current.scrollToEnd()}
          h={'120px'}
          borderWidth={'1px'}
          borderColor={'gray.300'}
          placeholder={'탈퇴하려는 이유를 직접 작성해 주세요.'}
          borderRadius={'5px'}
          padding={1}
          mb={'20px'}
          value={withdrawalReasonText}
          onChangeText={(text: string) => setWithdrawalReasonText(text)}
        />
      )}
    </Box>
  );
};

export default Withdrawal1Reason;
