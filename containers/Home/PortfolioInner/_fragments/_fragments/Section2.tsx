import React from 'react';

import { Box, Flex, HStack, ScrollView, Text, Image } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native';

import { PortfolioInnerSection2Props } from 'interfaces/home.type';
import Point1Icon from 'components/Icons/Point1Icon'
import Point2Icon from 'components/Icons/Point2Icon'
import Point3Icon from 'components/Icons/Point3Icon'
import Point4Icon from 'components/Icons/Point4Icon'

const statusBarHeight = getStatusBarHeight();
const top =
  (Dimensions.get('screen').height * 0.73892 - statusBarHeight) * 0.15;

const Section2 = ({item}: any) => {

  return (
    <Box py={'20px'} bgColor={'white'} px={'16px'} mb={'10px'}>
      <Text size={'titleL'} mb={'20px'}>
        구매 포인트
      </Text>

      <Flex
        w={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        bgColor={'gray.100'}
        p={'20px'}
        borderRadius={'10px'}
      >
        {item.guides.map((guide: any) => (
          <Flex
            key={guide.guideId}
            alignItems={'center'}
            w={'70px'}
          >
            <Image
              size={'40px'}
              key={guide.guideId}
              source={{ uri: guide.guideIconPath }}
              alt={guide.guideName}
            />
            <Text size={'titleS'} color={'secondary.700'}>
              {guide.guideName}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Section2;
