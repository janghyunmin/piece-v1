import React, { useCallback, useEffect } from 'react'

import { Box, PresenceTransition } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native';

import Layout from 'components/Layout';
import Rounds from './_fragments/Rounds';
import Intro from './_fragments/Intro';
import FooterBtn from './_fragments/FooterBtn';
import { getBottomSpace } from 'react-native-iphone-x-helper'

const statusBarHeight = getStatusBarHeight();
const width = Dimensions.get('screen').width; // 화면 크기

const firstWidth = width + width * 0.45333; // 첫번째 동그라미 크기
const firstTop = firstWidth * 0.238532 + statusBarHeight; // 첫번째 동그라미 top
const firstLeft = firstWidth * 0.117431; // 첫번째 동그라미 left

const secondWidth = width + width * 0.141313; // 두번째 동그라미 크기
const secondTop = secondWidth * 0.34813; // 두번째 동그라미 top
const secondLeft = secondWidth * 0.2196261; // 두번째 동그라미 left

import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'


/** AppsFlyer 회원가입 클릭 start **/
async function afStart() {
  let deviceId = await Storage.getItem('@deviceId');
  const appsFlyerSignUp = 'af_start';
  const appsFlyerSignUpValues = {
    af_device_id: deviceId,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFlyerSignUp,
      appsFlyerSignUpValues
    )
    console.log("AppsFlyer af_start Result : " + result);
  } catch (error) {
    console.log("AppsFlyer af_start Error  : " + error);
  }
}
/** AppsFlyer 회원가입 클릭 end **/


export const Start = ({ navigation, route }: any) => {
  const startPiece = useCallback(() => {

    // afSignUp Call..
    afStart()

    return navigation.navigate('StackNavigation', {
      screen: 'auth',
      params: { screen: 'certification', params: { kind: 'SIGNUP' } }
    });
  }, []);


  useEffect(() => {
    // console.log('route.params?.isDeviceLogout : ' + route.params?.isDeviceLogout);
    // console.log('route.params?.isTokenLogout : ' + route.params?.isTokenLogout);
    // console.log('route.params?.isLogout : ' + route.params?.isLogout);
    if (route.params?.isDeviceLogout) {
      navigation.navigate('LogoutModal');
    }
    if (route.params?.isTokenLogout) {
      navigation.navigate('LogoutModal', { isTokenLogout: route.params?.isTokenLogout });
    }
    if (route.params?.isLogout) {
      navigation.navigate('LogoutModal', { isLogout: route.params?.isLogout });
    }
  }, [route.params?.isDeviceLogout, route.params?.isTokenLogout, route.params?.isLogout])


  return (
    <Layout>
      <PresenceTransition
        visible={true}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 250 } }}
      >
        <Box position={'relative'} h={'100%'}>
          <Rounds
            firstWidth={firstWidth}
            firstTop={firstTop}
            firstLeft={firstLeft}
            secondWidth={secondWidth}
            secondTop={secondTop}
            secondLeft={secondLeft}
          />
          <Box position={'absolute'} bottom={0} pb={getBottomSpace()}>
            <Intro width={width} />

            <FooterBtn
              width={width}
              navigation={navigation}
              startPiece={startPiece}
            />
          </Box>
        </Box>
      </PresenceTransition>
    </Layout>
  );
};
