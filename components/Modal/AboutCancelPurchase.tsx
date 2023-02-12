import React from 'react';

import { Box, Flex, Text, Pressable } from 'native-base';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';

const AboutCancelPurchase = ({ navigation, route }: any) => {
  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        pt={'30px'}
        px={'16px'}
        pb={`30px`}
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'30px'}
        >
          <Box w={'20px'} h={'20px'}></Box>
          <Text size="titleL">구매 취소?</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <CloseGrayIcon />
          </Pressable>
        </Flex>

        <Box
          pb={'30px'}
          mb={'30px'}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.300'}
        >
          <Text size={'textM'} color={'gray.700'}>
            구매 취소가 가능한 조각이라 함은 구매 취소 기간에 진입한 조각으로,
            구매 기간이 만료되거나 조기 완판된 시점으로 부터 전자 상거래 기준
            7일 간 자유롭게 거래를 취소할 수 있는 조각을 의미합니다.
          </Text>
        </Box>

        <Flex direction={'row'} pl={'5px'}>
          <Text
            color={'gray.700'}
            mr={'5px'}
            fontSize={'25px'}
            lineHeight={'25px'}
          >
            {'\u2022'}
          </Text>
          <Text size={'textM'} color={'gray.700'} flex={1}>
            구매를 취소한 조각의 지분은 양도 이전의 소유주인 바이셀 스탠다드가
            소유하게 됩니다.
          </Text>
        </Flex>

        <Flex direction={'row'} pl={'5px'} mb={'20px'}>
          <Text
            color={'gray.700'}
            mr={'5px'}
            fontSize={'25px'}
            lineHeight={'25px'}
          >
            {'\u2022'}
          </Text>
          <Text size={'titleM'} color={'warning.500'} flex={1}>
            구매 취소시 해당 상품은 재구매가 불가능합니다
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AboutCancelPurchase;
