import React from 'react';

import { Box, Flex, Pressable, ScrollView, Text } from 'native-base';
import { Dimensions, Image, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import CardDetail from './CardDetail';
import { useQuery } from 'react-query';
import { getPurchases } from 'apis/Purchase';
import PieceNoneIcon from 'components/Icons/PieceNoneIcon'

const screenHeight = Dimensions.get('screen').height;
const cardHeight = Dimensions.get('screen').width - 32;


// 트리맵 연구 진행중
const OwnPiece = (props: any) => {
  const { navigation, purchasesData } = props;
  //console.log('data : ' + JSON.stringify(purchasesData))
  return (
    <>
      <Box px={'16px'}>
        <Text size={'titleL'} mb={'20px'}>
          소유 조각
        </Text>
      </Box>
      
      {purchasesData?.length ? (
        <ScrollView bounces={false} horizontal={true} showsHorizontalScrollIndicator={false} pl={'16px'} mb={'16px'}>
          {purchasesData.map((item: any, index: number) => (
            <Pressable
              onPress={() => {
                navigation.navigate('OwnPiece', { item });
              }}
              key={item.purchaseId}
              mr={index === purchasesData.length - 1 ? '32px' : '15px'}
            >
              <SharedElement id={`purchase.${item.purchaseId}.image`}>
                <CardDetail item={item} />
              </SharedElement>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Flex height={screenHeight * 0.2734} alignItems={'center'}>
          <Box p={'10px'}>
            <PieceNoneIcon />
          </Box>
          <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
            소유한 조각이 없어요.{'\n'}
          {/*  지금 조각 구매를 시작할까요?*/}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default OwnPiece;
