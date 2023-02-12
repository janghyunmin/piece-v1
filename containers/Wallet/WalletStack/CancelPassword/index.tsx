import React, { useCallback, useEffect, useState } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base'

import Layout from "components/Layout";
import NumbuerPad from "components/NumberPad";

import BioFingerPrintIcon from 'components/Icons/BioFingerPrintIcon'
import BioFaceIDIcon from 'components/Icons/BioFaceIDIcon'
import {
  authenticateAsync,
  LocalAuthenticationResult,
} from 'expo-local-authentication'
import BioCircleCheckIcon from 'components/Icons/BioCircleCheckIcon'
import BioCircleCheckActiveIcon from 'components/Icons/BioCircleCheckActiveIcon'
import useDeviceBio from 'hooks/useDeviceBio'
import { cancelPurchase } from 'apis/Purchase';
import { useMutation, useQueryClient } from 'react-query';
import { postMemberPinVerification } from 'apis/Member'
import { setIsFido } from 'features/authSlice'
import { useDispatch } from 'react-redux'
import Header from 'containers/Home/Password/_fragments/Header'
import * as Haptics from 'expo-haptics';
import Storage from '@react-native-async-storage/async-storage';
import useIsFido from 'hooks/useIsFido';


const CancelPassword = ({ navigation, route }: any) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const isFido = useIsFido();
  const [useBio, setUseBio] = useState<boolean>(false);
  const deviceBio = useDeviceBio();
  const queryClient = useQueryClient();

  useEffect(() => {
    Storage.getItem('@isFido').then((isFido) => {
      if (!!deviceBio && isFido === 'Y') handleBioAuthentication();
    })
  }, [deviceBio, isFido]);

  const handleBioAuthentication = useCallback(() => {
    authenticateAsync({
      promptMessage: '피스 생체인증'
    }).then((res: LocalAuthenticationResult) => {
      if (res.success) {
        mutation.mutate();
      }
    });
  }, []);

  const [random, setRandom] = useState<number>(+new Date());

  const [password, setPassword] = useState<string>('');
  const [passwordIncorrect, setPasswordIncorrect] = useState<string>('');

  const pressPassword = (data: string) => {
    if (passwordIncorrect) setPasswordIncorrect('');
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = () => {
    setIsLoading(true);
    postMemberPinVerification({ pinNumber: password })
      .then((_) => {
        if (useBio) {
          authenticateAsync({
            promptMessage: '피스 생체인증'
          })
            .then((res) => {
              if (res.success) {
                Storage.setItem('@isFido', 'Y');
                dispatch(setIsFido('Y'));
              }
              mutation.mutate();
              setIsLoading(false);
            })
            .catch((err) => setIsLoading(false));
          return;
        }
        mutation.mutate();
        setIsLoading(false);
      })
      .catch((err) => {
        Haptics.notificationAsync();
        setPasswordIncorrect('비밀번호가 일치하지 않아요.');
        setRandom(+new Date());
        resetPassword();
        setIsLoading(false);
      })
  }

  const mutation = useMutation(
    () => cancelPurchase({ portfolioId: item.portfolioId, purchaseId: item.purchaseId }),
    {
      onSuccess: (res) => {
        navigation.navigate('OwnPiece', { item, isCanceled: true });
        queryClient.invalidateQueries(['Account']);
        queryClient.invalidateQueries(['Deposit']);
        queryClient.invalidateQueries(['Purchases', 'PUS0102']);
      },
      onError: (err: any) => console.warn(err?.respones?.data),
    }
  );

  return (
    <Layout>
      <Flex flex={1} justifyContent="space-between">
        <Header navigation={navigation} password={password} passwordIncorrect={passwordIncorrect} />

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
            isDisabled={mutation.isLoading || isLoading}
            random={random}
            setNumber={pressPassword}
            deleteNumber={deletePassword}
            reset={resetPassword}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default CancelPassword;