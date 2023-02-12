import React, { useEffect, useMemo } from "react";

import { Box, Flex, Text, Image } from "native-base";
import { convertCode } from "utils/convertCode";

const HistoryLeft = (props: any) => {
  const { data } = props;

  const memorizedDate = useMemo(() => {
    const date = new Date(data.createdAt+'Z');
    return `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일`;
  }, [data]);

  return (
    <Flex direction={"row"} alignItems={"center"} flex={1} mr={"18px"}>
      <Image
        key={convertCode(data.changeReason).title}
        alt={"deposit_history_image"}
        w={"40px"}
        h={"40px"}
        mr={"10px"}
        source={convertCode(data.changeReason).image}
      />
      <Box>
        <Text size={"titleM"}>{convertCode(data.changeReason).title}</Text>
        <Text size={"captionM"} color={"gray.700"} noOfLines={1}>
          {memorizedDate} {data.changeReasonDetail && `| ${data.changeReasonDetail}`}
        </Text>
      </Box>
    </Flex>
  );
};

export default HistoryLeft;
