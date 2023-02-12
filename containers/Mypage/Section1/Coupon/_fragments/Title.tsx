import React, { useState } from 'react'
import { Flex, Pressable, KeyboardAvoidingView, Text, Box, Input, Button } from 'native-base'
import CloseIcon from 'components/Icons/CloseIcon'
import Storage from '@react-native-async-storage/async-storage'
import { getBottomSpace } from 'react-native-iphone-x-helper';


const Title = (props: any) => {
  const { navigation } = props;

  return (
    // title layout start
    <Flex
      zIndex={999}
      h={'33px'}
      mt={10}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {/*  쿠폰함 , x버튼 layout start  */}
      <Flex
        direction={'row'}
        flex={3}
        justifyContent={'center'}
        alignItems={'center'}>

        <Flex
          flex={1.25}
          justifyContent={'center'}
          alignItems={'flex-end'}
        >
          <Text
            size={'textM'}
            w={'41px'}
            h={'20px'}
          >
            {'쿠폰함'}
          </Text>
        </Flex>

        <Flex
          flex={1}
          mr={'19px'}
          w={'40px'}
          alignItems={'flex-end'}
          justifyContent={'center'}>

          <Pressable
            onPress={() => {
              console.log('back;');
              navigation.goBack();
            }}
          >
            <CloseIcon />
          </Pressable>
        </Flex>
      </Flex>
      {/*  쿠폰함 , x버튼 layout end  */}






    </Flex>
    // title layout end
  )
}

export default Title;

