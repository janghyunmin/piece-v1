import React, { useState } from 'react';

import { Box, Text, VStack } from 'native-base';

const Withdrawal2Top = () => {
  const [checkList] = useState<string[]>([
    '피스에서 관리했던 회원님의 모든 개인정보를 다시 볼 수 없어요.',
    '소유한 조각, 거래 내 모든 정보가 삭제돼요.',
    '결제가 취소된 금액을 돌려받을 계좌가 필요해요.',
    '예치금을 다른 계좌로 옮겨 주세요.',
    '다양한 혜택과 이벤트 정보를 더 이상 받을 수 없어요.',
    '회원 탈퇴 시 90일간 재가입이 불가능해요.',
  ]);

  return (
    <Box bgColor={'white'} mb={'10px'} pb={'40px'} px={'16px'}>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        회원 탈퇴
      </Text>
      <Text size={'textS'} color={'gray.600'} mb={'20px'}>
        탈퇴하기 전에 꼭 확인해 주세요
      </Text>

      <VStack space={'10px'} bgColor={'gray.200'} p={'10px'}>
        {checkList.map((data, index) => (
          <Text
            key={index}
            size={'captionM'}
            fontWeight={index === checkList.length - 1 ? '700' : '400'}
            color={index === checkList.length - 1 ? '#ff6060' : 'gray.600'}
          >
            · {data}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default Withdrawal2Top;
