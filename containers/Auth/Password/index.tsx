import React, { useEffect, useState } from "react";

import { Platform } from "react-native";
import { Flex, Text } from "native-base";

import PasswordHeader from "./_fragments/PasswordHeader";
import Layout from "components/Layout";
import NumbuerPad from "components/NumberPad";

import { PasswordBox } from "interfaces/auth.type";
import { useRootState } from "hooks/useRootState";
import { postMemberJoin, postMemberPin } from 'apis/Member'
import { useDispatch } from "react-redux";
import { setAuth } from 'features/authSlice'
import { initForm } from 'features/certificationFormSlice'
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

interface ConsentType {
  consentCode: string;
  isAgreement: string;
}

  /** AppsFlyer 회원가입 완료 start **/
  async function af_SignUp() {
    let deviceId = await Storage.getItem('@deviceId');
    const appsFleyerSignUp = 'af_signUp';
    const appsFleyerSignUpValues = {
      af_device_id: deviceId,
    }

    try {
      var result = await appsFlyer.logEvent(
        appsFleyerSignUp,
        appsFleyerSignUpValues
      )
      console.log("AppsFlyer af_signUp Result : " + result + ' deviceId : ' + deviceId);
    } catch (error) {
      console.log("AppsFlyer af_signUp Error  : " + error);
    }
  }
  /** AppsFlyer 회원가입 완료 end **/

export const Password = ({ navigation, route }: any) => {
  const { kind, form } = useRootState((state) => state.certificationForm);
  const device = useRootState((state) => state.device)

  const dispatch = useDispatch();

  const [random, setRandom] = useState<number>(+new Date());

  const [step, setStep] = useState<1|2>(1);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordIncorrect, setPasswordIncorrect] = useState<string>('');

  const pressPassword = (setPassword: any) => (data: string) => {
    if (passwordIncorrect) setPasswordIncorrect('');
    setPassword((cur: string) => cur.length < 6 ? cur+data : cur);
  }

  const deletePassword = (setPassword: any) => () => {
    setPassword((cur: string) => cur.substr(0, cur.length-1));
  }

  const resetPassword = (setPassword: any) => () => {
    setPassword('');
  }

  useEffect(() => {
    setRandom(+new Date());
  }, [step]);


  useEffect(() => {
    if (password.length === 6) setStep(2);
  }, [password])

  useEffect(() => {
    if (passwordConfirm.length === 6) {
      if (password !== passwordConfirm) {
        setPasswordIncorrect('간편 비밀번호가 달라요.');
        setPassword('');
        setPasswordConfirm('');
        setStep(1)
        return;
      }
      if (kind === 'SIGNUP') handleRegister();
      if (kind === 'RESET_PASSWORD') handleResetPassword();
    }
  }, [passwordConfirm])

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRegister = () => {
    const body = {
      name: form.name,
      cellPhoneNo: form.phone,
      birthDay: form.birthday.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3"),
      token: form.token,
      ci: form.ci,
      di: form.di,
      gender: form.gender === "남자" ? "M" : "F",
      pinNumber: password,
      consents: form.consentList.map((consent) => ({
        consentCode: consent.consentCode,
        consentGroup: consent.consentGroup,
        isAgreement: consent.checked ? "Y" : "N",
      })),
      device: {
        deviceOs: Platform.OS === "ios" ? "MDO0102" : "MDO0101",
        deviceId: device.id,
        // fcmToken: device.token ? device.token : null,
        fcmToken: device.token ? device.token : device.token,
      },
    };
    setIsLoading(true);
    postMemberJoin(body)
      .then(async (res) => {
        await Storage.setItem('@auth', JSON.stringify(res));
        await Storage.setItem('@isLogin', 'true');
        dispatch(setAuth(res));
        navigation.reset({routes: [{ name: 'SignUpComplete' }]});
        setIsLoading(false);

        // 회원가입 완료시 count
        af_SignUp()
      })
      .catch((err) => {
        console.warn('회원가입 실패!', err);
        setIsLoading(false);
      });
  }

  const handleResetPassword = () => {
    setIsLoading(true);
    postMemberPin({ pinNumber: password })
      .then((res) => {
        dispatch(initForm());
        navigation.reset({routes: [{ name: 'tab' }]});
        setIsLoading(false);
      })
      .catch((err) => {
        setPasswordIncorrect('현재 비밀번호와 다르게 입력해 주세요.');
        setPassword('');
        setPasswordConfirm('');
        setStep(1);
        setIsLoading(false);
      });
  }

  return (
    <Layout>
      <Flex flex={1} justifyContent="space-between">
        <PasswordHeader
          step={step}
          password={step === 1 ? password : passwordConfirm}
          passwordIncorrect={passwordIncorrect}
          navigation={navigation}
          route={route}
        />

        <NumbuerPad
          isRandom
          isDisabled={isLoading}
          random={random}
          setNumber={step === 1 ? pressPassword(setPassword) : pressPassword(setPasswordConfirm)}
          deleteNumber={step === 1 ? deletePassword(setPassword) : deletePassword(setPasswordConfirm)}
          reset={step === 1 ? resetPassword(setPassword) : resetPassword(setPasswordConfirm)}
        />
      </Flex>
    </Layout>
  );
};
