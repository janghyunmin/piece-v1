import React from 'react';

import { Box, Button, Flex, Pressable, Text, Image } from 'native-base';
import QuestionIcon from 'components/Icons/QuestionIcon';
import RightIcon from 'components/Icons/RightIcon';
import { comma } from 'utils/comma';
import { useQuery } from 'react-query'
import { getDepositBalance } from 'apis/Deposit'
import HaveNoAccount from 'components/Modal/HaveNoAccount'
import { useNavigation } from '@react-navigation/core'
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

/** AppsFlyer 내지갑 > 나의 예치금 잔액 클릭시 start **/
async function afWalletDepositClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  // memberId가 있으면 회원가입 또는 로그인 한 상태
  const appsFleyerWalletDepositClick = 'af_wallet_deposit_click_login';
  const appsFleyerWalletDepositValues = {
    af_device_id: deviceId,
    af_member_id: memberId,
  }
  try {
    var result = await appsFlyer.logEvent(
      appsFleyerWalletDepositClick,
      appsFleyerWalletDepositValues
    )
    console.log("AppsFlyer af_wallet_deposit_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_wallet_deposit_click_login Error  : " + error);
  }

}
/** AppsFlyer 내지갑 > 나의 예치금 잔액 클릭시 end **/


const Balance = (props: any) => {
  const { navigation, depositData } = props;

  return (
    <>
      <Box position={'absolute'} right={'16px'} top={'58px'}>
        <Image
          alt={'wallet_image'}
          w={'100px'}
          h={'100px'}
          source={require('assets/images/wallet_image.png')}
        />
      </Box>

      <Flex direction={'row'} alignItems={'center'} mb={'5px'}>
        <Text size={'textS'} color={'gray.700'}>
          나의 예치금 잔액
        </Text>
      </Flex>

      <Flex direction={'row'} justify={'space-between'} mb={'40px'}>
        <Pressable onPress={() => {
          afWalletDepositClick(); // 나의 예치금 잔액 appsFlyer
          navigation.navigate('OwnMoneyStack');
        }}>
          <Flex direction={'row'} alignItems={'center'}>
            <Text size={'titleXL'} mr={'10px'}>
              {comma(depositData.depositBalance)} 원
            </Text>
            <RightIcon />
          </Flex>
        </Pressable>
      </Flex>
    </>
  );
};

export default Balance;
