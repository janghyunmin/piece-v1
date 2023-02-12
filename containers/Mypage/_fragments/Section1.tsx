import React , {useState} from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';
import EventIcon from 'components/Icons/EventIcon';
import CouponIcon from 'components/Icons/CouponIcon';
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import NoticeIcon from 'components/Icons/NoticeIcon';
import UserIcon from 'components/Icons/UserIcon';



const Section1 = ({ navigation }: any) => {
  return (
    <Box px={'16px'} pt={'40px'} pb={'10px'} bgColor={'white'} mb={'10px'}>
      <Box py={'15px'}>
        <Pressable
          onPress={() => navigation.navigate('Announcement')}
          mb={'30px'}
        >
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <NoticeIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                공지사항
              </Text>
            </Flex>
            <NextGrayIcon />
          </Flex>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Event')}
         mb={'30px'}
        >
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              {/* <Image
                style={{ width: 24, height: 24, marginRight: 10 }}
                source={require('assets/images/icons/event.png')}
              /> */}
              <EventIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                이벤트
              </Text>
            </Flex>
            {/* <Image
              style={{ width: 24, height: 24 }}
              source={require('assets/images/icons/next_gray.png')}
            /> */}
            <NextGrayIcon />
          </Flex>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Coupon')}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Flex direction={'row'} alignItems={'center'}>
              <CouponIcon />
              <Text size={'textM'} color={'gray.800'} ml={'10px'}>
                쿠폰함
              </Text>
            </Flex>
            <NextGrayIcon />
          </Flex>
        </Pressable>

        {/*<Pressable onPress={() => navigation.navigate('MyInfo')}>*/}
        {/*  <Flex*/}
        {/*    direction={'row'}*/}
        {/*    alignItems={'center'}*/}
        {/*    justifyContent={'space-between'}*/}
        {/*  >*/}
        {/*    <Flex direction={'row'} alignItems={'center'}>*/}
        {/*      /!* <Image*/}
        {/*        style={{ width: 24, height: 24, marginRight: 10 }}*/}
        {/*        source={require('assets/images/icons/user.png')}*/}
        {/*      /> *!/*/}
        {/*      <UserIcon />*/}
        {/*      <Text size={'textM'} color={'gray.800'} ml={'10px'}>*/}
        {/*        내 정보*/}
        {/*      </Text>*/}
        {/*    </Flex>*/}
        {/*    /!* <Image*/}
        {/*      style={{ width: 24, height: 24 }}*/}
        {/*      source={require('assets/images/icons/next_gray.png')}*/}
        {/*    /> *!/*/}
        {/*    <NextGrayIcon />*/}
        {/*  </Flex>*/}
        {/*</Pressable>*/}
      </Box>
    </Box>
  );
};

export default Section1;
