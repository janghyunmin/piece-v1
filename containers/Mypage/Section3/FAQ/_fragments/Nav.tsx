import React from 'react';

import { Box, Center, Pressable, ScrollView, Text } from 'native-base';

import { FaqCategoryType, FaqNavProps } from 'interfaces/mypage.type';

const Nav = (props: FaqNavProps) => {
  const { categoryList, handleCategory, selectedCategory } = props;

  return (
    <Box h={'50px'}>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        borderBottomWidth={'2px'}
        borderBottomColor={'gray.300'}
      >
        {categoryList.map((category: any, index: number) => (
          <Pressable onPress={() => handleCategory(category.boardCategory)} key={index}>
            <Center
              h={'50px'}
              px={'16px'}
              borderBottomWidth={category.boardCategory === selectedCategory ? '2px' : 0}
              borderBottomColor={'primary.500'}
            >
              <Text
                size={'buttonS'}
                color={category.boardCategory === selectedCategory ? 'gray.800' : 'gray.500'}
              >
                {category.title}
              </Text>
            </Center>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Nav;
