import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout';
import ModalClose from 'components/ModalClose'
import Title from 'containers/Wallet/WalletStack/CertificateRealName/_fragments/Title'
import { Box, Button, ScrollView, Text } from 'native-base'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import Forms from 'containers/Wallet/WalletStack/CertificateRealName/_fragments/Forms'
import FooterBtn from 'containers/Wallet/WalletStack/CertificateRealName/_fragments/FooterBtn'
import { useMutation } from 'react-query'
import { requestRealName } from 'apis/RealName'
import useMemberQuery from 'hooks/useMemberQuery'
import usePreventBackButton from 'hooks/usePreventBackButton';


const CertificateRealName = ({ navigation, route }: any) => {
  const { amount } = route.params;
  const [ssn1, setSsn1] = useState<string>('');
  const [ssn2, setSsn2] = useState<string>('');
  const [ssnIncorrect, setSsnIncorrect] = useState<string>('');

  const [ssn1Focus, setSsn1Focus] = useState<boolean>(false);
  const [ssn2Focus, setSsn2Focus] = useState<boolean>(false);

  const [formFilled, setFormFilled] = useState<boolean>(false);

  const { data: memberData } = useMemberQuery();
  usePreventBackButton();

  useEffect(() => {
    if (
      ssn1.length === 6 &&
      ssn2.length === 7
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
    if (ssnIncorrect) setSsnIncorrect('');
  }, [ssn1, ssn2])


  const goToNextStep = () => {
    mutate({
      memberId: memberData.memberId,
      name: memberData.name,
      ssn: ssn1+ssn2,
      agree1: 'Y',
      agree2: 'Y',
    });
  };

  const { mutate } = useMutation(
    (_body: any) => requestRealName(_body),
    {
      onSuccess: (res) => {
         navigation.goBack();
         navigation.navigate('CertificationRealNameCompleteModal', { amount })
      },
      onError: (err) => {
        navigation.navigate('CertificationRealNameFailModal');
        return setSsnIncorrect('주민등록번호가 일치하지 않습니다.');
      },
    }
  );

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView
          scrollIndicatorInsets={{ top: 1, bottom: 1 }}
          contentInsetAdjustmentBehavior={'always'}
        >
          {/*<ModalClose navigation={navigation} />*/}
          <Box h={'80px'} />
          <Title />
          <Forms
            name={memberData?.name}
            ssn1={ssn1}
            ssn={ssn2}
            setSsn1={setSsn1}
            setSsn2={setSsn2}
            ssnIncorrect={ssnIncorrect}
            setSsnIncorrect={setSsnIncorrect}
            ssn1Focus={ssn1Focus}
            ssn2Focus={ssn2Focus}
            setSsn1Focus={setSsn1Focus}
            setSsn2Focus={setSsn2Focus}
          />
        </ScrollView>
        {Platform.OS === 'ios' && (ssn1Focus || ssn2Focus) && (
          <Button
            borderRadius={0}
            borderTopWidth={'1px'}
            borderColor={'#ffffff'}
            onPress={() => Keyboard.dismiss()}
          >
            <Text color="white" size={'buttonM'}>확인</Text>
          </Button>
        )}
      </KeyboardAvoidingView>
      <FooterBtn formFilled={formFilled} goToNextStep={goToNextStep} />
    </Layout>
  )
}

export default CertificateRealName;
