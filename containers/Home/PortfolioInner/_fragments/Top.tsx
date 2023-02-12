import React from 'react';

import { Box, Flex, Text, Image, Center, ZStack } from 'native-base'
import { Animated, Dimensions, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { PortfolioTopProps } from 'interfaces/home.type';

import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient'

const statusBarHeight = getStatusBarHeight();

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


// 해당 파일은 포트폴리오 상세에 백그라운드 이미지 부분이다.
const Top = ({ item, portfolioId, imagePath, scrollY }: PortfolioTopProps) => {


  return (
    <Animated.View
      style={{
        position: 'relative',
        transform: [{ translateY: scrollY }],
        width: windowWidth,
        height: windowWidth,
      }}
    >
      <Center
        width={windowWidth}
        height={windowWidth * 1.4533}
        borderBottomRadius={'20px'}
        position={'absolute'}
        zIndex={2}
        top={-(statusBarHeight + 80)}
      />

      <SharedElement id={`portfolio.${portfolioId}.image`}>
        <Image
          key={item?.representThumbnailImagePath ? item?.representThumbnailImagePath : imagePath}
          position={'absolute'}
          width={windowWidth}
          height={windowWidth * 1.4533}
          borderRadius={0}
          top={-(statusBarHeight + 80)}
          source={{ uri: item?.representThumbnailImagePath ? item?.representThumbnailImagePath : imagePath }}
          alt={'portfolio_image'}
        />
      </SharedElement>

      <LinearGradient
        style={{
          position: 'absolute',
          top: -(statusBarHeight + 80),
          height: statusBarHeight + 80,
          width: '100%',
        }}
        locations={[(statusBarHeight)/(statusBarHeight+80), 1]}
        colors={['#00000060', '#00000000']}
      />
    </Animated.View>
  );
};

export default Top;
