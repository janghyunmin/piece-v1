import React, { useCallback, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { Asset } from 'expo-asset';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, Text, NativeBaseProvider } from 'native-base';
import { Platform, StatusBar, Image as NativeImage, Alert } from 'react-native';
import { useFonts } from 'expo-font';

import store from 'store';
import theme from './style';

import Navigation from './Navigation';
import Splash from 'components/Splash';
import Storage from '@react-native-async-storage/async-storage'
import { getAppVersion } from 'apis/AppVersion';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ErrorBoundary } from 'react-error-boundary';
import InternalError from 'components/InternalError';
import * as Notifications from "expo-notifications";
// appsFlyer 추가 bskr_jhm 0707
import appsFlyer from 'react-native-appsflyer';
import "utils/ignoreWarnings";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

// Deep Link 테스트 0516_bskr jhm
const prefix = Linking.createURL("/");
const linking: any = {
  prefixes: [prefix],
  // prefixes: [
  //   Linking.createURL('exp://192.168.0.38:19002'),
  //   Linking.createURL('https://dev.piece.run'),
  //   Linking.createURL('https://piece.run')
  // ],

  config: {
    screens: {
      Alarm: 'alarm/:category',
      Notice: 'notice/:boardId',
      StackNavigation: {
        screens: {
          Portfolio: 'portfolio/:portfolioId',
          EventDetail: 'event/:eventId',
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      console.log('url null!= ' + url);
      return url;
    }

    return null;
  },
  //받아준 딥링크 url을 subscribe에 넣어줘야 한다
  subscribe(listener: (arg0: any) => any) {
    //console.log('linking subscribe to ', listener);

    const onReceiveURL = (event: { url: any; }) => {
      const { url } = event;
      //console.log('link has url', url, event);
      return listener(url);
    };

    Linking.addEventListener('url', onReceiveURL);
    return () => {
      //console.log('linking unsubscribe to ', listener + ' url : ' + onReceiveURL);
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
}

// appsFlyer Option 셋팅 bskr_jhm_0725
const option = {
  devKey: 'wHEJVXGx4pFgbEgk8BtGFF', // android dev key
  isDebug: true, // debug option
  onInstallConversionDataListener: true, //Optional
  onDeepLinkListener: true, //Optional
  timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
  appId: '1615510313', // iOS app id
};

/** AppsFlyer 앱 최초 설치 판별 start **/
async function afInstall() {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  const appsFleyerInstall = 'af_install_fst_os';
  const appsFleyerInstallValues = {
    af_device_type: deviceType,
    af_device_id: deviceId,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerInstall,
      appsFleyerInstallValues
    )
    console.log("AppsFlyer af_install_fst_os Result : " + result + ' deviceId : ' + deviceId + ' deviceType : ' + deviceType);
  } catch (error) {
    console.log("AppsFlyer af_install_fst_os Error  : " + error);
  }
}
/** AppsFlyer 앱 최초 설치 판별 end **/

/** AppsFlyer 앱 재설치 판별 organic start **/
async function afReOrganicInstall() {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  const appsFleyerReInstall = 'af_install_re_organic';
  const appsFleyerReInstallValues = {
    af_device_type: deviceType,
    af_device_id: deviceId,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerReInstall,
      appsFleyerReInstallValues
    )
    console.log("AppsFlyer af_install_re_os Result : " + result + ' deviceId : ' + deviceId + ' deviceType : ' + deviceType);
  } catch (error) {
    console.log("AppsFlyer af_install_re_os Error  : " + error);
  }
}
/** AppsFlyer 앱 재설치 판별 organic end **/

/** AppsFlyer 앱 재설치 판별 organic start **/
async function afReNonOrganicInstall() {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  const appsFleyerReInstall = 'af_install_re_nonorganic';
  const appsFleyerReInstallValues = {
    af_device_type: deviceType,
    af_device_id: deviceId,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerReInstall,
      appsFleyerReInstallValues
    )
    console.log("AppsFlyer af_install_re_os Result : " + result + ' deviceId : ' + deviceId + ' deviceType : ' + deviceType);
  } catch (error) {
    console.log("AppsFlyer af_install_re_os Error  : " + error);
  }
}
/** AppsFlyer 앱 재설치 판별 organic end **/


/** AppsFlyer 앱 광고를 통해 설치 판별 start **/
async function afInstallMedia(mediaType: string , campaign: string) {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  const appsFleyerMediaInstall = 'af_install_media';
  const appsFleyerMediaInstallValues = {
    af_device_type: deviceType,
    af_device_id: deviceId,
    af_media_type: mediaType,
    af_campaign: campaign,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerMediaInstall,
      appsFleyerMediaInstallValues
    )
    console.log("AppsFlyer af_install_media Result : " + result + ' deviceId : ' + deviceId + ' mediaType : ' + mediaType);
  } catch (error) {
    console.log("AppsFlyer af_install_media Error  : " + error);
  }
}
/** AppsFlyer 앱 광고를 통해 설치 판별 end **/

