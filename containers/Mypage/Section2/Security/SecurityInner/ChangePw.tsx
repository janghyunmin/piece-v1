import React, { useEffect, useState } from 'react';

import { Flex } from 'native-base';

import Layout from 'components/Layout';
import PasswordHeader from './_fragment/PasswordHeader';

import NumbuerPad from 'components/NumberPad'
import { postMemberPin, postMemberPinVerification } from 'apis/Member'
import { initForm } from 'features/certificationFormSlice'
import * as Haptics from 'expo-haptics';

const ChangePw = ({ navigation, route }: any) => {
  const [random, setRandom] = useState<number>(+new Date());

  const [step, setStep] = useState<1|2|3>(1);
  const [passwordCurrent, setCurrentPassword] = useState<string>('');
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (passwordCurrent.length === 6) {
      // 간편비밀번호 확인
      setIsLoading(true);
      postMemberPinVerification({ pinNumber: passwordCurrent })
        .then(() => {
          setStep(2);
          setIsLoading(false);
        })
        .catch(() => {
          Haptics.notificationAsync();
          setPasswordIncorrect('비밀번호가 일치하지 않아요.');
          setCurrentPassword('');
          setIsLoading(false);
        })
    }
  }, [passwordCurrent])

  useEffect(() => {
    if (password.length === 6) setStep(3);
  }, [password])

  useEffect(() => {
    if (passwordConfirm.length === 6) {
      if (password !== passwordConfirm) {
        Haptics.notificationAsync();
        setPasswordIncorrect('간편 비밀번호가 달라요.');
        setPassword('');
        setPasswordConfirm('');
        setStep(2);
        return;
      }
      handleSubmit();
    }
  }, [passwordConfirm])

  const handleSubmit = () => {
    setIsLoading(true);
    postMemberPin({ pinNumber: password })
      .then((res) => {
        navigation.navigate('pwChangeComplete');
        setIsLoading(false);
      })
      .catch((err) => {
        Haptics.notificationAsync();
        setPasswordIncorrect('현재 비밀번호와 다르게 입력해 주세요.');
        setPassword('');
        setPasswordConfirm('');
        setStep(2);
        setIsLoading(false);
      });
  }

  return (
    <Layout>
      <Flex flex={1} justifyContent="space-between">
        <PasswordHeader
          step={step}
          password={step === 1 ? passwordCurrent : step === 2 ? password : passwordConfirm}
          passwordIncorrect={passwordIncorrect}
          navigation={navigation}
          route={route}
        />

        <NumbuerPad
          isRandom
          isDisabled={isLoading}
          random={random}
          setNumber={step === 1
            ? pressPassword(setCurrentPassword)
            : step === 2
              ? pressPassword(setPassword)
              : pressPassword(setPasswordConfirm)}
          deleteNumber={step === 1
            ? deletePassword(setCurrentPassword)
            : step === 2
              ? deletePassword(setPassword)
              : deletePassword(setPasswordConfirm)}
          reset={step === 1
            ? resetPassword(setCurrentPassword)
            : step === 2
              ? resetPassword(setPassword)
              : resetPassword(setPasswordConfirm)
          }
        />
      </Flex>
    </Layout>
  );
};

export default ChangePw;
