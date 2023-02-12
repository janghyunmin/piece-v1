import React from "react";

import { HStack, Button, Text, VStack } from "native-base";

import { StraightNumPadProps } from "interfaces/modal.type";
import DeleteIcon from "components/Icons/DeleteIcon";
import * as Haptics from 'expo-haptics';

const StraightNumPad = (props: any) => {
  const { reset, status, setStatus, initialStatus, depositData, type } = props;

  const num1 = [1, 2, 3];
  const num2 = [4, 5, 6];
  const num3 = [7, 8, 9];
  const num4 = ["초기화", 0, "back"];

  const handlePressBottom = (data: string | number) => {
    if (data === "초기화") {
      reset();
    }
    if (data === 0) {
      handlePressNumber(data);
    }
    if (data === "back") {
      let temp: any = status;
      temp = temp / 10;
      if (temp < 1) {
        setStatus(initialStatus);
      } else if (temp >= 1) {
        setStatus(Math.floor(temp));
      }
    }
  };

  const handlePressNumber = (data: number) => {
    if (typeof status === "string") {
      setStatus(data);
    } else {
      let temp = status;
      temp = temp * 10 + data;
      if (type === 'send' && temp > depositData.depositBalance) temp = depositData.depositBalance;
      if (temp > 99999999999) {
        Haptics.notificationAsync();
        temp = 99999999999;
      }
      setStatus(temp);
    }
  };

  return (
    <VStack w="100%" mb={"20px"}>
      <HStack justifyContent="space-between">
        {num1.map((data, index) => (
          <Button
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                .then(() => handlePressNumber(data))
                .catch(() => handlePressNumber(data));
            }}
            key={index}
            flex={1}
            pt={"18px"}
            pb={"18px"}
            justifyContent="center"
            alignItems="center"
            colorScheme="light"
          >
            <Text size={"titleXL"} color={"gray.800"}>
              {data}
            </Text>
          </Button>
        ))}
      </HStack>
      <HStack justifyContent="space-between">
        {num2.map((data, index) => (
          <Button
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                .then(() => handlePressNumber(data))
                .catch(() => handlePressNumber(data));
            }}
            key={index}
            flex={1}
            pt={"18px"}
            pb={"18px"}
            justifyContent="center"
            alignItems="center"
            colorScheme="light"
          >
            <Text size={"titleXL"} color={"gray.800"}>
              {data}
            </Text>
          </Button>
        ))}
      </HStack>
      <HStack justifyContent="space-between">
        {num3.map((data, index) => (
          <Button
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                .then(() => handlePressNumber(data))
                .catch(() => handlePressNumber(data));
            }}
            key={index}
            flex={1}
            pt={"18px"}
            pb={"18px"}
            justifyContent="center"
            alignItems="center"
            colorScheme="light"
          >
            <Text size={"titleXL"} color={"gray.800"}>
              {data}
            </Text>
          </Button>
        ))}
      </HStack>
      <HStack justifyContent="space-between">
        {num4.map((data, index) => (
          <Button
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                .then(() => handlePressBottom(data))
                .catch(() => handlePressBottom(data));
            }}
            key={index}
            flex={1}
            pt={"18px"}
            pb={"18px"}
            justifyContent="center"
            alignItems="center"
            colorScheme="light"
          >
            {data === "back" ? (
              <DeleteIcon />
            ) : (
              <Text size={data === 0 ? "titleXL" : "textS"} color={"gray.800"}>
                {data}
              </Text>
            )}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default StraightNumPad;
