import React from 'react';

import { Box } from 'native-base';
import { Image } from 'react-native';

const TitleImage = () => {
  return (
    <Box position={'absolute'} top={'48px'} zIndex={'9'} right={'16px'}>
      <Image
        style={{ width: 196, height: 229 }}
        source={require('assets/images/mypage_image2.png')}
      />
    </Box>
  );
};

export default TitleImage;
