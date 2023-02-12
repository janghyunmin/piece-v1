import React from 'react';

import { Box, Flex, Text, Pressable } from 'native-base';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Image } from 'react-native';

import PortfolioInnerDescText1 from 'components/_modalFragments/PortfolioInnerDescText1';
import PortfolioInnerDescText2 from 'components/_modalFragments/PortfolioInnerDescText2';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';

const bottomHeight = getBottomSpace();

const PortfolioInnerDesc = ({ navigation, route }: any) => {
  const { about } = route.params;

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
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
          <Box w={'20px'} h={'20px'}></Box>
          <Text size="titleL">
            {about === '운용기간' ? '운용기간이란?' : 'PIECE 종합등급이란?'}
          </Text>
          <Pressable onPress={() => navigation.goBack()}>
            {/* <Image
              style={{ width: 20, height: 20 }}
              source={require('assets/images/icons/close_gray.png')}
            /> */}
            <CloseGrayIcon />
          </Pressable>
        </Flex>

        {about === '운용기간' ? (
          <PortfolioInnerDescText1 />
        ) : (
          <PortfolioInnerDescText2 />
        )}
      </Box>
    </Flex>
  );
};

export default PortfolioInnerDesc;
