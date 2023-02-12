import React from 'react';

import { Box, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { FormCarrierProps } from 'interfaces/auth.type';
import DownGrayIcon from 'components/Icons/DownGrayIcon';

const Carrier = (props: FormCarrierProps) => {
  const { navigation, carriers, carrierSelected, carrierIncorrect } = props;

  return (
    <Box mb={'28px'}>
      <Text size={'titleS'} color={'gray.500'}>
        통신사
      </Text>
      <Pressable
        onPress={() =>
          navigation.navigate('SelectCarrier', {
            carriers: carriers,
            carrierSelected: carrierSelected,
          })
        }
        borderBottomWidth={1}
        borderBottomColor={'gray.200'}
        h={'52px'}
        alignItems="center"
        flexDirection="row"
      >
        <Text
          size={'textM'}
          color={carrierSelected === '통신사 선택' ? 'gray.500' : 'gray.800'}
          flex={1}
        >
          {carrierSelected}
        </Text>
        <DownGrayIcon />
      </Pressable>
    </Box>
  );
};

export default Carrier;
