import React from "react";

import { Center, HStack, Button, Text } from "native-base";
import { Dimensions } from "react-native";

import { ShortCutAddProps } from "interfaces/home.type";
import * as Haptics from 'expo-haptics';

const width = Dimensions.get("screen").width - 32;
const buttonWidth = (width - 40) / 5;

const ShortCutAdd = (props: ShortCutAddProps) => {
  const { add } = props;

  return (
    <HStack space={"10px"} mb={"20px"}>
      {[1, 5, 10, 50, "최대"].map((data: number|string, index: number) => (
        <Button
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              .then(() => add(data))
              .catch(() => add(data));
          }}
          key={index}
          colorScheme={'button_gray'}
          variant="outline"
          h={"40px"}
          w={buttonWidth}
        >
          <Center>
            <Text size={"buttonS"} color={"gray.500"}>
              {data === "최대" ? data : `+${data}`}
            </Text>
          </Center>
        </Button>
      ))}
    </HStack>
  );
};

export default ShortCutAdd;
