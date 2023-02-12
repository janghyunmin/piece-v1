import React from 'react';

import { Box, Flex, Pressable, Text, VStack } from 'native-base';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import CheckPrimaryIcon from 'components/Icons/CheckPrimaryIcon';

const bottomHeight = getBottomSpace() + 30;

const OwnMoneyFilter = ({ navigation, route }: any) => {
  const { categoryList, selectedCategory } = route.params;

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        padding={'30px 16px'}
        pt={'30px'}
        px={'16px'}
        pb={`${bottomHeight}px`}
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'30px'}
        >
          <Box w={'28px'} h={'28px'} />
          <Text size={'titleL'} color={'gray.800'}>
            거래 내역
          </Text>
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

        <VStack space={'20px'}>
          {categoryList.map((category: { title: string; historyType: string }, index: number) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('OwnMoneyStack', {
                  screen: 'OwnMoney',
                  params: { select: category },
                })
              }
            >
              <Flex
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text size={'textM'} color={'gray.700'}>
                  {category.title}
                </Text>
                {selectedCategory.historyType === category.historyType && (
                  <CheckPrimaryIcon />
                )}
              </Flex>
            </Pressable>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default OwnMoneyFilter;
