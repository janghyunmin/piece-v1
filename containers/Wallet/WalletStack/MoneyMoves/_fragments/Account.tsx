import React from 'react';

import { Box, Flex, Text } from 'native-base';
import { Image } from 'react-native';
import bankColorChange from 'utils/bankColorChange'
import { useQuery } from 'react-query'
import { getMemberAccount } from 'apis/Member'

const Account = (props: any) => {
  const { pageType, accountData } = props;

  return (
    <Flex
      py={'20px'}
      px={'15px'}
      bgColor={'gray.100'}
      borderRadius={'20px'}
      direction={'row'}
    >
      <Image
        key={accountData?.bankCode}
        style={{ width: 40, height: 40, marginRight: 10 }}
        source={bankColorChange(accountData?.bankCode).icon}
      />
      <Box>
        <Text size={'titleS'} color={'gray.700'}>
          {pageType ? '이 계좌로 입금돼요.' : '이 계좌에서 출금할게요.'}
        </Text>
        <Text size={'textS'} color={'gray.700'}>
          {bankColorChange(accountData?.bankCode).name} {accountData?.accountNo}
        </Text>
      </Box>
    </Flex>
  );
};

export default Account;
