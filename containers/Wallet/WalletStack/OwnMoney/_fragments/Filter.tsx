import React, { useMemo } from 'react'

import { HStack, Pressable, Text } from 'native-base';
import { Image } from 'react-native';
import DownSmIcon from 'components/Icons/DownSmIcon';

const Filter = ({ navigation, categoryList, selectedCategory }: any) => {

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ownMoneyFilter', {
          categoryList: categoryList,
          selectedCategory: selectedCategory,
        })
      }
    >
      <HStack space={'5px'} alignItems={'center'} mb={'20px'}>
        <Text size={'titleM'}>{selectedCategory.title}</Text>
        <DownSmIcon />
      </HStack>
    </Pressable>
  );
};

export default Filter;
