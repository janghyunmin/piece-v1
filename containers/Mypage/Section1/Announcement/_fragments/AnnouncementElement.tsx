import React from "react";

import { Box, Flex, Pressable, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { AnnouncementElementProps } from "interfaces/mypage.type";
import { formatDate } from "utils/formatDate";

const AnnouncementElement = (props: AnnouncementElementProps) => {
  const { item, navigation } = props;
  return (
    <Box>
      <Pressable
        onPress={() => navigation.push("AnnouncementDetail", { boardId: item.boardId })}
      >
        {({ isPressed }) => (
          <Box
            bg={isPressed ? "gray.100" : "white"}
            px={"16px"}
            pt={"20px"}
            borderBottomWidth={"1px"}
            borderBottomColor={"gray.200"}
          >
            <Text size={"captionM"} mb={"5px"} color={"gray.500"}>
              {formatDate(item.createdAt)}
            </Text>
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={"20px"}
            >
              <Box w={"86%"}>
                <Text size={"titleM"} color={"gray.800"}>
                  {item.title}
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Pressable>
    </Box>
  );
};

export default AnnouncementElement;
