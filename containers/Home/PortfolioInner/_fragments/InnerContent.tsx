import React, { useEffect, useRef, useState } from "react";

import { Box } from "native-base";
import { Animated, Dimensions } from "react-native";

import Section1 from "./_fragments/Section1";
import Section2 from "./_fragments/Section2";
import Section3 from "./_fragments/Section3";
import Section4 from "./_fragments/Section4";
import Section5 from "./_fragments/Section5";
import Section6 from "./_fragments/Section6";
import Section7 from "./_fragments/Section7";
import Section8 from "./_fragments/Section8";

import {
  PortfolioInnerContentBuyInfoType,
  PortfolioInnerContentItemInfoType,
  PortfolioInnerContentPointType,
  PortfolioInnerContentProductCompositionType,
  PortfolioInnerContentProps,
  PortfolioInnerContentRateType,
} from "interfaces/home.type";
import Section9 from "./_fragments/Section9";
import { comma } from "utils/comma";
import { convertDate } from "utils/convertDate";
import { convertPrice } from "utils/convertPrice";
import { useRootState } from 'hooks/useRootState';

const top = Dimensions.get("screen").height * 0.099;

const InnerContent = (props: PortfolioInnerContentProps) => {
  const { item, headerAnimated, navigation } = props;

  const { amount } = useRootState((state) => state.portfolio);

  const translateYAnim = useRef(new Animated.Value(420)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [productComposition, setProductComposition] = useState<
    PortfolioInnerContentProductCompositionType[]
  >([]);

  const changeProduct = (index: number) => {
    const tempData = [...productComposition];
    for (let i in tempData) {
      tempData[i].selected = false;
    }
    tempData[index].selected = true;
    setProductComposition(tempData);
  };

  // 포트폴리오 구성
  useEffect(() => {
    const tempData = [];
    for (let i = 0; i < item.products.length; i++) {
      if (i === 0) {
        tempData.push({ ...item.products[i], selected: true });
      } else {
        tempData.push({ ...item.products[i], selected: false });
      }
    }
    setProductComposition(tempData);
  }, []);

  // 애니메이션
  useEffect(() => {
    Animated.timing(translateYAnim, {
      toValue: -top,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }],
      }}
    >
      <Box
        position={"relative"}
        bgColor={"#F2F3F4"}
        borderTopLeftRadius={headerAnimated ? 0 : "20px"}
        borderTopRightRadius={headerAnimated ? 0 : "20px"}
      >
        <Section1 item={item} headerAnimated={headerAnimated} amount={amount} />

        <Section2 item={item} />

        <Box py={"20px"} bgColor={"white"} mb={"10px"}>
          <Section3 item={item} navigation={navigation} />

          <Section4 item={item} navigation={navigation} />

          <Section5 item={item} />
        </Box>

        <Box bgColor={"white"} pt={"20px"} mb={"10px"}>
          <Section6
            navigation={navigation}
            productComposition={productComposition}
            changeProduct={changeProduct}
          />

          <Section7 navigation={navigation} item={productComposition} />

          <Section8 navigation={navigation} item={item} />
        </Box>

        <Box bgColor={"white"} pt={"20px"} pb={"50px"}>
          <Section9 />
        </Box>
      </Box>
    </Animated.View>
  );
};

export default InnerContent;
