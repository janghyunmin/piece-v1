import React, { useMemo, useState, useEffect, useCallback } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import { HStack, Button, Text, VStack } from "native-base";
import { StyleSheet } from 'react-native';

import DeleteIcon from "components/Icons/DeleteIcon";
import * as Haptics from 'expo-haptics';


const NumberPad = (props: NumberPadType) => {
  const { setNumber, deleteNumber, reset, isRandom, random, isDisabled } = props;
  const randomNum = useMemo(() => {
    var nrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return !isRandom
      ? nrs
      : nrs.sort(() => {
        return Math.floor(Math.random() * 3 - 1);
      });
  }, [random]);


  // 0803_bskr_jhm 버튼 css
  const styles = StyleSheet.create({
    keyPadBtn: {
      backgroundColor: "#FFFFFF",
      padding: 10,
      width: 120,
      height: 70,
      pt: 18,
      pb: 18,
      justifyContent: "center",
      alignItems: "center",
    }
  });


  return (
    <VStack space={3} w="100%" px={"16px"}>
      <HStack justifyContent="space-between">
        {randomNum.slice(0, 3).map((data: number, index: number) => (
          <TouchableHighlight
            underlayColor={'#EAECF0'}
            style={styles.keyPadBtn}
            key={index}
            onPress={() => {
              if (!isDisabled) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  .then(() => setNumber(data))
                  .catch(() => setNumber(data));
              }
            }}
          >
            <Text size={"titleXL"} color={"#4A4D55"}>
              {data}
            </Text>
          </TouchableHighlight>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {randomNum.slice(3, 6).map((data: number, index: number) => (
          <TouchableHighlight
            underlayColor={'#EAECF0'}
            style={styles.keyPadBtn}
            key={index}
            onPress={() => {
              if (!isDisabled) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  .then(() => setNumber(data))
                  .catch(() => setNumber(data));
              }
            }}
          >
            <Text size={"titleXL"} color={"#4A4D55"}>
              {data}
            </Text>
          </TouchableHighlight>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {randomNum.slice(6, 9).map((data: number, index: number) => (
          <TouchableHighlight
            underlayColor={'#EAECF0'}
            style={styles.keyPadBtn}
            key={index}
            onPress={() => {
              if (!isDisabled) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  .then(() => setNumber(data))
                  .catch(() => setNumber(data));
              }
            }}
          >
            <Text size={"titleXL"} color={"#4A4D55"}>
              {data}
            </Text>
          </TouchableHighlight>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {["초기화", randomNum[9], "back"].map(
          (data: number | string, index: number) => (
            <TouchableHighlight
              underlayColor={'#EAECF0'}
              style={styles.keyPadBtn}
              key={index}
              onPress={() => {
                if (typeof data === "number") {
                  if (!isDisabled) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      .then(() => setNumber(data))
                      .catch(() => setNumber(data));
                  }
                }
                if (data === "back") {
                  if (!isDisabled) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      .then(() => deleteNumber())
                      .catch(() => deleteNumber());
                  }
                }
                if (data === "초기화") {
                  if (!isDisabled) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      .then(() => reset())
                      .catch(() => reset());
                  }
                }
              }}
            >

              {data === "back" ? (
                <DeleteIcon />
              ) : (
                <Text
                  size={data === "초기화" ? "textS" : "titleXL"}
                  color={"#4A4D55"}
                >
                  {data}
                </Text>
              )}
            </TouchableHighlight>

          )
        )}
      </HStack>
    </VStack>
  );
};

export default NumberPad;

function myComponent() {

}