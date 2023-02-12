import React from 'react';

import { Box, Text } from 'native-base';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'

const Body = ({ consentDetail }: any) => {

  return (
    <Box py={'20px'} mx={'auto'}>
      <AutoHeightWebView
        source={{ html: consentDetail.consentContents }}
        scrollEnabled={false}
        style={{ width: Dimensions.get('window').width - 16 }}
      />
      {/*<HTMLView value={consentDetail.consentContents} addLineBreaks={false} />*/}
    </Box>
  );
};

export default Body;
