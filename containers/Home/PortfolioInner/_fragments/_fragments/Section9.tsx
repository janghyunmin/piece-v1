import React from 'react';

import { Box, Flex, List, Text } from 'native-base';

const Section9 = () => {
  return (
    <Box px={'16px'}>
      <Box p={'15px'} bgColor={'primary.50'}>
        <Text size={'titleM'} color={'primary.500'} mb={'5px'}>
          유의사항
        </Text>

        <Flex direction={'row'} pl={'1px'}>
          {/* <Text
            color={'gray.700'}
            mr={'5px'}
            fontSize={'25px'}
            lineHeight={'23px'}
          >
            {'\u2022'}
          </Text> */}
          <Text size={'textS'} color={'gray.700'} flex={1}>
            {/* • 주식회사 바이셀스탠다드는 구매금과 이익의 발생을 보장하지 않으며,
              손실에 대한 책임은 모두 구매자에게 있습니다. {'\n'}
              {'\n'}
            • 조각 구매대상이 되는 상품과 그 상품을 판매하는 판매자에 대한 충분한
              검수와 검증에 대한 책임은 당사에 있습니다.{'\n'} */}
              • 구매원금과 수익을 보장하지 않으며, 
                손실에 대한 책임은 모두 구매자에게 있습니다. {'\n'}
              • 조각구매 대상이 되는 상품과 그 상품을 등록하는 개별 판매자에 대한 충분한 검수와 검증에 대한 책임은 당사에 있습니다. {'\n'}
              • 전자상거래 등에서의 소비자보호에 관한 법률에 따라 계약을 체결한 소비자는 구매 후 7일 이내 청약을 철회 할 수 있습니다. {'\n'}
          </Text>
        </Flex>
        {/* <Flex direction={'row'} pl={'5px'}>
          <Text
            color={'gray.700'}
            mr={'5px'}
            fontSize={'25px'}
            lineHeight={'23px'}
          >
            {'\u2022'}
          </Text>
          <Text size={'textS'} color={'gray.700'} flex={1}>
            등록한 상품에 대한 직접적인 책임은 위탁설정비율에 따라 판매업체에게
            귀속됩니다.{'\n'}
          </Text>
        </Flex>
        <Flex direction={'row'} pl={'5px'}>
          <Text
            color={'gray.700'}
            mr={'5px'}
            fontSize={'25px'}
            lineHeight={'23px'}
          >
            {'\u2022'}
          </Text>
          <Text size={'textS'} color={'gray.700'} flex={1}>
            단, 조각구매대상이 되는 상품과 그 상품을 등록하는 개별 판매자에 대한
            충분한 검수와 검증에 대한 책임은 당사에 있습니다.
          </Text>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default Section9;
