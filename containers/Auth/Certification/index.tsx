import React, { useCallback, useEffect, useState } from 'react'

import { Text, Button, ScrollView, Box , KeyboardAvoidingView } from 'native-base'
import { Platform, Keyboard } from 'react-native'

import Forms from './_fragments/Forms';
import Title from './_fragments/Title';
import FooterBtn from './_fragments/FooterBtn';
import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import { useRootState } from 'hooks/useRootState'
import { useDispatch } from 'react-redux'
import { setErrors, setKind } from 'features/certificationFormSlice'
import { LinearGradient } from 'expo-linear-gradient'

import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'


export const Certification = ({ navigation, route }: any) => {
  const { kind } = route.params;
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const { form, errors } = useRootState((state) => state.certificationForm);
  const dispatch = useDispatch();

  const [nameFocus, setNameFocus] = useState<boolean>(false);
  const [birthdayFocus, setBirthdayFocus] = useState<boolean>(false);
  const [phoneFocus, setPhoneFocus] = useState<boolean>(false);



  useEffect(() => {
    dispatch(setKind(kind));
  }, [kind])

  useEffect(() => {
    if (
      form.name &&
      form.phone &&
      form.birthday &&
      form.carrier !== '통신사 선택'
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [form])

  const goToNextStep = () => {
    if (form.birthday.length < 8) {
      return dispatch(setErrors({ name: 'birthday', value: '유효하지 않은 생년월일이에요.' }));
    }

    const month = Number(form.birthday.substr(4, 2));
    const day = Number(form.birthday.substr(6, 2));
    if (Number(month) > 12 || Number(month) < 1) {
      return dispatch(setErrors({ name: 'birthday', value: '유효하지 않은 생년월일이에요.' }))
    }
    if (Number(day) > 31 || Number(day) < 1) {
      return dispatch(setErrors({ name: 'birthday', value: '유효하지 않은 생년월일이에요.' }))
    }

    if (form.phone.length > 11 || form.phone.length < 10) {
      dispatch(setErrors({ name: 'phone', value: '유효하지 않은 휴대폰 번호예요.' }));
      return;
    }

    if (!validateBirthday(form.birthday)) {
      navigation.navigate('CertificationFailModal2');
      return;
    }

    navigation.navigate('policyAgreement');

    /** AppsFlyer 본인확인 확인 버튼 onclick start **/
    async function afMyConfirm() {
      let deviceId = await Storage.getItem('@deviceId');
      const appsFleyer = 'af_my_confirm';
      const appsFleyerValues = {
        af_device_id: deviceId,
      }

      try {
        var result = await appsFlyer.logEvent(
          appsFleyer,
          appsFleyerValues
        )
        console.log("AppsFlyer af_my_confirm Result : " + result + ' deviceId : ' + deviceId);
      } catch (error) {
        console.log("AppsFlyer af_my_confirm Error  : " + error);
      }
    }
    afMyConfirm()
    /** AppsFlyer 본인확인 확인 버튼 onclick end **/



  }

  const validateBirthday = useCallback((birthday: string) => {
    const year = Number(birthday.substr(0, 4));
    const month = Number(birthday.substr(4, 2));
    const day = Number(birthday.substr(6, 2));

    const now = new Date();
    const birthDate = new Date(year, month - 1, day);

    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) age--;

    return age >= 14;

  }, []);

  return (
    <Layout bottomTab={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <GoBack navigation={navigation} />

        <Title />

        <Forms
          navigation={navigation}
          nameFocus={nameFocus}
          setNameFocus={setNameFocus}
          birthdayFocus={birthdayFocus}
          setBirthdayFocus={setBirthdayFocus}
          phoneFocus={phoneFocus}
          setPhoneFocus={setPhoneFocus}
        />

      </ScrollView>
      {Platform.OS === 'ios' && (birthdayFocus || phoneFocus) && (
        <Button
          borderRadius={0}
          borderTopWidth={'1px'}
          borderColor={'#ffffff'}
          onPress={() => Keyboard.dismiss()}
          h={'50px'}
          bg={'#10CFC9'}
        >
          <Text color="white" size={'buttonM'}>확인</Text>
        </Button>
      )}
      </KeyboardAvoidingView>
      <FooterBtn formFilled={formFilled} goToNextStep={goToNextStep} />
    </Layout>
  );
};
