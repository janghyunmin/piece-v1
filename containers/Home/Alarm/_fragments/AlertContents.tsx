import React from "react";

import { Box, Flex, ScrollView, Text } from "native-base";
import { Image } from "react-native";

import {
  AlarmContentProps,
  AlarmContentsType,
  AlarmInnerType,
} from "interfaces/home.type";

const AlertContents = (props: AlarmContentProps) => {
  const { alertContents } = props;

  return (
    <ScrollView
      zIndex={9}
      pt={"20px"}
      scrollIndicatorInsets={{ top: 1, bottom: 1 }}
      contentInsetAdjustmentBehavior={'always'}
    >
      {alertContents?.map((data: AlarmContentsType, index: number) => (
        <Flex
          key={index}
          mb={index === alertContents?.length - 1 ? "50px" : "15px"}
          borderTopWidth={index === 0 || !data.showDate ? "0" : "1px"}
          borderTopColor={"gray.300"}
        >
          {data.showDate && (
            <Text size={"textL"} mb={"15px"} pt={index !== 0 ? "20px" : "0"}>
              {data.createdAt}
            </Text>
          )}
          {/* {data?.alert.map((item: AlarmInnerType, i: number) => ( */}
          <Flex
            // key={i}
            direction={"row"}
            w={"100%"}
            mb={"20px"}
            opacity={data.isRead ? ".5" : "1"}
          >
            <Box w={"40px"} mr={"15px"}>
              <Image
                source={
                  data?.notificationType === "NTT0106"
                    ? require("assets/images/alert1.png")
                    : data?.notificationType === "NTT0101"
                    ? require("assets/images/alert2.png")
                    : data?.notificationType === "NTT0105"
                    ? require("assets/images/alert3.png")
                    : data?.notificationType === "NTT0108"
                    ? require("assets/images/alert4.png")
                    : data?.notificationType === "NTT0102"
                    ? require("assets/images/alert5.png")
                    : data?.notificationType === "NTT0107"
                    ? require("assets/images/alert6.png")
                    : data?.notificationType === "NTT0109"
                    ? require("assets/images/alert9.png")
                    : data?.notificationType === "NTT0103"
                    ? require("assets/images/alert7.png")
                    : data?.notificationType === "NTT0104"
                    ? require("assets/images/alert8.png")
                    : ""
                }
                style={{ width: 40, height: 40 }}
              />
            </Box>
            <Box flex={1}>
              <Text size={"titleS"}>{data?.title}</Text>
              <Text size={"textM"} color={"black"}>
                {data?.message}
              </Text>
            </Box>
          </Flex>
          {/* ))} */}
        </Flex>
      ))}
    </ScrollView>
  );
};

export default AlertContents;
