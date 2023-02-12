import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Flex, Button, Text, Input, Pressable } from 'native-base';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

import CertificationNumInner from 'components/_modalFragments/CertificationNumInner';
import { requestRetrySms } from 'apis/SMS';
import {
  getIsDi, updateMemberReauth,
  verifySms,
} from 'apis/Member'
import { RequestSmsType, RequestVerifySmsType } from 'apis/SMS/sms.type';
import { useRootState } from 'hooks/useRootState'
import { initForm, setForm } from 'features/certificationFormSlice'
import { useDispatch } from 'react-redux'

const bottomHeight = getBottomSpace();

const CertificationNum = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { kind, form } = useRootState((state) => state.certificationForm);

  // 인증번호
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  // 인증번호 맞는지
  const [certificationNumberIncorrect, setCertificationNumberIncorrect] =
    useState<string>('');
  // 타이머
  const [timer, setTimer] = useState<number>(180);

  useEffect(() => {
    const clearTimer = setInterval((() => {
      setTimer((cur) => cur > 0 ? cur - 1 : cur);
    }), 1000);
    return () => clearInterval(clearTimer);
  }, [])

  const timerStr = useMemo(() => {
    const minutes = String(parseInt(String(timer / 60))).padStart(2, '0');
    const seconds = String(timer%60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [timer])

  // 인증번호 입력하면 유효성 메세지 없어짐
  useEffect(() => {
    if (certificationNumber !== '') setCertificationNumberIncorrect('');
  }, [certificationNumber]);

  // 인증번호 입력 로직
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const completeCertificate = () => {
    if (certificationNumber === '') {
      return setCertificationNumberIncorrect('인증번호를 입력해주세요');
    }
    setIsLoading(true);
    requestVerifySmsMutation.mutate({
      txSeqNo: form.txSeqNo,
      otpNo: certificationNumber,
      telNo: form.phone,
    });
  };

  const requestVerifySmsMutation = useMutation(
    (_body: RequestVerifySmsType) => verifySms(_body),
    {
      onError: (err) => {
        setIsLoading(false);
        console.log('verifySms: ', err);
      },
      onSuccess: (res) => {
        // 본인 확인 실패
        if (res.data.rsltCd !== 'B000') {
          setIsLoading(false);
          return setCertificationNumberIncorrect('유효하지 않은 인증번호예요.');
        }
        // 회원가입
        if (kind === 'SIGNUP') {
          getIsDi(res.data.di)
            .then((res2) => {
              // 탈퇴 90일 이전
              if (!res2.isWithdrawalOver) {
                setIsLoading(false);
                return navigation.navigate('RegisterFail');
              }

              // 로그인 or 가입
              dispatch(setForm({ name: 'token', value: res.data.token }));
              dispatch(setForm({ name: 'ci', value: res.data.ci }));
              dispatch(setForm({ name: 'di', value: res.data.di }));
              // // 로그인
              // if (res2.isDi && !res2.isWithdrawal) navigation.navigate('CertificationComplete', { isLogin: true });
              // // 신규 가입 or 탈퇴 만료로 가입
              // else navigation.navigate('CertificationComplete', { isLogin: false });
              navigation.navigate('password')
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
            })
          return;
        }

        if (kind === 'RESET_PASSWORD') {
          navigation.navigate('password');
          setIsLoading(false);
          return;
        }

        if (kind === 'REAUTH') {
          updateMemberReauth({
            name: form.name,
            cellPhoneNo: form.phone,
            birthDay: form.birthday.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3"),
            token: res.data.token,
            ci: res.data.ci,
            di: res.data.di,
            gender: form.gender === "남자" ? "M" : "F",
            consents: form.consentList.map((consent) => ({
              consentCode: consent.consentCode,
              consentGroup: consent.consentGroup,
              isAgreement: consent.checked ? "Y" : "N",
            })),
          })
            .then((res2) => {
              dispatch(initForm());
              navigation.navigate('StackNavigation', {
                screen: 'MyInfo',
              });
              queryClient.invalidateQueries(['Member']);
              setIsLoading(false);
            })
            .catch((err) => {
              console.warn('재인증 실패', err);
              setIsLoading(false);
            })
          return;
        }
      },
    }
  );

  // 재전송
  const handleTimerReset = () => {
    // TODO: 테스터
    if (form.name === '테스터' && form.phone === '01012345678') {
      dispatch(setForm({ name: 'txSeqNo', value: 'TESTERtxSeqNo'}));
      setTimer(180);
      setCertificationNumber('');
      setCertificationNumberIncorrect('');
      return;
    }

    retrySms.mutate({
      name: form.name,
      birthday: form.birthday,
      sexCd: form.gender === '남자' ? 'M' : 'F',
      ntvFrnrCd: 'L',
      telComCd: telComCdFilter(form.carrier),
      telNo: form.phone,
      agree1: 'Y',
      agree2: 'Y',
      agree3: 'Y',
      agree4: 'Y',
    });
  };

  const telComCdFilter = useCallback((carrier: string): string => {
    if (carrier === 'SKT') return '01';
    if (carrier === 'KT') return '02';
    if (carrier === 'LG U+') return '03';
    if (carrier === 'SKT 알뜰폰') return '04';
    if (carrier === 'KT 알뜰폰') return '05';
    if (carrier === 'LG U+ 알뜰폰') return '06';
    return '';
  }, []);

  const retrySms = useMutation(
    (retry: RequestSmsType) => requestRetrySms(retry),
    {
      onError: (err) => console.log(err),
      onSuccess: (res) => {
        dispatch(setForm({ name: 'txSeqNo', value: res.data.txSeqNo }));
        setTimer(180);
        setCertificationNumber('');
        setCertificationNumberIncorrect('');
      },
    }
  );

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
            <CertificationNumInner
              timer={timer}
              timerStr={timerStr}
              certificationNumber={certificationNumber}
              setCertificationNumber={setCertificationNumber}
              certificationNumberIncorrect={certificationNumberIncorrect}
              handleTimerReset={handleTimerReset}
              completeCertificate={completeCertificate}
              navigation={navigation}
              isLoading={isLoading}
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
            <CertificationNumInner
              timer={timer}
              timerStr={timerStr}
              certificationNumber={certificationNumber}
              setCertificationNumber={setCertificationNumber}
              certificationNumberIncorrect={certificationNumberIncorrect}
              handleTimerReset={handleTimerReset}
              completeCertificate={completeCertificate}
              navigation={navigation}
              isLoading={isLoading}
            />
          </KeyboardAvoidingView>
        </Box>
      )}
    </Flex>
  );
};

export default CertificationNum;
