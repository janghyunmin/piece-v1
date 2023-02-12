import React, { useEffect, useMemo, useState } from 'react'

import { Box, Button, Flex, Input, KeyboardAvoidingView, Pressable, Text } from 'native-base'

import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { confirmBankVerificationCode, createBankAccount, sendBankVerificationCode } from 'apis/Bank'

const VirtualBankCertification = ({ navigation, route }: any) => {
  const [mchtTrdNo, setMchtTrdNo] = useState(route.params.mchtTrdNo);
  const [trdNo, setTrdNo] = useState<string>('');
  const [trdNoIncorrect, setTrdNoIncorrect] = useState<string>('');
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handlePress = () => {
    setIsLoading(true);
    confirmBankVerificationCode(trdNo, mchtTrdNo)
      .then((res) => {
        createBankAccount(mchtTrdNo, { trdAmt: route.params.trdAmt })
          .then((res2) => {
            navigation.navigate('VirtualBankCreateComplete', {
              trdAmt: route.params.trdAmt,
              from: route.params.from,
            });
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
      })
      .catch((err) => {
        console.log(err.response.data);
        setTrdNoIncorrect('유효하지 않은 인증번호입니다.');
        setIsLoading(false);
      })
  };

  const handleRetry = () => {
    sendBankVerificationCode()
      .then((res) => {
        setTimer(180);
        setMchtTrdNo(res.data.mchtTrdNo);
      })
      .catch((err) => {

      })
  }

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box
          bgColor={'white'}
          borderTopLeftRadius={'20px'}
          borderTopRightRadius={'20px'}
          pt={'30px'}
          px={'16px'}
          pb={`${getBottomSpace()}px`}
        >
          <Box mb={'30px'}>
            <Flex
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={'10px'}
            >
              <Box w={'28px'} h={'28px'} />
              <Box>
                <Text
                  size={'titleL'}
                  textAlign={'center'}
                  color={'gray.800'}
                >
                  인증번호 입력
                </Text>
              </Box>
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
            <Text size={'captionM'} color={'warning.500'} textAlign={'center'}>
              {timerStr}
            </Text>
          </Box>

          <Box mb={'30px'} position={'relative'}>
            <Input
              keyboardType={'number-pad'}
              value={trdNo}
              onChangeText={(text) => {
                if (trdNoIncorrect) setTrdNoIncorrect('');
                setTrdNo(text)
              }}
              type="text"
              padding={0}
              variant={!trdNoIncorrect ? 'underlined' : 'warn'}
              placeholder={'전송된 인증번호 입력'}
              h={'52px'}
              maxLength={4}
            />
            <Pressable
              h={'52px'}
              justifyContent={'center'}
              position={'absolute'}
              top={'0'}
              right={'0'}
              onPress={handleRetry}
            >
              <Text size={'buttonM'} color={'primary.500'}>
                재전송
              </Text>
            </Pressable>
            {trdNoIncorrect !== '' && (
              <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
                {trdNoIncorrect}
              </Text>
            )}
          </Box>

          <Button
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
            isDisabled={!trdNo || !timer || isLoading}
            onPress={handlePress}
            borderRadius={'10px'}
            mb={'20px'}
            h={'48px'}
          >
            <Text color={'white'} size={'buttonM'}>
              확인
            </Text>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Flex>
  );
};

export default VirtualBankCertification;
