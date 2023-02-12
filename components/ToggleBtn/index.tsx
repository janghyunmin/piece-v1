import React, { useEffect, useRef, useState } from 'react';

import { Box, Pressable } from 'native-base';
import { Animated, Platform, StyleSheet } from 'react-native';

import { toggleBtnProps } from 'interfaces/components.type';
import * as Haptics from 'expo-haptics';

const ToggleBtn = (props: toggleBtnProps) => {
  const { toggle, handleToggle, data } = props;

  const buttonMovesAos = useRef(new Animated.Value(0)).current;
  const buttonMovesIos = useRef(new Animated.Value(0)).current;

  const toggleAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      .then(() => {
        if (data) {
          handleToggle(data);
        } else {
          handleToggle();
        }
      })
      .catch(() => {
        if (data) {
          handleToggle(data);
        } else {
          handleToggle();
        }
      });
  };

  useEffect(() => {
    if (toggle || data?.selected) {
      Animated.timing(buttonMovesAos, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(buttonMovesIos, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(buttonMovesAos, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(buttonMovesIos, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [toggle, data?.selected]);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <Pressable
          onPress={toggleAction}
          w={'45px'}
          h={'45px'}
          justifyContent={'center'}
        >
          <Box
            w={'45px'}
            h={'25px'}
            bgColor={toggle || data?.selected ? 'primary.500' : 'gray.300'}
            borderRadius={'15px'}
          >
            <Animated.View
              style={[
                styles.toggleButtonIos,
                {
                  left: buttonMovesIos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 22],
                  }),
                },
              ]}
            ></Animated.View>
          </Box>
        </Pressable>
      ) : (
        <Pressable
          onPress={toggleAction}
          w={'45px'}
          h={'45px'}
          justifyContent={'center'}
        >
          <Box
            w={'45px'}
            h={'14px'}
            bgColor={toggle || data?.selected ? 'primary.100' : 'gray.300'}
            borderRadius={'15px'}
          >
            <Animated.View
              style={[
                styles.toggleButtonAos,
                {
                  backgroundColor:
                    toggle || data?.selected ? '#10CFC9' : '#ffffff',
                  left: buttonMovesAos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 24],
                  }),
                },
              ]}
            ></Animated.View>
          </Box>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toggleButtonIos: {
    width: 21,
    height: 21,
    borderRadius: 10,
    top: 2,
    backgroundColor: '#ffffff',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.25,
    shadowRadius: 1.6,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  toggleButtonAos: {
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -5,
    elevation: 3,
  },
});

export default ToggleBtn;
