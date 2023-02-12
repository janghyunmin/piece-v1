import React from "react";

import { Box, Flex, Text } from "native-base";
import { formatDate } from "utils/formatDate";

const Title = (props: { item: any }) => {
  const { item } = props;

  return (
    <Box px={"16px"}>
      <Text size={"titleL"}>{item.title}</Text>
      <Text size={"titleM"} mb={"5px"}>
        {item.midTitle}
      </Text>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={"30px"}
        borderBottomColor={"gray.300"}
        borderBottomWidth={"1px"}
      >
        <Text size={"textS"} mb={"20px"}>
          {item.smallTitle}
        </Text>
        <Text size={"textS"}>{formatDate(item.createdAt)}</Text>
      </Flex>
    </Box>
  );
};

export default Title;
