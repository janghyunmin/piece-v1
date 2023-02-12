import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { BanksListProps } from 'interfaces/wallet.type';

const Banks = (props: BanksListProps) => {
  const { banks, navigation, isCreate } = props;
  return (
    <Box mb={'48px'}>
      {banks.map((data: any, index: number) => (
        <Flex key={index} direction={'row'} mb={'15px'}>
          {data.map((item: any) => (
            <Pressable
              onPress={() =>
                navigation.navigate('RegisterBankAccount', {
                  bankSelected: item,
                  isCreate,
                })
              }
              key={item.id}
              flex={1}
              pt={'9px'}
              pb={'9px'}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                style={{ width: 40, height: 40, marginBottom: 5 }}
                source={item.image}
              />
              <Text size={'captionM'} color={'gray.800'}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </Flex>
      ))}
    </Box>
  );
};

export default Banks;
