import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image, Linking, Platform } from 'react-native';

import ChatbotIcon from 'components/Icons/ChatbotIcon';
import FaqIcon from 'components/Icons/FaqIcon';
import NextGrayIcon from 'components/Icons/NextGrayIcon';

const Section3 = ({ navigation }: any) => {
  return (
    <Box px={'16px'} pt={'10px'} pb={'10px'} bgColor={'white'} mb={'10px'}>
      <Box py={'15px'}>
        <Box
          pb={'15px'}
          mb={'15px'}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
        >
          <Text size={'titleM'} color={'gray.800'}>
            이용안내
          </Text>
        </Box>

        <Pressable onPress={() => navigation.navigate('FAQ')} mb={'30px'}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              {/* <Image
                style={{ width: 24, height: 24, marginRight: 10 }}
                source={require('assets/images/icons/faq.png')}
              /> */}
              <ChatbotIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                자주 묻는 질문
              </Text>
            </Flex>
            {/* <Image
              style={{ width: 24, height: 24 }}
              source={require('assets/images/icons/next_gray.png')}
            /> */}
            <NextGrayIcon />
          </Flex>
        </Pressable>

        <Pressable onPress={() => {
          let kakaoLink = Platform.OS === 'ios' ? 'kakaoplus://plusfriend/chat/_XLxjmK' : 'https://pf.kakao.com/_XLxjmK/chat'
          Linking.openURL(kakaoLink)
            .catch((_) => {
              navigation.navigate('KakaoFailModal');
            })
        }}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <FaqIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                카카오톡 상담하기
              </Text>
            </Flex>
            <NextGrayIcon />
          </Flex>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Section3;