/** 구글 애즈 논오가닉 설치 start **/
async function afGoogleAdsIsntall(mediaType: string , campaign: string) {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  const appsFleyerMediaInstall = 'first_open';
  const appsFleyerMediaInstallValues = {
    af_device_type: deviceType,
    af_device_id: deviceId,
    af_media_type: mediaType,
    af_campaign: campaign,
  }

  try {
    var result = await appsFlyer.logEvent(
      appsFleyerMediaInstall,
      appsFleyerMediaInstallValues
    )
    console.log("AppsFlyer first_open Result : " + result + ' deviceId : ' + deviceId + ' mediaType : ' + mediaType);
  } catch (error) {
    console.log("AppsFlyer first_open Error  : " + error);
  }
}
/** 구글 애즈 논오가닉 설치 end **/


const onInstallConversionData = appsFlyer.onInstallConversionData(
  (res) => {
    if (JSON.parse(res.data.is_first_launch) == true) {
      afGoogleAdsIsntall(res.data.media_source,res.data.campaign); // 구글 Ads 설치 ( 최초일때 )
      if (res.data.af_status === 'Non-organic') {
        var media_source = res.data.media_source;
        var campaign = res.data.campaign;
        afInstallMedia(media_source, campaign); // 최초 설치이며 광고 유입으로 설치한 경우
        console.log('최초설치이며 광고유입으로 설치 완료. 설치 경로 미디어 타입: ' + media_source + ' Campaign: ' + campaign);
      } 
      else if (res.data.af_status === 'Organic') {
        afInstall();
        console.log('최초 설치이며 사용자가 스토어에서 앱 검색 설치 한 케이스');
      }
    } else {
      afGoogleAdsIsntall(res.data.media_source,res.data.campaign); // 구글 Ads 설치 ( 최초가 아닐때 )
      console.log('최초 설치가 아닙니다.');
      if(res.data.af_status === "Non-organic") {
        afReNonOrganicInstall();
        console.log('최초 설치가 아니며 광고 유입을 통한 설치');
      } else if (res.data.af_status === 'Organic') {
        afReOrganicInstall();
        console.log('최초 설치가 아니며 사용자가 스토어에서 앱 검색 설치 한 케이스');
      }
    }
  }
);

const onInstallGCDFailure = appsFlyer.onInstallConversionFailure(res => {
  console.log(JSON.stringify(res, null, 2));
});

console.log('onInstallConversionData : ' + onInstallConversionData)
console.log('onInstallGCDFailure : ' + onInstallGCDFailure)



// Direct deeplink
// async function directDeepLink() {
//   try {
//     var result = await appsFlyer.onDeepLink((res) => {
//       const DLValue = res?.data.deep_link_value;
//         const mediaSrc = res?.data.media_source;
//         const param1 = res?.data.af_sub1;
//         console.log(DLValue);
//         console.log(JSON.stringify(res?.data, null, 2));
//     })
//     console.log('AppsFlyer DeepLink Result : ' + result);
//   } catch (e) {
//     console.log(e);
//   }
// }

// 비동기 initSdk 호출 bskr_jhm_0725
async function initSdk() {
  try {
    if(Platform.OS === 'ios') {
      appsFlyer.setCurrentDeviceLanguage("KR");
    }
    //appsFlyer.setAppInviteOneLinkID('oW4R');
    try{ 
      var result = await appsFlyer.initSdk(option,null,null);
      console.log("AppsFlyer Init Result : " + result);
    } catch (e) {
      console.log(e);
    }
  
  } catch (error) {
    console.log("AppsFlyer Init Error  : " + error);
  }
}

