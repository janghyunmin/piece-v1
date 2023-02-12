import React from "react";

import { Box, Flex, Pressable, ScrollView, Text } from 'native-base';
import { Image } from "react-native";

import {
  AlarmContentProps,
  AlarmContentsType,
  AlarmInnerType,
} from "interfaces/home.type";
import { retry } from '@reduxjs/toolkit/query'
import { formatDate } from 'utils/formatDate'

const ICON_MAPPER: any = {
  NTT0101: require("assets/images/alert2.png"),
  NTT0102: require("assets/images/alert5.png"),
  NTT0103: require("assets/images/alert7.png"),
  NTT0104: require("assets/images/alert8.png"),
  NTT0105: require("assets/images/alert3.png"),
  NTT0106: require("assets/images/alert1.png"),
  NTT0107: require("assets/images/alert6.png"),
  NTT0108: require("assets/images/alert4.png"),
  NTT0109: require("assets/images/alert9.png"),
  NTT0201: require('assets/images/promotion1.png'),
  NTT0202: require('assets/images/promotion2.png'),
}

const NAVIGATE_MAPPER: any = {
  NTT0101: 'home',
  NTT0102: 'home',
  NTT0103: 'wallet',
  NTT0104: 'wallet',
  NTT0105: 'wallet',
  NTT0106: 'wallet',
  NTT0107: 'wallet',
  NTT0108: 'home',
  NTT0109: 'wallet',
  NTT0201: 'Event',
  NTT0202: 'Event',
}

const Contents = (props: any) => {
  const { navigation, notificationList } = props;

  return (
    <Box
      zIndex={9}
      pt={"20px"}
    >
      {notificationList?.map((notification: any, index: number) => {
        const prevDate = notificationList[index-1]?.createdAt;
        const curDate = notification.createdAt;
        const showDate = prevDate?.substr(0, 10) !== curDate.substr(0, 10);

        return (
          <Flex
            key={index}
            mb={index === notificationList?.length - 1 ? "50px" : "15px"}
            borderTopWidth={index === 0 || !showDate ? "0" : "1px"}
            borderTopColor={"gray.300"}
          >
            {showDate && (
              <Text size={"textL"} mb={"15px"} pt={index !== 0 ? "20px" : "0"}>
                {formatDate(notification.createdAt)}
              </Text>
            )}
            <Pressable
              onPress={() => {
                navigation.navigate(NAVIGATE_MAPPER[notification.notificationType])
              }}
            >
              <Flex
                direction={"row"}
                w={"100%"}
                mb={"20px"}
                opacity={notification.isRead === 'Y' ? ".5" : "1"}
              >
                <Box w={"40px"} mr={"15px"}>
                  <Image
                    source={ICON_MAPPER[notification.notificationType]}
                    style={{ width: 40, height: 40 }}
                  />
                </Box>
                <Box flex={1}>
                  <Text size={"titleS"} color={'black'}>{notification.title}</Text>
                  <Text size={"textM"} color={'black'}>
                    {notification.message}
                  </Text>
                </Box>
              </Flex>
            </Pressable>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Contents;
