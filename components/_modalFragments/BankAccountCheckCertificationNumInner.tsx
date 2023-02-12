import React from 'react';

import { Box, Button, Flex, Input, Pressable, Text } from 'native-base'
import CloseGrayIcon from 'components/Icons/CloseGrayIcon'

const BankAccountCheckCertificationNumInner = (props: any) => {
  const {
    timer,
    certificationNumber,
    setCertificationNumber,
    certificationNumberIncorrect,
    handleTimerReset,
    completeCertificate,
    navigation,
  } = props;

  return (
    <>
      <Box mb={'30px'}>
        {/*<Text*/}
        {/*  size={'titleL'}*/}
        {/*  textAlign={'center'}*/}
        {/*  mb={'10px'}*/}
        {/*  color={'gray.800'}*/}
        {/*>*/}
        {/*  인증번호 입력*/}
        {/*</Text>*/}
        {/*<Text size={'captionM'} color={'warning.500'} textAlign={'center'}>*/}
        {/*  {timer}*/}
        {/*</Text>*/}
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
          {timer}
        </Text>
      </Box>

      <Box mb={'30px'} position={'relative'}>
        <Input
          keyboardType={'number-pad'}
          value={certificationNumber}
          onChangeText={(text) =>
            setCertificationNumber(text.replace(/[^0-9]/g, ''))
          }
          type="text"
          padding={0}
          variant={certificationNumberIncorrect === '' ? 'underlined' : 'warn'}
          placeholder={'입금 내역에 표시된 숫자 4자리'}
          h={'52px'}
        />
        <Pressable
          h={'52px'}
          justifyContent={'center'}
          position={'absolute'}
          top={'0'}
          right={'0'}
          onPress={handleTimerReset}
        >
          <Text size={'buttonM'} color={'primary.500'}>
            재전송
          </Text>
        </Pressable>
        {certificationNumberIncorrect !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {certificationNumberIncorrect}
          </Text>
        )}
      </Box>

      <Button
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        isDisabled={certificationNumber.length === 0}
        onPress={completeCertificate}
        borderRadius={'10px'}
        h={'48px'}
      >
        <Text color={'white'} size={'buttonM'}>
          확인
        </Text>
      </Button>
    </>
  );
};

export default BankAccountCheckCertificationNumInner;
