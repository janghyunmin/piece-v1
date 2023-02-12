import React from 'react';

import { Box, Flex, Spinner, Text } from 'native-base';
import { Image } from 'react-native';
import LottieView from 'lottie-react-native';

const FailMessageMapper: any = {
  PUR0102: '최대 구매 가능 수량 초과\n최대 구매 가능 수량을 확인해 주세요.',
  PUR0103: '잔여조각 부족\n남은 조각을 확인해 주세요.',
  PUR0104: '예치금 잔액 부족\n예치금을 확인해 주세요.',
  PRS0103: '조각완판\n다음에는 꼭 성공하실 거에요!',
}

const TopContainer = (props: any) => {
  const { item, purchasePieceVolume, statusCode } = props;

  return (
    <Box w={'100%'}>
      <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
        {statusCode === 'PUR0100' ? (
          // <Flex justifyContent={'center'} w={'200px'} h={'200px'}>
          //   <Spinner size={'lg'} color={'primary.500'} />
          // </Flex>
          // <Image
          //   style={{ width: 200, height: 200 }}
          //   source={require('assets/images/purchase_wait.gif')}
          // />
          <Flex justifyContent={'center'} w={'200px'} h={'200px'}>
            <LottieView
              style={{ width: 200 }}
              source={require('assets/lottie/progress_bar.json')}
              autoPlay
              loop
            />
          </Flex>
        ) : statusCode === 'PUR0101' ? (
          <Image
            style={{ width: 200, height: 200 }}
            source={require('assets/images/purchase_complete_lopping.gif')}
          />
        ) : (
          <Image
            style={{ width: 200, height: 200 }}
            source={require('assets/images/fail.png')}
          />
        )}
      </Flex>

      <Text size={'textXL'} textAlign={'center'} mb={'10px'}>
        {statusCode === 'PUR0100' ? (
          '안전한 구매를 위해\n조금만 기다려 주세요.'
        ) : statusCode === 'PUR0101' ? (
          `${item.title}\n${purchasePieceVolume} 피스가 안전하게 구매 되었어요!`
        ) : (
          '구매에 실패했어요.'
        )}
      </Text>
      {FailMessageMapper[statusCode] && (
        <Text size={'textS'} color={'gray.600'} textAlign={'center'}>
          {FailMessageMapper[statusCode]}
        </Text>
      )}
    </Box>
  );
};

export default TopContainer;
