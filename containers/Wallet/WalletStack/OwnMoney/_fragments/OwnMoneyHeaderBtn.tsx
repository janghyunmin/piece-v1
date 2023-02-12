import React from 'react';

import { Button, HStack, Text } from 'native-base';
import { useQuery } from 'react-query'
import { getMemberAccount } from 'apis/Member'
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'



const OwnMoneyHeaderBtn = (props: { navigation: any; data: any; }) => {
  const { navigation, data } = props;


  const {
    data: accountData,
  } = useQuery(
    ['Account'],
    getMemberAccount,
    {
      onError: (err: any) => {
        if (err?.response?.status === 404) return;
        navigation.navigate('NetworkError', { queryKey: ['Account'] });
      },
      cacheTime: 0,
    }
  )

  return (
    <HStack space={'11px'} mb={'60px'}>
      <Button
        bgColor={'primary.100'}
        h={'40px'}
        borderRadius={'10px'}
        flex={1}
        onPress={() => {
          afWithDrawClick();
          if (!accountData) {
            navigation.navigate('noAccount');
            return;
          } else {
            navigation.navigate('SendToMyAccount', { type: 'send', data: data })
          }
        }}
      >
        <Text size={'titleS'} color={'primary.500'}>
          출금 신청하기
        </Text>
      </Button>
      <Button
        bgColor={'primary.500'}
        h={'40px'}
        borderRadius={'10px'}
        flex={1}
        onPress={() => {
          // 예치금 충전하기 화면 진입시 appsFlyer
          afDepositCharge();
          navigation.navigate('DepositRecharge', { type: 'charge' })
        }}
      >
        <Text size={'titleS'} color={'white'}>
          예치금 충전하기
        </Text>
      </Button>
    </HStack >
  );
};

export default OwnMoneyHeaderBtn;



/** AppsFlyer 내지갑 > 나의 예치금 잔액 > 나의 예치금 > 출금 신청하기 클릭시 start **/
async function afWithDrawClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  const appsFlyerWithDrawClick = 'af_wallet_deposit_withdraw_click_login';
  const appsFleyerWithDrawValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = appsFlyer.logEvent(
      appsFlyerWithDrawClick,
      appsFleyerWithDrawValues
    )
    console.log("AppsFlyer af_wallet_deposit_withdraw_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_wallet_deposit_withdraw_click_login Error  : " + error);
  }

}
/** AppsFlyer 내지갑 > 나의 예치금 잔액 > 나의 예치금 > 출금 신청하기 클릭시 end **/



/** AppsFlyer 내지갑 > 나의 예치금 잔액 > 나의 예치금 > 예치금 충전하기 클릭시 start **/
async function afDepositCharge() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  const appsFlyerDepositChargeClick = 'af_wallet_deposit_charge_click_login';
  const appsFleyerDepositChargeValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = appsFlyer.logEvent(
      appsFlyerDepositChargeClick,
      appsFleyerDepositChargeValues
    )
    console.log("AppsFlyer af_wallet_deposit_charge_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_wallet_deposit_charge_click_login Error  : " + error);
  }

}
  /** AppsFlyer 내지갑 > 나의 예치금 잔액 > 나의 예치금 > 예치금 충전하기 클릭시 end **/

