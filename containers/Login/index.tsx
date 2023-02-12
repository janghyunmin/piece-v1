import React, { useCallback, useEffect, useState } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base'

import LoginHeader from "./_fragments/LoginHeader";
import Layout from "components/Layout";
import NumbuerPad from "components/NumberPad";

import { postMemberPinVerification, updateMember } from 'apis/Member'
import { useDispatch } from 'react-redux'
import BioFingerPrintIcon from 'components/Icons/BioFingerPrintIcon'
import BioFaceIDIcon from 'components/Icons/BioFaceIDIcon'
import {
  authenticateAsync,
  LocalAuthenticationResult,
} from 'expo-local-authentication'
import BioCircleCheckIcon from 'components/Icons/BioCircleCheckIcon'
import BioCircleCheckActiveIcon from 'components/Icons/BioCircleCheckActiveIcon'
import { setIsFido } from 'features/authSlice'
import useDeviceBio from 'hooks/useDeviceBio'
import * as Haptics from 'expo-haptics';
import useIsFido from 'hooks/useIsFido';

import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'






 /** AppsFlyer 간편 비밀번호 입력 start **/
 async function afPinInput() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');

  const appsFleyerReauth = 'af_pin_input';
  const appsFleyerReauthValues = {
    af_device_id: deviceId,
    af_member_id: memberId,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerReauth,
      appsFleyerReauthValues
    )
    console.log("AppsFlyer af_pin_input Result : " + result + ' deviceId : ' + deviceId);
  } catch (error) {
    console.log("AppsFlyer af_pin_input Error  : " + error);
  }
}
/** AppsFlyer 간편 비밀번호 입력 end **/



export const Login = ({ navigation, route }: any) => {
  const [useBio, setUseBio] = useState<boolean>(false);
  const deviceBio = useDeviceBio();
  const dispatch = useDispatch();
  const isFido = useIsFido();



  useEffect(() => {
    if (route.params?.unFido) return;
    if (!!deviceBio && isFido === 'Y') handleBioAuthentication();
  }, [deviceBio, isFido])

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBioAuthentication = useCallback(() => {
    authenticateAsync({
      promptMessage: '피스 생체인증'
    }).then((res: LocalAuthenticationResult) => {
      if (res.success) {
        Storage.setItem('@isLogin', 'true');
        navigation.reset({
          index: 0,
          routes: [
            { name: 'StackNavigation', params: { screen: 'tab' } },
          ],
        });
      }
    });
  }, []);

  const [password, setPassword] = useState<string>('');
  const [passwordIncorrect, setPasswordIncorrect] = useState<string>('');

  const pressPassword = (data: string) => {
    setPassword((cur: string) => cur.length < 6 ? cur+data : cur);
  }

  const deletePassword = () => {
    setPassword((cur) => cur.substr(0, cur.length-1));
  }

  const resetPassword = () => {
    setPassword('');
  }

  useEffect(() => {
    if (password.length === 6) handleSubmit();
  }, [password])

  const handleSubmit = () => {
    setIsLoading(true);
    postMemberPinVerification({ pinNumber: password })
      .then((_) => {
        if (useBio) {
          authenticateAsync({
            promptMessage: '피스 생체인증',
          })
            .then((res) => {
              if (res.success) {
                updateMember({isFido: 'Y'}).then((res) => {
                  Storage.setItem('@isLogin', 'true');
                  navigation.reset({
                    index: 0,
                    routes: [
                      { name: 'StackNavigation', params: { screen: 'tab' } },
                    ],
                  });
                  Storage.setItem('@isFido', 'Y');
                  dispatch(setIsFido('Y'));
                })
              } else {
                Storage.setItem('@isLogin', 'true');
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: 'StackNavigation', params: { screen: 'tab' } },
                  ],
                });
              }
              setIsLoading(false);
            })
            .catch((err) => setIsLoading(false));
          return;
        }
        Storage.setItem('@isLogin', 'true');
        navigation.reset({
          index: 0,
          routes: [
            { name: 'StackNavigation', params: { screen: 'tab' } },
          ],
        });
        resetPassword();
        setIsLoading(false);


        // appsFlyer 로그인 기록 있고 간편비밀번호만 입력하고 들어왔을경우 실행
        afPinInput()
      
      })
      .catch((err) => {
        Haptics.notificationAsync();
        setPasswordIncorrect('비밀번호가 일치하지 않아요.');
        resetPassword();
        navigation.navigate('LoginFailModal');
        setIsLoading(false);
      })
  }

  return (
    <Layout>
      <Flex flex={1} justifyContent="space-between">
        <LoginHeader password={password} passwordIncorrect={passwordIncorrect} />

        {!!deviceBio && isFido === 'Y' && (
          deviceBio === 1 ? (
            <Pressable
             onPress={handleBioAuthentication}
            >
              <Flex alignItems={'center'}>
                <Box mb={'13px'}>
                  <BioFingerPrintIcon />
                </Box>
                <Text size={'captionM'} color={'gray.800'}>
                  지문 인증
                </Text>
              </Flex>
            </Pressable>
          ) : deviceBio === 2 ? (
            <Pressable
              onPress={handleBioAuthentication}
            >
              <Flex alignItems={'center'}>
                <Box mb={'13px'}>
                  <BioFaceIDIcon />
                </Box>
                <Text size={'captionM'} color={'gray.800'}>
                  Face ID
                </Text>
              </Flex>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleBioAuthentication}
            >
              <Flex alignItems={'center'}>
                <Box mb={'13px'}>
                  안드로이드 생체인증 아이콘
                </Box>
                <Text size={'captionM'} color={'gray.800'}>
                  생체 인증
                </Text>
              </Flex>
            </Pressable>
          )
        )}

        <Box>
          {!!deviceBio && isFido === 'N' && (
            <Pressable onPress={() => setUseBio(!useBio)}>
              <Flex direction={'row'} justifyContent={'center'} alignItems={'center'} mb={'20px'}>
                {useBio ? <BioCircleCheckActiveIcon /> : <BioCircleCheckIcon />}
                <Box px={'3px'} />
                <Text size={'captionM'} bold={useBio} color={useBio ? 'primary.500' : 'gray.500'}>다음부터 생체 인증 사용</Text>
              </Flex>
            </Pressable>
          )}
          <NumbuerPad
            isRandom
            isDisabled={isLoading}
            setNumber={pressPassword}
            deleteNumber={deletePassword}
            reset={resetPassword}
          />
        </Box>
      </Flex>
    </Layout>
  );
};
