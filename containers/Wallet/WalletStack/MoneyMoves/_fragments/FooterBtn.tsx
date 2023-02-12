import React from 'react';

import { Box, Button, Text } from 'native-base';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

const FooterBtn = (props: any) => {
  const { pageType, navigation, status, disabled, depositData, accountData, from } = props;

  const handlePress = () => {
    if (pageType) {
      navigation.navigate('MoneyMovesCheck', {
        type: pageType,
        status: status,
        depositData: depositData,
        accountData: accountData,
      });
    }
    else {
      navigation.navigate('VirtualBankCreate', {
        trdAmt: status,
        from: from,
      });
    }
  }

  return (
    <Box px={'16px'}>
      <Button
        isDisabled={disabled}
        borderRadius={'10px'}
        h={'48px'}
        bgColor={'#10CFC9'}
        onPress={() => {
          afChargeButtonOnclick();
          handlePress();
        }}
      >
        <Text size={'buttonM'} color={'white'}>
          확인
        </Text>
      </Button>
    </Box>
  );
};

export default FooterBtn;


 /** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 클릭시 start **/
 async function afChargeButtonOnclick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerChargeButtonClick = '';

  // memberId가 있으면 회원가입 또는 로그인 한 상태
  appsFleyerChargeButtonClick = 'af_wallet_deposit_charge_button_click_login';
  const appsFleyerChargeButtonValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = await appsFlyer.logEvent(
      appsFleyerChargeButtonClick,
      appsFleyerChargeButtonValues
    )
    console.log("AppsFlyer af_wallet_deposit_charge_button_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_wallet_deposit_charge_button_click_login Error  : " + error);
  }

}
/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 클릭시 end **/
