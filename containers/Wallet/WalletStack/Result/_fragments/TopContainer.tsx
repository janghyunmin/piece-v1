import React from 'react';
import LottieView from 'lottie-react-native';

import { Box, Flex, Text, Image } from 'native-base';
import { comma } from 'utils/comma';

const TopContainer = (props: any) => {
  const { type, status, success } = props;

  return (
    <Box w={'100%'}>
      {/* <Image /> */}
      <Flex w={'100%'} alignItems={'center'} mb={'15px'}>
        {success ? (
          // <LottieView
          //   style={{ width: 150, height: 150 }}
          //   source={require('assets/lottie/success.json')}
          //   autoPlay
          //   loop={true}
          // />
          <Image
            source={require('assets/images/withdraw_complete_lopping.gif')}
            w={'200px'}
            h={'200px'}
            alt={'withdraw'}
          />
        ) : (
          <Image
            source={require('assets/images/fail.png')}
            w={'200px'}
            h={'200px'}
            alt={'fail'}
          />
        )}
      </Flex>

      <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
        {type && success
          ? '출금 신청이 완료되었어요'
          : type && !success
          ? '출금에 실패했어요'
          : !type && success
          ? '입금이 완료되었어요'
          : !type && !success
          ? '입금에 실패했어요'
          : ''}
        {/* 네트워크 오류로 충전에 실패했어요
잠시 후 다시 시도해주세요 */}
      </Text>
      <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
        {type && success
          ? `입금까지 영업일 기준 1일 정도 소요됩니다.`
          : type && !success
          ? '네트워크 오류로 출금에 실패했어요\n잠시 후 다시 시도해주세요'
          : !type && success
          ? `피스머니 ${comma(status)}원이 충전되었어요`
          : !type && !success
          ? '네트워크 오류로 충전에 실패했어요\n잠시 후 다시 시도해주세요'
          : ''}
      </Text>
    </Box>
  );
};

export default TopContainer;
