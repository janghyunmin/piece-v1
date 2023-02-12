import React from 'react';

import { Button, Flex, Text } from 'native-base';

import { AlarmCategoryProps, AlarmCategoryType } from 'interfaces/home.type';

const AlertCategory = (props: AlarmCategoryProps) => {
  const { categorySelect, alertCategory } = props;

  return (
    <Flex direction={'row'} flexWrap={'wrap'} zIndex={9}>
      {alertCategory?.map((item: AlarmCategoryType, index: number) => (
        <Button
          onPress={() => categorySelect(index)}
          key={index}
          py={'5px'}
          px={'15px'}
          mr={'5px'}
          mb={'10px'}
          borderRadius={'15px'}
          h={'30px'}
          bgColor={item?.selected ? 'primary.500' : 'gray.200'}
        >
          <Text size={'buttonS'} color={item?.selected ? 'white' : 'gray.500'}>
            {item?.title}
          </Text>
        </Button>
      ))}
    </Flex>
  );
};

export default AlertCategory;
