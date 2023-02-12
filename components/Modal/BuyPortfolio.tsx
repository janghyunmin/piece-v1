import React, { useMemo, useState } from 'react'

import { Box, Flex, Button, Text, Pressable } from 'native-base'
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Image } from "react-native";

import { comma } from "utils/comma";
import CloseGrayIcon from 'components/Icons/CloseGrayIcon'
import { convertPrice } from 'utils/convertPrice'

const bottomHeight = getBottomSpace();

const BuyPortfolio = ({ navigation, route }: any) => {
  const { item, status } = route.params;
  const pieceAmount = useMemo(() => {
    return item.recruitmentAmount / item.totalPieceVolume;
  }, [item])

  const [data, _] = useState([
    {
      title: "포트폴리오",
      body: item.title,
      image: require("assets/images/buy_portfolio_1.png"),
    },
    {
      title: "구매가",
      body: `조각당 ${convertPrice(pieceAmount)} 원`,
      image: require("assets/images/buy_portfolio_2.png"),
    },
    // {
    //   title: "부가가치세",
    //   body: `조각당 ${convertPrice(vat)} 원`,
    //   image: require("assets/images/buy_portfolio_5.png"),
    // },
    {
      title: "주문 조각 수",
      body: `${comma(status)} 피스`,
      image: require("assets/images/buy_portfolio_3.png"),
    },
    {
      title: "총 주문 금액",
      body: `${comma((status * pieceAmount) + item.purchaseFee)} 원`,
      image: require("assets/images/buy_portfolio_4.png"),
    },
  ]);

  return (
    <Flex flex={1} w={"100%"} justifyContent={"flex-end"}>
      <Box
        bgColor={"white"}
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
        pt={"30px"}
        px={"16px"}
        pb={`${bottomHeight}px`}
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'30px'}
        >
          <Box w={'28px'} h={'28px'} />
          <Text size={'titleL'} color={'gray.800'}>
            주문 내역
          </Text>
          <Pressable
            w={'28px'}
            h={'28px'}
            justifyContent={'center'}
            alignItems={'center'}
            onPress={() => navigation.goBack()}
          >
            <CloseGrayIcon />
          </Pressable>
        </Flex>

        {data.map((info, index) => {
          const isLast = index === data.length-1;
          return (
            <Flex
              key={index}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"20px"}
            >
              <Flex direction={"row"} alignItems={"center"}>
                <Image
                  style={{ width: 40, height: 40, marginRight: 10 }}
                  source={info.image}
                />
                <Text
                  size={isLast ? "titleS" : "textS"}
                  color={isLast ? "black" : "gray.600"}
                  fontWeight={isLast ? "bold" : "normal"}
                >
                  {info.title}
                </Text>
              </Flex>
              <Text
                size={isLast ? "titleL" : "textM"}
                textAlign={"right"}
                fontWeight={isLast ? "bold" : "normal"}
              >
                {info.body.replace("\n", " ")}
              </Text>
            </Flex>
          );
        })}

        <Button
          onPress={() => navigation.navigate("password", { item: item, status })}
          // colorScheme={"primary"}
          bgColor={'#10CFC9'}
          shadow={1}
          borderRadius={"10px"}
          h={"48px"}
        >
          <Text color={"white"} size={"buttonM"}>
            조각 구매
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default BuyPortfolio;