// 비동기 appsFlyerUID 호출 bskr_jhm_0725
async function getAppsFlyerUID() {
  try { 
    await appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
      if(err) { 
        console.log('err : ' + err);
      } else {
        console.log('getAppsFlyerUID : ' + appsFlyerUID);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


export default function App() {
  const [appIsReady, setAppIsReady] = useState<null | boolean>(null);

  // 앱 시작시 딥링크
  //directDeepLink();


  // 앱 시작시 initSdk 호출 bskr_jhm_0725
  initSdk();

  // 앱 시작시 appsFlyerUID 호출 bskr_jhm_0725
  getAppsFlyerUID();
  

  let [fontsLoaded] = useFonts({
    Pretendard_Regular: require('./assets/Pretendard-Regular.otf'),
    Pretendard_Bold: require('./assets/Pretendard-Bold.otf'),
    Pretendard_Extra_Bold: require('./assets/Pretendard-ExtraBold.otf'),
  });

  const cacheImages = (images: any) => {
    return images.map((image: any) => {
      if (typeof image === 'string') {
        return NativeImage.prefetch(image);
      }
      return Asset.fromModule(image).downloadAsync();
    });
  };

  const loadAssetsAsync = async () => {
    require('assets/lottie/run_start.json');
    require('assets/lottie/run_looping.json');
    require('assets/lottie/run_end.json');
    require('assets/lottie/progress_bar.json');
    const imageAssets = cacheImages([
      require('assets/images/alarm.gif'),
      require('assets/images/alarm_background.png'),
      require('assets/images/alarm_lopping.gif'),
      require('assets/images/alarm_none.png'),
      require('assets/images/alert1.png'),
      require('assets/images/alert2.png'),
      require('assets/images/alert3.png'),
      require('assets/images/alert4.png'),
      require('assets/images/alert5.png'),
      require('assets/images/alert6.png'),
      require('assets/images/alert7.png'),
      require('assets/images/alert8.png'),
      require('assets/images/announcement_temp_image.png'),
      require('assets/images/balance_1.png'),
      require('assets/images/balance_2.png'),
      require('assets/images/balance_3.png'),
      require('assets/images/balance_4.png'),
      require('assets/images/balance_5.png'),
      require('assets/images/balance_6.png'),
      require('assets/images/balance_7.png'),
      require('assets/images/balance_8.png'),
      require('assets/images/balance_9.png'),
      require('assets/images/balance_10.png'),
      require('assets/images/bank1.png'),
      require('assets/images/bank2.png'),
      require('assets/images/bank3.png'),
      require('assets/images/bank4.png'),
      require('assets/images/bank5.png'),
      require('assets/images/bank6.png'),
      require('assets/images/bank7.png'),
      require('assets/images/bank8.png'),
      require('assets/images/bank9.png'),
      require('assets/images/bank10.png'),
      require('assets/images/bank11.png'),
      require('assets/images/bank12.png'),
      require('assets/images/bank13.png'),
      require('assets/images/bank14.png'),
      require('assets/images/bank15.png'),
      require('assets/images/bank16.png'),
      require('assets/images/bank17.png'),
      require('assets/images/bank18.png'),
      require('assets/images/bank19.png'),
      require('assets/images/bank20.png'),
      require('assets/images/bank21.png'),
      require('assets/images/bank22.png'),
      require('assets/images/bank23.png'),
      require('assets/images/bank24.png'),
      require('assets/images/bookmark_active.png'),
      require('assets/images/bookmark_gray.png'),
      require('assets/images/buy_info1.png'),
      require('assets/images/buy_info2.png'),
      require('assets/images/buy_info3.png'),
      require('assets/images/buy_info4.png'),
      require('assets/images/buy_portfolio_1.png'),
      require('assets/images/buy_portfolio_2.png'),
      require('assets/images/buy_portfolio_3.png'),
      require('assets/images/buy_portfolio_4.png'),
      require('assets/images/buy_portfolio_5.png'),
      require('assets/images/certificate_temp_image.png'),
      require('assets/images/composition_temp_1.png'),
      require('assets/images/composition_temp_2.png'),
      require('assets/images/trans_title.png'),
      require('assets/images/c_nocoupon_icon.png'),
      require('assets/images/coupon_layout_aos.png'),
      require('assets/images/c_coupon_title.png'),
      require('assets/images/c_trans_btn.png'),
      require('assets/images/c_syrup_icon.png'),
      require('assets/images/c_kb_icon.png'),
      require('assets/images/c_kb_icon_3.png'),
      require('assets/images/deposit_charged.gif'),
      require('assets/images/deposit_charged_lopping.gif'),
      require('assets/images/document_1.jpg'),
      require('assets/images/document_2.jpg'),
      require('assets/images/document_3.jpg'),
      require('assets/images/document_4.jpg'),
      require('assets/images/document_5.jpg'),
      require('assets/images/document_6.jpg'),
      require('assets/images/event_temp1.png'),
      require('assets/images/event_temp2.png'),
      require('assets/images/fail.png'),
      require('assets/images/FAQ.png'),
      require('assets/images/fingerprint.png'),
      require('assets/images/hello_lopping.gif'),
      require('assets/images/join_complete_looping.gif'),
      require('assets/images/login_image.png'),
      require('assets/images/login_redirect.png'),
      require('assets/images/logo.png'),
      require('assets/images/magazine_main.png'),
      require('assets/images/magazine_main_1_06.png'),
      require('assets/images/magazine_main_2_06.png'),
      require('assets/images/magazine_temp1.png'),
      require('assets/images/magazine_temp2.png'),
      require('assets/images/magazine_temp3.png'),
      require('assets/images/main.png'),
      require('assets/images/modal_crying.png'),
      require('assets/images/mypage_image.png'),
      require('assets/images/mypage_image2.png'),
      require('assets/images/network_error.png'),
      require('assets/images/NotFound.png'),
      require('assets/images/own_piece_1.png'),
      require('assets/images/own_piece_2.png'),
      require('assets/images/own_piece_3.png'),
      require('assets/images/own_piece_4.png'),
      require('assets/images/own_piece_5.png'),
      require('assets/images/own_piece_6.png'),
      require('assets/images/own_piece_price.png'),
      require('assets/images/piece_3d.png'),
      require('assets/images/policy_image.png'),
      require('assets/images/portfolio_2.png'),
      require('assets/images/portfolio_3.png'),
      require('assets/images/portfolio_inner_1.png'),
      require('assets/images/portfolio_inner_2.png'),
      require('assets/images/portfolio_inner_3.png'),
      require('assets/images/portfolio_inner_4.png'),
      require('assets/images/portfolio_inner_alarm_text.png'),
      require('assets/images/portfolio_inner_human.png'),
      require('assets/images/portfolio_temp.png'),
      require('assets/images/portfolio_temp_image.png'),
      require('assets/images/portfolio_temp_image2.png'),
      require('assets/images/portfolio_temp_image3.png'),
      require('assets/images/pose_1.png'),
      require('assets/images/pose_3.png'),
      require('assets/images/promotion1.png'),
      require('assets/images/promotion2.png'),
      require('assets/images/promotion_none.png'),
      require('assets/images/proof1.png'),
      require('assets/images/proof2.png'),
      require('assets/images/proof3.png'),
      require('assets/images/proof4.png'),
      require('assets/images/proof5.png'),
      require('assets/images/proof6.png'),
      require('assets/images/purchase_complete.gif'),
      require('assets/images/purchase_complete_lopping.gif'),
      // require('assets/images/purchase_complete_wait.png'),
      require('assets/images/purchase_wait.gif'),
      require('assets/images/result_complete.png'),
      require('assets/images/result_fail.png'),
      require('assets/images/run_end.gif'),
      require('assets/images/run_lopping.gif'),
      require('assets/images/run_start.gif'),
      require('assets/images/sign_up_complete.png'),
      require('assets/images/stamp.png'),
      require('assets/images/subscribe_active.png'),
      require('assets/images/temp_ad.png'),
      require('assets/images/temp_home_event.png'),
      require('assets/images/wallet_image.png'),
      require('assets/images/wallet_piece_none.png'),
      require('assets/images/wallet_temp.png'),
      require('assets/images/withdraw_complete.gif'),
      require('assets/images/withdraw_complete_lopping.gif'),
      require('assets/images/withdrawal_image.png'),
      require('assets/images/arrowup.png'),
    ]);

    await Promise.all([...imageAssets]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      setTimeout(() => {
        setAppIsReady(false);
      }, 2800);
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAssetsAsync();
        setAppIsReady(true);

      } catch (e: any) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
    return () => { };
  }, []);

  const [initialRouteName, setInitialRouteName] = useState<string>('');
  useEffect(() => {
    const init = async () => {
      const auth = await Storage.getItem('@auth');
      if (auth) return setInitialRouteName('login')
      return setInitialRouteName('Start');
    }
    init();
  }, [])

  useEffect(() => {
    Storage.setItem('@isPopup', 'true');
    Storage.setItem('@isLogin', 'false');
  }, []);


  if (!fontsLoaded) return <></>;
  if (appIsReady === null) return <></>;
  return (
    <>
      {appIsReady ? (
        <Splash onLayoutRootView={onLayoutRootView} />
      ) : (
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={theme}>
              <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
              />
              {initialRouteName && (
                <ErrorBoundary
                  FallbackComponent={InternalError}
                >
                  <NavigationContainer linking={linking}>
                    <Navigation initialRouteName={initialRouteName} />
                  </NavigationContainer>
                </ErrorBoundary>
              )}
            </NativeBaseProvider>
          </QueryClientProvider>
        </Provider>
      )}
    </>
  );
}
