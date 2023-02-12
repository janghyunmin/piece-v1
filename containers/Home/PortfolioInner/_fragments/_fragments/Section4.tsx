import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

import { Box, Flex, Pressable, Text } from 'native-base';

import { PortfolioInnerSection4Props } from 'interfaces/home.type';
import QuestionIcon from 'components/Icons/QuestionIcon';

const Section4 = (props: PortfolioInnerSection4Props) => {
  const { item, navigation } = props;

  return (
    <Box px={'16px'} mb={'20px'}>
      <Box p={'20px'} shadow={2} bgColor={'white'} borderRadius={'10px'}>
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'20px'}
        >
          <Flex direction={'row'} alignItems={'center'}>
            <Text size={'titleM'} color={'gray.700'}>
              PIECE 종합등급
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('portfolioInnerDesc', {
                  about: '종합등급',
                })
              }
            >
              <QuestionIcon />
            </Pressable>
          </Flex>
          <Text size={'titleL'} color={'gray.700'}>
            {item.generalGrade}등급
          </Text>
        </Flex>

        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex px={'10px'} alignItems={'center'}>
            <ProgressCircle
              percent={item.stabilityPoint ? Number(item.stabilityPoint) : 0}
              radius={40}
              borderWidth={6}
              color={'#66C8BD'}
              shadowColor="#E6F9FA"
              bgColor="#fff"
            >
              <Flex direction={'row'} alignItems={'flex-end'}>
                <Text
                  size={'titleM'}
                  color={'#66C8BD'}
                >
                  {item.stabilityPoint ?? 0}
                </Text>
                <Text
                  size={'captionS'}
                  color={'#66C8BD'}
                  pb={'3px'}
                >
                  점
                </Text>
              </Flex>
            </ProgressCircle>
            <Text size={'captionM'} color={'gray.600'} mt={'20px'}>
              안정성
            </Text>
          </Flex>
          <Flex px={'10px'} alignItems={'center'}>
            <ProgressCircle
              percent={item.cashabilityPoint ? Number(item.cashabilityPoint) : 0}
              radius={40}
              borderWidth={6}
              color={'#51A7E7'}
              shadowColor="#E6F9FA"
              bgColor="#fff"
            >
              <Flex direction={'row'} alignItems={'flex-end'}>
                <Text
                  size={'titleM'}
                  color={'#51A7E7'}
                >
                  {item.cashabilityPoint ?? 0}
                </Text>
                <Text
                  size={'captionS'}
                  color={'#51A7E7'}
                  pb={'3px'}
                >
                  점
                </Text>
              </Flex>
            </ProgressCircle>
            <Text size={'captionM'} color={'gray.600'} mt={'20px'}>
              환금성
            </Text>
          </Flex>
          <Flex px={'10px'} alignItems={'center'}>
            <ProgressCircle
              percent={item.profitabilityPoint ? Number(item.profitabilityPoint) : 0}
              radius={40}
              borderWidth={6}
              color={'#817DD7'}
              shadowColor="#E6F9FA"
              bgColor="#fff"
            >
              <Flex direction={'row'} alignItems={'flex-end'}>
                <Text
                  size={'titleM'}
                  color={'#817DD7'}
                >
                  {item.profitabilityPoint ?? 0}
                </Text>
                <Text
                  size={'captionS'}
                  color={'#817DD7'}
                  pb={'3px'}
                >
                  점
                </Text>
              </Flex>
            </ProgressCircle>
            <Text size={'captionM'} color={'gray.600'} mt={'20px'}>
              수익성
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Section4;
