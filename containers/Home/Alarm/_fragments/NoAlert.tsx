import React from 'react';

import { Box, Center, Flex, Text } from 'native-base'
import { Image } from 'react-native';

import { NoAlertProps } from 'interfaces/home.type';

const NoAlert = (props: any) => {
  const { parent } = props;

  return (
    <Flex
      flex={1}
      position={'absolute'}
      left={0}
      right={0}
      top={'44%'}
    >
      <Flex alignItems={'center'}>
        {parent === 'NTT01' ? (
          <>
            <Image
              style={{ width: 120, height: 120 }}
              source={require('assets/images/alarm_none.png')}
            />
            <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
              자산 변동과 거래에 대한{'\n'}
              알림이 표시됩니다.
            </Text>
          </>
        ) : (
          <>
            <Image
              style={{ width: 120, height: 120 }}
              source={require('assets/images/promotion_none.png')}
            />
            <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
              이벤트와 혜택에 대한{'\n'}
              알림이 표시됩니다.
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NoAlert;
