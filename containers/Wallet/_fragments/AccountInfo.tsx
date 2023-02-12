import React, { useEffect, useMemo } from 'react'

import { Box, Center, Flex, Pressable, Text, Image } from 'native-base';

import AddAccountIcon from 'components/Icons/AddAccountIcon';

import bankColorChange from 'utils/bankColorChange';

const AccountInfo = (props: any) => {
  const { navigation, accountData } = props;

  const bankName = useMemo(() => {
    return bankColorChange(accountData?.bankCode).name;
  }, [accountData?.bankCode]);

  const bankColor = useMemo(() => {
    return bankColorChange(accountData?.bankCode).color;
  }, [accountData?.bankCode])

  const bankIcon = useMemo(() => {
    return bankColorChange(accountData?.bankCode).icon;
  }, [accountData?.bankCode])

  return (
    <Box mb={'40px'}>
      <Text size={'textS'} color={'gray.700'} mb={'5px'}>
        등록된 계좌
      </Text>
      <Pressable
        bgColor={bankColor}
        onPress={() => {
          if (!accountData) navigation.navigate('BankAccountRegisterStack', { isCreate: true });
        }}
        h={'150px'}
        borderRadius={'10px'}
        w={'100%'}
        shadow={2}
      >
        {accountData ? (
          <Flex justify={'space-between'} padding={'20px'} h={'100%'}>
            <Flex
              direction={'row'}
              justify={'space-between'}
            >
              <Flex p={'8px'} borderRadius={'50px'} bgColor={'#00000020'} direction={'row'} alignItems={'center'}>
                <Image
                  key={accountData.bankCode}
                  alt={'bank_logo'}
                  source={bankIcon}
                  w={'24px'}
                  h={'24px'}
                  mr={'5px'}
                />
                <Text size={'titleL'} color={'white'}>
                  {bankName}
                </Text>
              </Flex>
              <Pressable onPress={() => {
                navigation.navigate('BankAccountRegisterStack', { isCreate: false });
              }}>
                <Text size={'activeM'} color={'white'}>
                  변경
                </Text>
              </Pressable>
            </Flex>
            <Text size={'titleM'} color={'white'}>
              {accountData.accountNo}
            </Text>
          </Flex>
        ) : (
          <Center h={'100%'}>
            <AddAccountIcon />
            <Text size={'titleM'} color={'primary.500'}>
              출금 계좌 등록
            </Text>
          </Center>
        )}
      </Pressable>
    </Box>
  );
};

export default AccountInfo;
