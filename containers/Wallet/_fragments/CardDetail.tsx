import React, { useRef, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Flex, Box, Text } from "native-base";
import {
  ImageBackground,
  Dimensions,
  Animated,
  View,
  Image,
} from "react-native";
import { formatDate } from "utils/formatDate";

const windowWidth = Dimensions.get("window").width;

const CardDetail = (props: any) => {
  const { item } = props;

  const cardHeight = windowWidth - 32;
  const cardWidth = cardHeight * 0.67;

  return (
    <ImageBackground
      style={{
        borderRadius: 15,
        width: cardWidth,
        height: cardHeight,
        overflow: "hidden",
        position: "relative",
      }}
      source={{ uri: item.representThumbnailImagePath }}
    >
      <LinearGradient
        start={[0, 1]}
        end={[1, 1]}
        locations={[0.2135, 1]}
        colors={["#1a1a1a33", "#1a1a1a80"]}
      >
        <Flex direction="row" alignItems="center">
          <Flex w={cardWidth - 54} justifyContent="flex-start" h={cardHeight}>
            <Text
              size="titleXL"
              color="white"
              mt="15px"
              ml="15px"
              position="absolute"
            >
            </Text>
          </Flex>
          <View
            style={{
              width: cardHeight,
              height: cardHeight,
              paddingHorizontal: 15,
              transform: [{ rotate: "270deg" }],
            }}
          >
            <Flex
              direction="row"
              h="52px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex direction="row" alignItems="center">
                <Image
                  style={{ width: 24, height: 24, marginRight: 5 }}
                  source={require("assets/images/own_piece_price.png")}
                />
                <Text size="titleL" color="white">
                  {item.purchasePieceVolume} PIECE
                </Text>
              </Flex>
              <Text size="titleS" color="white">
                {formatDate(item.purchaseAt)}
              </Text>
            </Flex>
          </View>
        </Flex>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CardDetail;
