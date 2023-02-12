import React, { useMemo, useState } from 'react'

import { Box, Button, Flex, Pressable, Text } from 'native-base';

import { getConsentList } from 'apis/Consent';
import CheckPrimaryIcon from 'components/Icons/CheckPrimaryIcon';
import CheckIcon from 'components/Icons/CheckIcon';
import CircleCheckIcon from 'components/Icons/CircleCheckIcon';
import CircleCheckColoredIcon from 'components/Icons/CircleCheckColoredIcon';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import { sendBankVerificationCode } from 'apis/Bank'
import { useMutation } from 'react-query';
import { updateMember } from 'apis/Member';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

type ConsentType = {
  consentCode: string;
  consentTitle: string;
  isMandatory: 'Y' | 'N';
  checked: boolean;
}

const VirtualBankPolicyAgreement = ({ navigation, route }: any) => {
  const [consentList, setConsentList] = useState<ConsentType[]>([
    { consentCode: '1', consentTitle: '서비스 이용약관', isMandatory: 'Y', checked: false },
    { consentCode: '2', consentTitle: '전자금융거래 이용약관', isMandatory: 'Y', checked: false },
    { consentCode: '3', consentTitle: '개인정보 수집 및 동의', isMandatory: 'Y', checked: false },
    { consentCode: '4', consentTitle: '개인정보 제3자 제공 및 위탁 동의', isMandatory: 'Y', checked: false },
  ]);

  const checkedAll = useMemo(() => {
    return consentList.every((consent: ConsentType) => consent.checked);
  }, [consentList])

  const checkedEssentialAll = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'Y').every((consent: ConsentType) =>
      consent.checked
    );
  }, [consentList])

  const essentialConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'Y');
  }, [consentList]);

  const optionalConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'N');
  }, [consentList]);

  const handleCheckAll = () => {
    setConsentList(consentList.map((consent: ConsentType) => ({
      ...consent,
      checked: !checkedAll,
    })));
  }

  const handleCheck = (consentCode: string) => {
    setConsentList(consentList.map((consent: any) => consent.consentCode !== consentCode ? consent : ({
      ...consent,
      checked: !consent.checked,
    })));
  };

  const handleDetail = (consentCode: string) => {
    navigation.navigate('VirtualBankAgreementDetail', { consent: consentList.find((consent) => consent.consentCode === consentCode) });
  }

  const { mutate, isLoading } = useMutation(
    sendBankVerificationCode,
    {
      onSuccess: (res) => {
        navigation.navigate('VirtualBankCreate', {
          next: {
            route: 'VirtualBankCertification',
            params: {
              mchtTrdNo: res.data.mchtTrdNo,
              trdAmt: route.params.trdAmt,
              from: route.params.from,
            }
          }
        });
      },
    }
  );

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        pt={'30px'}
        px={'16px'}
        pb={'30px'}
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'30px'}
        >
          <Box w={'28px'} h={'28px'} />
          <Text size={'titleL'} color={'gray.800'}>
            약관 동의
          </Text>
          <Pressable
            w={'28px'}
            h={'28px'}
            justifyContent={'center'}
            alignItems={'center'}
            onPress={() => navigation.goBack()}
          >
            <CloseGrayIcon />
          </Pressable>
        </Flex>

        <Box mb={'30px'}>
          <Pressable onPress={() => handleCheckAll()}>
            <Flex
              direction={'row'}
              alignItems={'center'}
              py={'20px'}
              mb={'20px'}
              borderBottomWidth={'1px'}
              borderBottomColor={'gray.300'}
            >
              <Box mr={'10px'}>
                {checkedAll ? <CircleCheckColoredIcon /> : <CircleCheckIcon />}
              </Box>
              <Text size={'titleM'} color={'primary.500'}>
                약관에 모두 동의합니다
              </Text>
            </Flex>
          </Pressable>

          <Box>
            {essentialConsentList.map((consent: ConsentType, index: number) => (
              <Flex
                key={index}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                pb={'20px'}
              >
                <Pressable onPress={() => handleCheck(consent.consentCode)}>
                  <Flex direction={'row'} alignItems={'center'}>
                    <Box mr={'10px'}>
                      {consent.checked ? <CheckPrimaryIcon /> : <CheckIcon />}
                    </Box>
                    <Text mr={'5px'} size={'textM'} color={'gray.800'}>
                      {consent.consentTitle}
                    </Text>
                    <Text size={'textS'} color={'gray.600'}>
                      [필수]
                    </Text>
                  </Flex>
                </Pressable>

                <Pressable onPress={() => handleDetail(consent.consentCode)}>
                  <NextGrayIcon />
                </Pressable>
              </Flex>
            ))}

            {optionalConsentList.map((consent: ConsentType, index: number) => (
              <Flex
                key={index}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderTopWidth={index === 0 ? '1px' : 0}
                borderTopColor={'gray.300'}
                pt={index === 0 ? '20px' : 0}
                pb={'20px'}
              >
                <Pressable onPress={() => handleCheck(consent.consentCode)}>
                  <Flex direction={'row'} alignItems={'center'}>
                    <Box mr={'10px'}>
                      {consent.checked ? <CheckPrimaryIcon /> : <CheckIcon />}
                    </Box>
                    <Text mr={'5px'} size={'textM'} color={'gray.800'}>
                      {consent.consentTitle}
                    </Text>
                    <Text size={'textS'} color={'gray.600'}>
                      [선택]
                    </Text>
                  </Flex>
                </Pressable>

                <Pressable onPress={() => handleDetail(consent.consentCode)}>
                  <NextGrayIcon />
                </Pressable>
              </Flex>
            ))}
          </Box>
        </Box>

        <Button
          // colorScheme={'primary'}
          bgColor={'#10CFC9'}
          isDisabled={!checkedEssentialAll || isLoading}
          onPress={() => {
              afVirtualBankPolicyClick();
              mutate();
            }
          }
          borderRadius={'10px'}
          h={'48px'}
        >
          <Text color={'white'} size={'buttonM'}>
            인증하기
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default VirtualBankPolicyAgreement;


/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 start **/
async function afVirtualBankPolicyClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  // memberId가 있으면 회원가입 또는 로그인 한 상태
  const appsFleyerVirtualPolicyClick = 'af_virtual_bankAgreement_button_click_login';
  const appsFleyerVirtualPolicyButtonValues = {
    af_device_id: deviceId,
    af_member_id: memberId
  }
  try {
    var result = await appsFlyer.logEvent(
      appsFleyerVirtualPolicyClick,
      appsFleyerVirtualPolicyButtonValues
    )
    console.log("AppsFlyer af_virtual_bankAgreement_button_click_login Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_virtual_bankAgreement_button_click_login Error  : " + error);
  }

}
/** AppsFlyer 나의예치금 잔액 > 예치금 충전하기 > 확인 버튼 > 가상 계좌 생성 클릭시 end **/
