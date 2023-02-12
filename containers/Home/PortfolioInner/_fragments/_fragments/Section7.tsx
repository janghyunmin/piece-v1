import React, { useEffect } from 'react';

import { Box, HStack, Pressable, ScrollView, Text } from 'native-base'
import { Image } from 'react-native';

import { PortfolioInnerSection7Props } from 'interfaces/home.type';

// const IMAGE_MAPPER: any = {
//   DOC01: require('assets/images/document_1.jpg'),
//   DOC02: require('assets/images/document_2.jpg'),
//   DOC03: require('assets/images/document_3.jpg'),
//   DOC04: require('assets/images/document_4.jpg'),
//   DOC05: require('assets/images/document_5.jpg'),
//   DOC06: require('assets/images/document_6.jpg'),
// }

const Section7 = (props: PortfolioInnerSection7Props) => {
  const { item, navigation } = props;

  return (
    <>
      <Box px={'16px'}>
        <Text size={'titleM'} color={'gray.900'} mb={'10px'}>
          증빙 구성
        </Text>
      </Box>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        mb={'20px'}
      >
        {item.map((data: any, index: number) => {
          if (data.selected) {
            return (
              <HStack px={'16px'} space={'13px'} key={data.productId}>
                {data.documents.map((item2: any, i: number) => (
                  <Box key={item2.documentId}>
                    <Image
                      key={item2.documentId}
                      source={{ uri: item2.documentIconPath }}
                      style={{
                        width: 76,
                        height: 76,
                        marginBottom: 5,
                        borderRadius: 10,
                      }}
                    />
                    <Text size={'titleS'} color={'gray.700'}>
                      {item2.documentName}
                    </Text>
                  </Box>
                ))}
              </HStack>
            );
          }
        })}
        {/* {item.status === '오픈 예정' && (
          <HStack space={'13px'}>
            <Box>
              <Image
                source={require('assets/images/proof1.png')}
                style={{ width: 76, height: 76, marginBottom: 5 }}
              />
              <Text size={'titleS'} color={'gray.700'}>
                보관 사진
              </Text>
            </Box>
          </HStack>
        )}
        {item.status === '판매 중' && (
          <HStack space={'13px'}>
            <Box>
              <Image
                source={require('assets/images/proof1.png')}
                style={{ width: 76, height: 76, marginBottom: 5 }}
              />
              <Text size={'titleS'} color={'gray.700'}>
                보관 사진
              </Text>
            </Box>
            <Box>
              <Image
                source={require('assets/images/proof2.png')}
                style={{ width: 76, height: 76, marginBottom: 5 }}
              />
              <Text size={'titleS'} color={'gray.700'}>
                작가 서명
              </Text>
            </Box>
          </HStack>
        )} */}
      </ScrollView>
    </>
  );
};

export default Section7;
