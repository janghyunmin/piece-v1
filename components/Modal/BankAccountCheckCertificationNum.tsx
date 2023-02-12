import React, { useEffect, useState } from 'react';

import { Box, Flex, Button, Text, Input, Pressable } from 'native-base';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAvoidingView, Platform } from 'react-native';

import BankAccountCheckCertificationNumInner from 'components/_modalFragments/BankAccountCheckCertificationNumInner';
import { createMemberAccount, updateMemberAccount } from 'apis/Member'
import { useQueryClient } from 'react-query'

const bottomHeight = getBottomSpace();

const BankAccountCheckCertificationNum = ({ navigation, route }: any) => {
  const { bankAccount, bankName, bankCode, image, isCreate } = route.params;
  const updateOrCreateMemberAccount = isCreate ? createMemberAccount : updateMemberAccount;

  // 인증번호
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  // 인증번호 맞는지
  const [certificationNumberIncorrect, setCertificationNumberIncorrect] =
    useState<string>('');
  // 타이머
  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(59);
  const [timer, setTimer] = useState<string>('');

  useEffect(() => {
    setTimer('03:00');
  }, []);

  // 타이머
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      let min: string | number = minutes;
      let sec: string | number = seconds;
      if (min < 10) {
        min = `0${min}`;
      } else {
        min = JSON.stringify(min);
      }
      if (sec < 10) {
        sec = `0${sec}`;
      } else {
        sec = JSON.stringify(sec);
      }
      setTimer(`${min}:${sec}`);
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  // 인증번호 입력하면 유효성 메세지 없어짐
  useEffect(() => {
    if (certificationNumber !== '') {
      setCertificationNumberIncorrect('');
    }
  }, [certificationNumber]);

  // 인증번호 입력 로직
  const completeCertificate = () => {
    if (certificationNumber === '') {
      return setCertificationNumberIncorrect('인증번호를 입력해주세요');
    }
    if (certificationNumber !== '1234') {
      return setCertificationNumberIncorrect('유효하지 않은 인증번호예요.');
    }
    const req = {
      bankCode: bankCode,
      accountNo: bankAccount,
    };
    updateOrCreateMemberAccount(req)
      .then((res) => {
        navigation.navigate('registerComplete', {
          accountInfo: {
            bankAccount: bankAccount,
            bankName: bankName,
            image: image,
          },
        });
      })
      .catch((err) => console.log('에러: ', err));
  };

  // 재전송
  const handleTimerReset = () => {
    setTimer('03:00');
    setMinutes(2);
    setSeconds(59);
    setCertificationNumber('');
  };

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior={'padding'}>
          <Box
            bgColor={'white'}
            borderTopLeftRadius={'20px'}
            borderTopRightRadius={'20px'}
            pt={'30px'}
            px={'16px'}
            pb={`${bottomHeight}px`}
          >
            <BankAccountCheckCertificationNumInner
              timer={timer}
              certificationNumber={certificationNumber}
              setCertificationNumber={setCertificationNumber}
              certificationNumberIncorrect={certificationNumberIncorrect}
              handleTimerReset={handleTimerReset}
              completeCertificate={completeCertificate}
              navigation={navigation}
            />
          </Box>
        </KeyboardAvoidingView>
      ) : (
        <Box
          bgColor={'white'}
          borderTopLeftRadius={'20px'}
          borderTopRightRadius={'20px'}
          pt={'30px'}
          px={'16px'}
          pb={'30px'}
        >
          <KeyboardAvoidingView behavior={'height'}>
            <BankAccountCheckCertificationNumInner
              timer={timer}
              certificationNumber={certificationNumber}
              setCertificationNumber={setCertificationNumber}
              certificationNumberIncorrect={certificationNumberIncorrect}
              handleTimerReset={handleTimerReset}
              completeCertificate={completeCertificate}
              navigation={navigation}
            />
          </KeyboardAvoidingView>
        </Box>
      )}
    </Flex>
  );
};

export default BankAccountCheckCertificationNum;
