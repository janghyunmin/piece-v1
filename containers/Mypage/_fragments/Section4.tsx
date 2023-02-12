import React from 'react';

import { Box, Flex, Text } from 'native-base';

import VersionIcon from 'components/Icons/VersionIcon';
import Constants from 'expo-constants'

const Section4 = () => {
  return (
    <Box px={'16px'} bgColor={'white'}>
      <Flex
        pt={'25px'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={'30px'}
      >
        <Flex direction={'row'} alignItems={'center'}>
          <VersionIcon />
          <Text size={'textM'} color={'gray.800'} ml={'10px'}>
            앱 버전
          </Text>
        </Flex>

        <Text size={'activeM'} color={'gray.600'}>
          v {Constants.manifest?.version}
        </Text>
      </Flex>
    </Box>
  );
};

export default Section4;
