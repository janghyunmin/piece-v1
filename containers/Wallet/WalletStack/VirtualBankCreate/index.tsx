import React from 'react'
import Layout from 'components/Layout'
import { Box, Button, Flex, Input, Text } from 'native-base'
import GoBack from 'components/GoBack'
import useMemberQuery from 'hooks/useMemberQuery'
import useNextNavigate from 'hooks/useNextNavigate'
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage';

const VirtualBankCreate = ({ navigation, route }: any) => {
  const { data: memberData } = useMemberQuery();
  useNextNavigate(navigation, route.params?.next);

  return (
    <Layout>
      <GoBack navigation={navigation} />
      <Flex flex={1} justifyContent={'space-between'}>
        <Box px={'16px'}>
          <Box>
            <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
              가상 계좌 생성
            </Text>
            <Text mb="40px" size={'captionM'} color={'gray.600'}>
              가입한 휴대폰 번호로 가상 계좌번호를 생성합니다.
            </Text>
          </Box>

          <Box mb={'28px'}>
            <Text size={'titleS'} color={'gray.500'}>
              휴대폰 번호
            </Text>
            <Input
              keyboardType={'number-pad'}
              value={memberData?.cellPhoneNo}
              padding={0}
              variant={'underlined'}
              isReadOnly
              isDisabled
              h={'52px'}
            />
          </Box>
        </Box>

        <Box px={'16px'}>
          <Button
            borderRadius={'10px'}
            h={'48px'}
            bgColor={'#10CFC9'}
            onPress={() => {
              afVirtualAccountClick();
              navigation.navigate('VirtualBankPolicyAgreement', {
                trdAmt: route.params.trdAmt,
                from: route.params.from,
              })
            }
           }
          >
            <Text size={'buttonM'} color={'white'}>
              확인
            </Text>
          </Button>
        </Box>
      </Flex>

    </Layout>
  )
}

export default VirtualBankCreate;


/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 start **/
 async function afVirtualAccountClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  // memberId가 있으면 회원가입 또는 로그인 한 상태
  const appsFleyerVirtualClick = 'af_virtual_button_click_login';
  const appsFleyerVirtualButtonValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = await appsFlyer.logEvent(
      appsFleyerVirtualClick,
      appsFleyerVirtualButtonValues
    )
    console.log("AppsFlyer af_virtual_button_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_virtual_button_click_login Error  : " + error);
  }

}
/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 end **/
