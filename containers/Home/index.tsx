import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  VStack,
  Box,
  Pressable,
  Center,
  Text,
  Flex,
  Image,
} from 'native-base'
import { RefreshControl, Image as NativeImage } from 'react-native'
import { useScrollToTop } from "@react-navigation/native";

import Layout from "components/Layout";

import { Title } from "interfaces/components.type";
import { useInfiniteQuery, useQuery } from 'react-query';
import { getPortfolioList } from 'apis/Portfolio';
import { PortfolioListType } from "apis/Portfolio/portfolio.type";
import { SharedElement } from "react-navigation-shared-element";
import { Dimensions } from "react-native";
import PortfolioStatusBadge from "components/PortfolioStatusBadge";
import { comma } from "utils/comma";
import { formatDateOpenPortfolio } from "utils/formatDate";
import { wait } from "utils/wait";
import PageLoading from 'components/PageLoading'
import Header from 'containers/Home/_fragments/Header'
import { convertTime } from 'utils/convertTime'
import { getPopup } from 'apis/Board';
import Storage from '@react-native-async-storage/async-storage'

const windowWidth = Dimensions.get("window").width;






export const Home = ({ navigation }: any) => {
  const ref: any = useRef();
  useScrollToTop(ref);

  // const { data: portfolioList, refetch, isLoading } = useQuery(
  //   ['Portfolio'],
  //   getPortfolioList,
  //   {
  //     onError: (err) => {
  //       navigation.navigate('NetworkError', { queryKey: ['Portfolio'] });
  //     },
  //     cacheTime: 0,
  //   }
  // );


  const {
    data: portfolioList,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['Portfolio'],
    async ({ pageParam: offset = 0 }) => {
      const limit = 20;
      const data = await getPortfolioList({ limit, offset });
      return { ...data, limit, offset };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count > lastPage.offset+lastPage.limit) return lastPage.offset+lastPage.limit;
      },
      onError: (err) => {
        navigation.navigate('NetworkError', { queryKey: ['Portfolio'] });
      },
      keepPreviousData: false,
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const [title, setTitle] = useState<Title[]>([
    {
      title: "포트폴리오",
      selected: true,
    },
    // { title: '마켓', selected: false },
  ]);
  const [titleSelected, setTitleSelected] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(600).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    for (let i in title) {
      if (title[i].selected) {
        setTitleSelected(title[i].title);
      }
    }
  }, [title]);

  // TODO: POPUP 비활성화 처리
  useQuery(
    ['Popup'],
    getPopup,
    {
      onSuccess: async (res) => {
        if (res) {
          const today = JSON.stringify(new Date().getDate());
          const isPopup = await Storage.getItem('@isPopup');
          const preventPopup = await Storage.getItem('@preventPopup');
          if (!!isPopup && (!preventPopup || preventPopup !== today)) {
            await NativeImage.prefetch(res.popupImagePath)
            NativeImage.getSize(
              res.popupImagePath,
              (width, height) => {
                navigation.navigate('homeEvent', { item: { ...res, ratio: width/height } })
              },
            )
          }
        }
      },
      cacheTime: 0,
    }
  );

  const getSoldOut = useCallback((startDate: string, endDate: string) => {
    const start = +new Date(startDate);
    if (!endDate) return ''
    const end = +new Date(endDate);
    const times = Math.floor((end-start)/1000);
    const soldOutTime = convertTime(times);
    return `${soldOutTime}만에 마감!`;
  }, [])

  return (
    <Layout bottomTab={true}>
      {isLoading ? (
        <PageLoading />
      ) : (
        <ScrollView
          onMomentumScrollEnd={() => hasNextPage && fetchNextPage()}
          scrollIndicatorInsets={{ top: 1, bottom: 1 }}
          contentInsetAdjustmentBehavior={'always'}
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Box px="16px">
            <Header navigation={navigation} />
          </Box>
          <VStack space="20px" mb={"30px"}>
            {portfolioList?.pages.flatMap((page) => page.data)?.map((item: PortfolioListType) => (
              <Pressable
                key={item.portfolioId}
                onPress={() => {
                  navigation.navigate("Portfolio", { item })
                  console.log('item' + item.title)
                }}
                w={windowWidth}
                h={(windowWidth - 32) * 1.4545}
                mx="16px"
                position={"relative"}
                borderRadius={"20px"}
              >
                <Center
                  w={windowWidth - 32}
                  h={"100%"}
                  borderRadius={20}
                  position={"absolute"}
                  zIndex={2}
                >
                </Center>

                <SharedElement id={`portfolio.${item.portfolioId}.image`}>
                  <Image
                    key={item.portfolioId}
                    position={"absolute"}
                    width={windowWidth - 32}
                    height={(windowWidth - 32) * 1.4545}
                    borderRadius={"20px"}
                    source={{ uri: item.representThumbnailImagePath }}
                    alt={"portfolio_image"}
                  />
                </SharedElement>

                <Flex
                  zIndex={5}
                  mt="auto"
                  mb="25px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  w={windowWidth - 32}
                  px="20px"
                >
                  <PortfolioStatusBadge status={item.recruitmentState} />
                  {item.recruitmentState === "PRS0101" ? (
                    <Text size={"titleL"} color={"white"}>
                      {`${formatDateOpenPortfolio(item.recruitmentBeginDate)} 오픈`}
                    </Text>
                  ) : item.recruitmentState === "PRS0102" ? (
                    <Flex direction={"row"}>
                      <Text size={"titleL"} color={"white"}>
                        남은 수량{" "}
                      </Text>
                      <Text size={"titleL"} color={"white"}>
                        {comma(item.remainingPieceVolume)}
                        피스
                      </Text>
                    </Flex>
                  ) : item.recruitmentState === 'PRS0111' ? (
                    <Flex direction={"row"}>
                      <Text size={"titleL"} color={"white"} mr={"10px"} textAlign={'right'}>
                        수익률 {item.expectationProfitRate}% 달성
                      </Text>
                    </Flex>
                  ) : (
                    <Flex direction={"row"}>
                      <Text size={"titleL"} color={"white"} mr={"10px"} textAlign={'right'}>
                        {getSoldOut(
                          item.recruitmentBeginDate,
                          item.soldoutAt,
                        )}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      )}
    </Layout>
  );
};
