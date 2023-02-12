import React from 'react';

import { Button, Flex, Text } from 'native-base';

import { AlarmCategoryProps, AlarmCategoryType } from 'interfaces/home.type';
import { CategoryType } from 'containers/Home/Alarm/index'

const Category = (props: any) => {
  const { categoryList, selectedCategory, setSelectedCategory } = props;

  return (
    <Flex direction={'row'} flexWrap={'wrap'} zIndex={9}>
      {categoryList.map((category: CategoryType) => {
        const isSelected = category.notificationType === selectedCategory.notificationType;
        const isParent = category.parent === category.notificationType;
        return (
          <Button
            onPress={() => setSelectedCategory(category)}
            key={category.notificationType}
            py={'5px'}
            px={'15px'}
            mr={'5px'}
            mb={'10px'}
            borderRadius={'15px'}
            h={'30px'}
            bgColor={isSelected ? 'primary.500' : 'gray.200'}
          >
            <Text size={'buttonS'}
                  color={isSelected ? 'white' : 'gray.500'}>
              {isParent ? '전체' : category.title}
            </Text>
          </Button>
        )
      })}
    </Flex>
  );
};

export default Category;
