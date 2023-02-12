import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage';

const HaveNoAccount = ({ navigation }: any) => {
  return (
    <Flex flex={1} w={'100%'} justifyContent={'center'} px={'16px'}>
      <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
        <Text
          size={'titleL'}
          textAlign={'center'}
          mb={'10px'}
          color={'gray.800'}
        >
          등록된 계좌가 없어요
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          지금 계좌를 등록할까요?
        </Text>

        <HStack space={'10px'}>
          <Button
            onPress={() => navigation.goBack()}
            h={'48px'}
            flex={1}
            borderRadius={'10px'}
            bgColor={'#EAECF0'}
          >
            <Text size={'buttonM'} color={'gray.700'}>
              뒤로
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate('BankAccountRegisterStack', { isCreate: true })}
            h={'48px'}
            flex={1}
            borderRadius={'10px'}
            bgColor={'#10CFC9'}

          >
            <Text size={'buttonM'} color={'white'}>
              계좌 등록
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default HaveNoAccount;


/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 start **/
async function afInsertAccountClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  // memberId가 있으면 회원가입 또는 로그인 한 상태
  const appsFleyerAccountClick = 'af_virtual_button_click_login';
  const appsFleyerAccountValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = await appsFlyer.logEvent(
      appsFleyerAccountClick,
      appsFleyerAccountValues
    )
    console.log("AppsFlyer af_virtual_button_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_virtual_button_click_login Error  : " + error);
  }

}
/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 end **/

