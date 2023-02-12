import React from 'react';

import { Box, Flex, ScrollView, Text } from 'native-base';
import { Image } from 'react-native';

import {
  AlarmContentProps,
  AlarmContentsType,
  AlarmInnerType,
} from 'interfaces/home.type';

const PromotionContents = (props: AlarmContentProps) => {
  const { promotionContents } = props;

  return (
    <ScrollView
      zIndex={9}
      pt={'40px'}
      scrollIndicatorInsets={{ top: 1, bottom: 1 }}
      contentInsetAdjustmentBehavior={'always'}
    >
      {promotionContents?.map((data: AlarmContentsType, index: number) => (
        <Flex
          key={index}
          mb={index === promotionContents?.length - 1 ? '50px' : '20px'}
          borderBottomWidth={
            index === promotionContents?.length - 1 ? '0' : '1px'
          }
          borderBottomColor={'gray.300'}
        >
          <Text size={'textL'} mb={'15px'}>
            {data?.date}
          </Text>
          {data?.alert.map((item: AlarmInnerType, i: number) => (
            <Flex key={i} direction={'row'} w={'100%'} mb={'20px'}>
              <Box w={'40px'} mr={'15px'}>
                <Image
                  source={
                    item?.title === '구매혜택'
                      ? require('assets/images/promotion1.png')
                      : item?.title === '프로모션'
                      ? require('assets/images/promotion2.png')
                      : ''
                  }
                  style={{ width: 40, height: 40 }}
                />
              </Box>
              <Box flex={1}>
                <Text size={'titleS'}>{item?.title}</Text>
                <Text size={'textM'}>{item?.content}</Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      ))}
    </ScrollView>
  );
};

export default PromotionContents;
