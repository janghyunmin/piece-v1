import React, { useEffect, useState } from 'react'
import Storage from '@react-native-async-storage/async-storage';

import { Box, Flex, Text, Pressable, Image } from 'native-base';
import { Dimensions, Platform, useWindowDimensions } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper';

const bottomHeight = getBottomSpace();
const width = Dimensions.get("screen").width

const PAGE_MAPPER: any = {
  POP0201: (navigation: any, popupLinkUrl: string) => {
    navigation.navigate('Portfolio', { portfolioId: popupLinkUrl });
  },
  POP0202: (navigation: any, popupLinkUrl: string) => {
    navigation.navigate('magazinePost', { magazineId: popupLinkUrl });
  },
  POP0203: (navigation: any, popupLinkUrl: string) => {
    navigation.navigate('AnnouncementDetail', { boardId: popupLinkUrl });
  },
  POP0204: (navigation: any, popupLinkUrl: string) => {
    navigation.navigate('EventDetail', { eventId: popupLinkUrl });
  },
  POP0205: (navigation: any) => {
    navigation.navigate('MyPageAlarm');
  },
  POP0206: (navigation: any) => {
    navigation.navigate('MyInfo');
  },
  POP0207: (navigation: any, popupLinkUrl: string) => {
    navigation.navigate('PieceWeb', { link: popupLinkUrl});
  },
}

const HomeEvent = ({ navigation, route }: any) => {
  const { item } = route.params;
  const doNotShowAgainToday = async () => {
    const today = new Date().getDate();
    await Storage.setItem('@preventPopup', JSON.stringify(today));
    navigation.goBack();
  };

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
      >
        <Pressable onPress={() => {
          Storage.removeItem('@isPopup');
          PAGE_MAPPER[item.popupLinkType](navigation, item.popupLinkUrl);
        }}>
          <Flex>
            <Image
              key={item.popupId}
              source={{ uri: item.popupImagePath }}
              style={{
                width: '100%',
                height: width/item.ratio,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              alt={'popup'}
            />
          </Flex>
        </Pressable>
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          px={'16px'}
          pt={'18px'}
          pb={Platform.OS === 'ios' ? `${bottomHeight}px` : '17px'}
        >
          <Pressable onPress={doNotShowAgainToday}>
            <Text size={'textM'} color={'gray.600'}>
              오늘은 보지 않기
            </Text>
          </Pressable>
          <Pressable onPress={() => {
            Storage.removeItem('@isPopup');
            navigation.goBack();
          }}>
            <Text size={'titleM'}>닫기</Text>
          </Pressable>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HomeEvent;
