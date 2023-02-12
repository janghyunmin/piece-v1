import React, { useEffect, useState } from 'react';

import { Box, Flex, Pressable, Text, View } from 'native-base';
import { ScrollView } from "native-base";

import { MagazineCategoryType } from "interfaces/magazine.type";

const Category = (props: any) => {
  const { category, currentRef, differentRef, handleSelectCategory, selectCategoryType } = props;
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (differentRef.current && currentRef.current) {
      const removeTimeout = setTimeout(() => {
        differentRef.current.scrollTo({x: currentRef.current.offsetX, animated: false});
      }, 200);
      return () => clearTimeout(removeTimeout);
    }
  }, [offset]);


  return (
    <ScrollView
      ref={currentRef}
      onScroll={({ nativeEvent }) => {
        currentRef.current.offsetX = nativeEvent.contentOffset.x;
      }}
      onScrollEndDrag={({ nativeEvent }) => {
        setOffset(+new Date());
      }}
      scrollEventThrottle={20}
      horizontal
      px={"16px"}
      borderBottomWidth={"1px"}
      borderBottomColor={"gray.200"}
      showsHorizontalScrollIndicator={false}
    >
      {category.map((data: MagazineCategoryType, index: number) => {
        const isSelect = data.magazineType === selectCategoryType;
        return (
          <Pressable
            onPress={() => handleSelectCategory(data.magazineType)}
            key={index}
          >
            <Box
              mr={index === category.length - 1 ? "40px" : "20px"}
              py={"18px"}
              borderBottomColor={"black"}
              borderBottomWidth={isSelect ? "2px" : "0"}
            >
              <Text size={"titleM"} color={isSelect ? "black" : "gray.400"}>
                {data.title}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default Category;
