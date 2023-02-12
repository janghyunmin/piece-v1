import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Dimensions, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import BookmarkIcon from 'components/Icons/BookmarkIcon';

import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'



const statusBarHeight = getStatusBarHeight();
const width = Dimensions.get('screen').width;

/** AppsFlyer 라운지 > 상단 북마크 클릭시 start **/
async function afTopBookMarkClick(type: string) {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerTopBookMarkDetailClick = '';

  if (memberId === '' || memberId === null) {
    appsFleyerTopBookMarkDetailClick = 'af_lounge_main_top_bookmark_browsing_' + type;
    const appsFleyerTopBookMarkDetailValues = {
      af_device_id: deviceId,
      af_type: type,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerTopBookMarkDetailClick,
        appsFleyerTopBookMarkDetailValues
      )
      console.log("AppsFlyer af_lounge_main_top_bookmark_browsing_ Result : " + result + type);
    } catch (error) {
      console.log("AppsFlyer af_lounge_main_top_bookmark_browsing_ Error  : " + error);
    }
  }
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerTopBookMarkDetailClick = 'af_lounge_main_top_bookmark_login_' + type;
    const appsFleyerTopBookMarkDetailValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
      af_type: type,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerTopBookMarkDetailClick,
        appsFleyerTopBookMarkDetailValues
      )
      console.log("AppsFlyer af_lounge_main_top_bookmark_login_ Result : " + result + type);
    } catch (error) {
      console.log("AppsFlyer af_lounge_main_top_bookmark_login_ Error  : " + error);
    }
  }
}
/** AppsFlyer 라운지 > 상단 북마크 클릭시  end **/



// 매거진 상단 이미지 레이아웃
const Header = (props: any) => {
  const { navigation, bookmarkCount, isUser } = props;

  return (
    <Box
      position={'relative'}
      height={width*1.4}
    >
      <Image
        style={{ width: width, height: width*1.4, position: 'absolute' }}
        source={require('assets/images/magazine_main_2_06.png')}
        resizeMode={'cover'}
      />

      <Box pt={`${statusBarHeight}px`} px={'16px'}>
        <Flex h={'80px'} mt={'17.5px'} alignItems={'flex-end'}>
          <Pressable onPress={() => {
            if (!isUser) {
              afTopBookMarkClick('비로그인_라운지');
              return navigation.navigate('LoginRedirect', { isUser });
            } else {
              navigation.navigate('bookmark');
              afTopBookMarkClick('로그인_라운지');
            }
          }}>
            <Flex
              bgColor={'#00000033'}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              borderWidth={'1px'}
              borderColor={'white'}
              w={'93px'}
              h={'45px'}
              borderRadius={'30px'}
            >
              <BookmarkIcon />
              <Text bold size={'textL'} color={'white'} ml={'4px'}>
                {bookmarkCount}
              </Text>
            </Flex>
          </Pressable>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
