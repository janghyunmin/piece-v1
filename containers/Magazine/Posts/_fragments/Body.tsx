// bskr_jhm 사용안하는 파일로 확인함.

import React from 'react';

import { Flex } from 'native-base'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'

const Body = (props: { item: any }) => {
  const { item } = props;

  return (
    <Flex flex={1}>
      <AutoHeightWebView
        source={{
          uri: `https://dev.piece.run/magazine/${item.magazineId}/detail`,
        }}
        scrollEnabled={false}
      />
    </Flex>
  );
};

export default Body;
