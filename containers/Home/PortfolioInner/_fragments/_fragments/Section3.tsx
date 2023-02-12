import React from 'react';

import { Box, Flex, ScrollView, Text } from 'native-base';
import { Dimensions, Image, Pressable } from 'react-native';

import { PortfolioInnerSection3Props } from 'interfaces/home.type';
import QuestionIcon from 'components/Icons/QuestionIcon';
import BuyInfo1Icon from 'components/Icons/BuyInfo1Icon'
import { convertDate } from 'utils/convertDate'
import BuyInfo2Icon from 'components/Icons/BuyInfo2Icon'
import BuyInfo4Icon from 'components/Icons/BuyInfo4Icon'
import BuyInfo3Icon from 'components/Icons/BuyInfo3Icon'
import { comma } from 'utils/comma'

const width = Dimensions.get("screen").width

const Section3 = (props: PortfolioInnerSection3Props) => {
  const { item, navigation } = props;

  return (
    <>
      <Box px={'16px'}>
        <Text size={'titleL'} mb={'20px'}>
          판매 정보
        </Text>
      </Box>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        px={'16px'}
        mb={'20px'}
      >
        <Box
          bgColor={'gray.100'}
          borderRadius={'10px'}
          p={'10px'}
          w={width/3}
          h={width/3}
          mr={'15px'}
        >
          <Box mb={'13px'}>
            <Flex direction={'row'} alignItems={'center'}>
              <Text size={'titleM'} color={'gray.700'}>
                운용 기간
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('portfolioInnerDesc', {
                    about: '운용기간',
                  })
                }
              >
                <QuestionIcon />
              </Pressable>
            </Flex>
            <Text size={'titleS'} color={'primary.500'}>
              {convertDate(+new Date(item.dividendsExpecatationDate) - +new Date(item.recruitmentBeginDate))}
            </Text>
          </Box>
          <Flex position={'absolute'} right={'10px'} bottom={'10px'}>
            <BuyInfo1Icon width={width/8} height={width/8} />
          </Flex>
        </Box>
        <Box
          bgColor={'gray.100'}
          borderRadius={'10px'}
          p={'10px'}
          w={width/3}
          h={width/3}
          mr={'15px'}
        >
          <Box mb={'13px'}>
            <Flex direction={'row'} alignItems={'center'}>
              <Text size={'titleM'} color={'gray.700'}>
                예상 시세
              </Text>
            </Flex>
            <Flex direction={'row'} alignItems={'center'}>
            <Text size={'titleS'} color={'primary.500'}>
              {item.expectationProfitRate}%
            </Text>

            <Image
              style={{ width: 14, height: 11 , marginLeft : 2 }}
                source={require('assets/images/arrowup.png')}
              />
            </Flex>
          </Box>
          <Flex position={'absolute'} right={'10px'} bottom={'10px'}>
            <BuyInfo2Icon width={width/8} height={width/8} />
          </Flex>
        </Box>
        <Box
          bgColor={'gray.100'}
          borderRadius={'10px'}
          p={'10px'}
          w={width/3}
          h={width/3}
          mr={'15px'}
        >
          <Box mb={'13px'}>
            <Flex direction={'row'} alignItems={'center'}>
              <Text size={'titleM'} color={'gray.700'}>
                판매 수량
              </Text>
            </Flex>
            <Text size={'titleS'} color={'primary.500'}>
              {comma(item.totalPieceVolume)} 피스
            </Text>
          </Box>
          <Flex position={'absolute'} right={'10px'} bottom={'10px'}>
            <BuyInfo3Icon width={width/8} height={width/8} />
          </Flex>
        </Box>
        <Box
          bgColor={'gray.100'}
          borderRadius={'10px'}
          p={'10px'}
          w={width/3}
          h={width/3}
          mr={'32px'}
        >
          <Box mb={'13px'}>
            <Flex direction={'row'} alignItems={'center'}>
              <Text size={'titleM'} color={'gray.700'}>
                판매 단위
              </Text>
            </Flex>
            <Text size={'titleS'} color={'primary.500'}>
              {comma(
                item.recruitmentAmount / item.totalPieceVolume
              )} 원
            </Text>
          </Box>
          <Flex position={'absolute'} right={'10px'} bottom={'10px'}>
            <BuyInfo4Icon width={width/8} height={width/8} />
          </Flex>
        </Box>
        {/*{buyInfo.map((data, index) => (*/}
        {/*  <Box*/}
        {/*    key={index}*/}
        {/*    bgColor={'gray.100'}*/}
        {/*    borderRadius={'10px'}*/}
        {/*    p={'10px'}*/}
        {/*    w={'120px'}*/}
        {/*    h={'120px'}*/}
        {/*    mr={index === buyInfo.length - 1 ? '32px' : '15px'}*/}
        {/*  >*/}
        {/*    <Box mb={'13px'}>*/}
        {/*      <Flex direction={'row'} alignItems={'center'}>*/}
        {/*        <Text size={'titleM'} color={'gray.700'}>*/}
        {/*          {data.title}*/}
        {/*        </Text>*/}
        {/*        {data.title === '운용 기간' && (*/}
        {/*          <Pressable*/}
        {/*            onPress={() =>*/}
        {/*              navigation.navigate('portfolioInnerDesc', {*/}
        {/*                about: '운용기간',*/}
        {/*              })*/}
        {/*            }*/}
        {/*          >*/}
        {/*            <QuestionIcon />*/}
        {/*          </Pressable>*/}
        {/*        )}*/}
        {/*      </Flex>*/}
        {/*      <Text size={'titleS'} color={'primary.500'}>*/}
        {/*        {data.body}*/}
        {/*      </Text>*/}
        {/*    </Box>*/}
        {/*    <Flex position={'absolute'} right={'10px'} bottom={'10px'}>*/}
        {/*      <Image source={data.image} />*/}
        {/*    </Flex>*/}
        {/*  </Box>*/}
        {/*))}*/}
      </ScrollView>
    </>
  );
};

export default Section3;
