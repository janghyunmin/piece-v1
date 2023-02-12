import React from 'react';

import { Center, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

const BioAuth = (props: any) => {
  const { bioAuth } = props;

  return (
    <Pressable onPress={bioAuth}>
      <Center>
        <Image
          source={require('assets/images/fingerprint.png')}
          style={{ width: 40, height: 40, marginBottom: 10 }}
        />
        <Text size={'captionM'} color={'gray.800'}>
          생체 인증
        </Text>
      </Center>
    </Pressable>
  );
};

export default BioAuth;
