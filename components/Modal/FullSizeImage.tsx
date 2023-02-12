import React from 'react';

import { Box, Flex, Pressable } from 'native-base'
import { Image } from 'react-native';
import XWhiteIcon from 'components/Icons/XWhiteIcon';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const FullSizeImage = ({ navigation, route }: any) => {
  const { uri } = route.params;

  return (
      <Flex
        mt={`${getStatusBarHeight()}px`}
        w={'100%'}
        justifyContent={'center'}
      >
        <Image
          key={uri}
          source={{ uri }}
          style={{
            height: '100%',
          }}
          resizeMode="contain"
        />
        <Box
          position={'absolute'}
          h={'80px'}
          px={'16px'}
          right={0}
          top={0}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            w={'40px'}
            h={'80px'}
            justifyContent={'center'}
          >
            <XWhiteIcon />
          </Pressable>
        </Box>
      </Flex>
  );
};

export default FullSizeImage;
