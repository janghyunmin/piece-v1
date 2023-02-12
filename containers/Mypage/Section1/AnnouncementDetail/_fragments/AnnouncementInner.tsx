import React from "react";

import { Box, Flex, ScrollView, Spinner, Text } from 'native-base'

import { AnnouncementType } from "interfaces/mypage.type";
import { formatDate } from "utils/formatDate";
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { WEBVIEW_URL } from 'apis/config';

const statusBarHeight = getStatusBarHeight();
const bottomHeight = getBottomSpace();
const deviceHeight = Dimensions.get('window').height;

const AnnouncementInner = (props: { item: AnnouncementType }) => {
  const { item } = props;

  return (
    <ScrollView
      scrollIndicatorInsets={{ top: 1, bottom: 1 }}
      contentInsetAdjustmentBehavior={'always'}
    >
      <Box
        mx={"16px"}
        borderBottomWidth={"1px"}
        borderBottomColor={"gray.200"}
      >
        <Text size={"titleL"} color={"black"} mb={"5px"}>
          {item.title}
        </Text>
        <Text size={"captionM"} mb={"20px"} color={"gray.500"}>
          {formatDate(item.createdAt)}
        </Text>
      </Box>
      <Flex flex={1} mx={'auto'} mb={bottomHeight}>
        <Flex
          position={'absolute'}
          m={'auto'}
          top={0}
          left={0}
          right={0}
          py={(deviceHeight-statusBarHeight-180)/2}
        >
          <Spinner size={'lg'} color={'primary.500'}/>
        </Flex>
        <Flex
          flex={1}
          minH={deviceHeight-statusBarHeight-180}
        >
          <AutoHeightWebView
            scrollEnabled={false}
            style={{ width: Dimensions.get('window').width - 16 }}
            source={{
              uri: `${WEBVIEW_URL}/support/notice/${item.boardId}/detail`,
            }}
          />
        </Flex>
      </Flex>
    </ScrollView>
  );
};


export default AnnouncementInner;
