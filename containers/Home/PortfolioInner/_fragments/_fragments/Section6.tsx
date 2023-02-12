import React, { Fragment } from 'react';

import { Box, Center, Flex, ScrollView, Text, Image, HStack } from 'native-base'
import { Pressable } from 'react-native';

import { PortfolioInnerSection6Props } from 'interfaces/home.type';

const Section6 = (props: PortfolioInnerSection6Props) => {
  const { navigation, productComposition, changeProduct } = props;

  return (
    <>
      <Box px={'16px'}>
        <Text size={'titleL'} mb={'20px'}>
          포트폴리오 구성
        </Text>
      </Box>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        mb={'20px'}
      >
        <HStack px={'16px'}>
          {productComposition.map((data, index) => (
            <Pressable onPress={() => changeProduct(index)} key={index}>
              <Center
                bgColor={data.selected ? 'primary.500' : 'gray.200'}
                py={'5px'}
                px={'15px'}
                borderRadius={'15px'}
                mr={index === productComposition.length - 1 ? '32px' : '5px'}
              >
                <Text
                  size={'buttonS'}
                  color={data.selected ? 'white' : 'gray.500'}
                >
                  {data.title}
                </Text>
              </Center>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>

      {productComposition.map((data, index) => {
        if (data.selected) {
          return (
            <Box key={index} mb={'20px'} px={'16px'}>
              <Flex direction={'row'} mb={'20px'}>
                {data.representThumbnailImagePath ? (
                  <Image
                    key={data.productId}
                    alt={'representThumbnailImagePath'}
                    w={'166px'}
                    h={'166px'}
                    mr={'11px'}
                    borderRadius={'20px'}
                    source={{ uri: data.representThumbnailImagePath }}
                  />
                ) : (
                  <Box
                    w={'166px'}
                    h={'166px'}
                    borderRadius={'20px'}
                    shadow={4}
                    bgColor={'gray.200'}
                    mr={'11px'}
                  />
                )}

                <Flex flex={1} justifyContent={'space-between'} py={'10px'}>
                  <Box>
                    <Text size={'captionM'} color={'gray.500'}>
                      {data.productionYear}
                    </Text>
                    <Text size={'titleM'} color={'gray.900'}>
                      {data.title}
                    </Text>
                    <Text size={'textS'} color={'gray.600'}>
                      {data.author}
                    </Text>
                  </Box>
                  <Box>
                    <Text size={'captionM'} color={'gray.600'}>
                      {data.productMaterial}
                    </Text>
                    <Text size={'captionM'} color={'gray.600'}>
                      {data.productSize}
                    </Text>
                  </Box>
                </Flex>
              </Flex>

              <Box
                pb={'20px'}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.300'}
              >
                <Text size={'textS'} color={'gray.800'} noOfLines={3}>
                  {data.productDetailInfo}
                </Text>
              </Box>
            </Box>
          );
        }
      })}
    </>
  );
};

export default Section6;
