import React, { useEffect, useRef, useState } from 'react';
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Linking from 'expo-linking';
import * as Updates from 'expo-updates';

import { Platform, Alert, Animated } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useDispatch } from "react-redux";
import NetInfo from '@react-native-community/netinfo';


import Start from "screens/auth/start";

// icons
import HomeIcon from "components/Icons/HomeIcon";
import HomeActiveIcon from "components/Icons/HomeActiveIcon";
import MagazineIcon from "components/Icons/MagazineIcon";
import MagazineActiveIcon from "components/Icons/MagazineActiveIcon";
import WalletIcon from "components/Icons/WalletIcon";
import WalletActiveIcon from "components/Icons/WalletActiveIcon";
import MypageIcon from "components/Icons/MypageIcon";
import MypageActiveIcon from "components/Icons/MypageActiveIcon";

// auth
import Login from "screens/auth/login";
import AccountAlready from "containers/Auth/AccountAlready";
import PasswordScreen from "screens/auth/password";
import Certification from "screens/auth/certification";
import SignUpComplete from "screens/auth/signUpComplete";

// tab
import HomeScreen from "screens/main/home";
import MagazineScreen from "screens/main/magazine";
import WalletScreen from "screens/main/wallet";
import MypageScreen from "screens/main/mypage";

// home
import Alarm from "containers/Home/Alarm";
import PortfolioInner from "containers/Home/PortfolioInner";
import BuyPortfolio from "containers/Home/BuyPortfolio";
import Password from "containers/Home/Password";
import Result from "containers/Home/Result";

// magazine
import Posts from "containers/Magazine/Posts";
import Bookmark from "containers/Magazine/Bookmark";

// wallet
import OwnPiece from "containers/Wallet/WalletStack/OwnPiece";
import OwnMoney from "containers/Wallet/WalletStack/OwnMoney";
import MoneyMoves from "containers/Wallet/WalletStack/MoneyMoves";
import MoneyMovesCheck from "containers/Wallet/WalletStack/MoneyMovesCheck";
import MoneyMovesResult from "containers/Wallet/WalletStack/Result";
import OwnDeed from "containers/Wallet/WalletStack/OwnDeed";

// bankAccountRegister
import SelectBankAccount from "containers/Wallet/AccountStack/SelectBankAccount";
import RegisterBankAccount from "containers/Wallet/AccountStack/RegisterBankAccount";
import BankAccountComplete from "containers/Wallet/AccountStack/BankAccountComplete";
import RegisterComplete from "containers/Wallet/AccountStack/RegisterComplete";

// mypage
import Announcement from "containers/Mypage/Section1/Announcement";
import AnnouncementDetail from "containers/Mypage/Section1/AnnouncementDetail";
import Event from "containers/Mypage/Section1/Event";
import EventInner from "containers/Mypage/Section1/Event/EventInner";
import Coupon from "containers/Mypage/Section1/Coupon";
import MyInfo from "containers/Mypage/Section1/MyInfo";
import Security from "containers/Mypage/Section2/Security";
import ChangePw from "containers/Mypage/Section2/Security/SecurityInner/ChangePw";
import Withdrawal from "containers/Mypage/Section2/Security/SecurityInner/Withdrawal";
import Withdrawal2 from "containers/Mypage/Section2/Security/SecurityInner/Withdrawal2";
import WithdrawalComplete from "containers/Mypage/Section2/Security/SecurityInner/WithdrawalComplete";
import MyPageAlarm from "containers/Mypage/Section2/Alarm";
import Policy from "containers/Mypage/Section2/Policy";
import PolicyInner from "containers/Mypage/Section2/Policy/PolicyInner";
import ChatBot from "containers/Mypage/Section3/ChatBot";
import Faq from "containers/Mypage/Section3/FAQ";
// import ConfirmEmail from "containers/Mypage/ConfirmEmail";

// modal
import SelectCarrier from "components/Modal/SelectCarrier";
import PolicyAgreement from "components/Modal/PolicyAgreement";
import CertificationNum from "components/Modal/CertificationNum";
import HaveNoAccount from "components/Modal/HaveNoAccount";
import SearchAddress from "components/Modal/SearchAddress";
import DetailAddress from "components/Modal/DetailAddress";
import ConfirmModal from "components/Modal/ConfirmModal";
import LoginRedirect from "components/Modal/LoginRedirect";
import PwChangeComplete from "components/Modal/PwChangeComplete";
import Logout from "components/Modal/Logout";
import CouponModal from "components/Modal/CouponModal";
import CommonModal from "components/Modal/CommonModal";
import CouponAlert from "components/Modal/CouponAlert";
import UnableToWithdraw from "components/Modal/UnableToWithdraw";
import WithdrawalCheck from "components/Modal/WithdrawalCheck";
import HomeEvent from "components/Modal/HomeEvent";
import BuyPortfolioModal from "components/Modal/BuyPortfolio";
import SetAlarm from "components/Modal/SetAlarm";
import PortfolioInnerDesc from "components/Modal/PortfolioInnerDesc";
import CancelPurchase from "components/Modal/CancelPurchase";
import AboutCancelPurchase from "components/Modal/AboutCancelPurchase";
import HaveNoInfo from "components/Modal/HaveNoInfo";
import HaveInfo from "components/Modal/HaveInfo";
import RequestDeed from "components/Modal/RequestDeed";
import ConfirmEmailComplete from "components/Modal/ConfirmEmailComplete";
import BioAuth from "components/Modal/BioAuth";
import OwnMoneyFilter from "components/Modal/OwnMoneyFilter";
import BankAccountCheckCertificationNum from "components/Modal/BankAccountCheckCertificationNum";
import FullSizeImage from "components/Modal/FullSizeImage";

// component
import NetworkError from "components/NetworkError";
import NotFound from "components/NotFound";
import QuickPw from "components/QuickPw.tsx";
import CertificationRealName from "components/Modal/CertificationRealName";
import CertificateRealName from "containers/Wallet/WalletStack/CertificateRealName";
import CertificationRealNameFailModal from "components/Modal/CertificationRealNameFailModal";
import CertificationRealNameCompleteModal from "components/Modal/CertificationRealNameCompleteModal";
import BankAccountCheckFailModal from "components/Modal/BankAccountCheckFailModal";
import CertificationFailModal from "components/Modal/CertificationFailModal";
import { setDeviceId, setDeviceToken } from "features/deviceSlice";
import Storage from "@react-native-async-storage/async-storage";
import LoginFailModal from "components/Modal/LoginFailModal";
import UpdateEmailModal from "components/Modal/UpdateEmailModal";
import ConfirmEmailModal from "components/Modal/ConfirmEmailModal";
import VirtualBankPolicyAgreement from 'components/Modal/VirtualBank/VirtualBankPolicyAgreement'
import VirtualBankCertification from 'components/Modal/VirtualBank/VirtualBankCertification'
import VirtualBankConfirmModal from 'components/Modal/VirtualBank/VirtualBankConfirmModal'
import useForegroundEffect from 'hooks/useForegroundEffect'
import { getMember, updateMemberDevice } from 'apis/Member'
import LogoutModal from 'components/Modal/LogoutModal'
import AgreementDetail from 'containers/Auth/AgreementDetail'
import VirtualBankCreate from 'containers/Wallet/WalletStack/VirtualBankCreate'
import VirtualBankCreateComplete from 'containers/Wallet/WalletStack/VirtualBankCreateComplete'
import CancelPurchaseComplete from 'components/Modal/CancelPurchaseComplete'
import FailedResult from 'containers/Home/FailedResult'
import VirtualBankAgreementDetail from 'components/Modal/VirtualBank/VirtualBankAgreementDetail'
import { useQueryClient } from 'react-query'
import CertificationFailModal2 from 'components/Modal/CertificationFailModal2'
import { refreshAuth } from 'apis/Auth'
import KakaoFailModal from 'components/Modal/KakaoFailModal'
import RegisterFail from 'containers/Auth/RegisterFail'
import CertificationComplete from 'containers/Auth/CertificationComplete'
import { initAuth, setAuth, setIsFido } from 'features/authSlice';
import uuid from 'utils/uuid'
import OwnDeedFailModal from 'components/Modal/OwnDeedFailModal'
import { getAppVersion } from 'apis/AppVersion';
import VersionError from 'components/VersionError';
import { checkVersionError } from 'utils/checkVersionError';
import RequestDeedFail from 'components/Modal/RequestDeedFail';
import * as Network from 'expo-network';
import * as Haptics from 'expo-haptics';
import PieceWeb from 'containers/Home/PieceWeb';
import CancelPassword from 'containers/Wallet/WalletStack/CancelPassword';
import TreeMap from 'containers/Wallet/_fragments/TreeMap';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm

// stacks
const Stack = createSharedElementStackNavigator();
const AnimationWalletStack = createSharedElementStackNavigator();
const AnimationHomeStack = createSharedElementStackNavigator();
const AuthStack = createStackNavigator();
const Root = createStackNavigator();
const OwnMoneyStack = createStackNavigator();
const BankAccountRegisterStack = createStackNavigator();
const Tab = createBottomTabNavigator();
// 애니메이션을 위한 Stack 별도 설정
const PortfolioStack = createStackNavigator();
const EventStack = createStackNavigator();
const SecurityStack = createStackNavigator();
const PolicyStack = createStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

// 푸시알림
async function registerForPushNotificationsAsync() {
  let token = '';
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") return;
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export default function Navigation({ initialRouteName }: any) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const notificationListener = useRef<any>();
  const navigation = useNavigation<any>();
  const [isConnected, setIsConnected] = useState<null | boolean>(null);
  const [refetch, setRefetch] = useState<number>(+new Date());

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      queryClient.invalidateQueries(['Notification']);
      queryClient.invalidateQueries(['NotificationStatus']);
      if (notification.request.content.data.type === 'deposit') {
        queryClient.invalidateQueries(['Deposit']);
        queryClient.invalidateQueries(['DepositHistory']);
      }
      if (notification.request.content.data.type === 'login') {
        init();
      }
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected!);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      const removeTimeout = setTimeout(() => {
        navigation.navigate('NetworkError', { isConnected });
      }, 3000);

      const removeInterval = setInterval(async () => {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected!);
      }, 1000);

      return () => {
        clearTimeout(removeTimeout);
        clearInterval(removeInterval);
      };

    }
    if (isConnected === true) {
      const removeTimeout = setTimeout(() => {
        init();
      }, 1000);
      return () => clearTimeout(removeTimeout);
    }
  }, [isConnected, refetch]);


  useForegroundEffect(() => {
    setRefetch(+new Date());
  });


  const init = async () => {
    // 최신버전 확인 bskr_0730_jhm
    try {
      const { data: { version } } = await getAppVersion(Platform.OS === 'ios' ? 'MDO0102' : 'MDO0101')
      const localVersion: any = Constants.manifest?.version;

      if (checkVersionError(version, localVersion)) {
    return Alert.alert(
      'PIECE 앱을 최신버전으로 업데이트해 주세요.',
      '[확인]버튼을 누르시면 설치 화면으로 이동 합니다.',
      [{
        text: '확인', onPress: () => {
          if (Platform.OS === 'ios') Linking.openURL(`itms-apps://itunes.apple.com/app/1615510313`);
          else Linking.openURL(`market://details?id=run.piece.dev`);
        }
      }],
      { cancelable: false },
    );
      }
    } catch (e) {
      return navigation.navigate('NetworkError', { isConnected: false });
    }

    // bskr_0730_jhm 업데이트 로직 변경 진행중..
    // try {
    //   const update = await Updates.checkForUpdateAsync();
    //   console.log('update ' + update)
    //   if (update.isAvailable) {
    //     Alert.alert(
    //       'PIECE 앱을 최신버전으로 업데이트해 주세요.',
    //       '[확인]버튼을 누르시면 설치 화면으로 이동 합니다.',
    //       [{
    //         text: '확인', onPress: () => {
    //           if (Platform.OS === 'ios') Linking.openURL(`itms-apps://itunes.apple.com/app/1615510313`);
    //           else Linking.openURL(`market://details?id=run.piece.dev`);
    //         }
    //       }],
    //       { cancelable: false },
    //     );
    //   }
    // } catch (e) {
    //   console.log('error : ' + e);
    //   //return navigation.navigate('NetworkError', { isConnected: false });
    // }

  let deviceId = await Storage.getItem('@deviceId') ?? '';
  if (!deviceId) {
    deviceId = uuid();
    await Storage.setItem('@deviceId', deviceId);
  }
  dispatch(setDeviceId(deviceId));

  let deviceToken = '';
  try {
    deviceToken = await registerForPushNotificationsAsync() ?? '';
  } catch (e) {
    console.log(e)
  }
  dispatch(setDeviceToken(deviceToken));
  const auth = await Storage.getItem('@auth');
  const isFido = await Storage.getItem('@isFido');
  dispatch(setIsFido(isFido === 'Y' ? 'Y' : 'N'));

  if (auth) {
    // 디바이스 아이디가 다른 경우 로그아웃 처리
    try {
      const memberData = await getMember();
      if (memberData.deviceId !== deviceId) {
        console.log('## device logout')

        await Storage.removeItem('@auth');
        await Storage.removeItem('@isFido');
        dispatch(setIsFido('N'));
        dispatch(initAuth());
        return navigation.reset({ routes: [{ name: 'Start', params: { isDeviceLogout: true } }] });
      } else {
        if (memberData.fcmToken !== deviceToken) {
          try {
            await updateMemberDevice({
              deviceId: deviceId,
              deviceOs: Platform.OS === "ios" ? "MDO0102" : "MDO0101",
              fcmToken: deviceToken ? deviceToken : null,
            })
          } catch (e) {
            console.log(e?.response?.data, '###updateMemberDevice###')
          }
        }
      }
    } catch (e) {
      if (e?.response?.status === 404) {
        console.log('## device logout', e?.response?.data);

        await Storage.removeItem('@auth');
        await Storage.removeItem('@isFido');
        dispatch(setIsFido('N'));
        dispatch(initAuth());
        return navigation.reset({ routes: [{ name: 'Start', params: { isDeviceLogout: true } }] });
      } else {
        return navigation.navigate('NetworkError', { isConnected: false });
      }
    }

    // 리프레시 실패시 로그아웃 처리
    try {
      const { data } = await refreshAuth();
      await Storage.setItem('@auth', JSON.stringify({
        memberId: JSON.parse(auth).memberId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
    } catch (e) {
      if (e?.response?.status === 400) {
        console.log('## token logout', e?.response?.data);
        await Storage.removeItem('@auth');
        await Storage.removeItem('@isFido');
        dispatch(setIsFido('N'));
        dispatch(initAuth());
        return navigation.reset({ routes: [{ name: 'Start', params: { isTokenLogout: true } }] });
      } else {
        return navigation.navigate('NetworkError', { isConnected: false });
      }
    }

  }

  if (auth) dispatch(setAuth(JSON.parse(auth!)));
  else dispatch(initAuth());
};

return (
  <RootNavigation initialRouteName={initialRouteName} />
);
}

function RootNavigation(props: any) {
  const {
    initialRouteName,
  } = props;

  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });



  return (
    <Root.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      {/* 제일 첫화면 */}
      <Root.Screen
        options={{ cardStyleInterpolator: forFade }}
        name="Start"
        component={Start}
      />

      {/*로그인*/}
      <Root.Screen
        options={{ cardStyleInterpolator: forFade }}
        name="login"
        component={Login}
      />

      {/* 버전 에러 */}
      <Root.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        name="VersionError"
        component={VersionError}
      />

      <Root.Screen
        options={{ gestureEnabled: Platform.OS === 'ios' }}
        name="StackNavigation"
        component={StackNavigation}
      />

      <Root.Screen name="Notice" component={AnnouncementDetail} />

      <Root.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="LoginRedirect"
        component={LoginRedirect}
      />

      <Root.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="NetworkError"
        component={NetworkError}
      />

      <Root.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="NotFound"
        component={NotFound}
      />

      {/* 푸시 링크 */}
      {/*<Root.Screen*/}
      {/*  options={{*/}
      {/*    cardStyle: { backgroundColor: "#ffffff" },*/}
      {/*    cardOverlayEnabled: true,*/}
      {/*    gestureEnabled: Platform.OS === 'ios',*/}
      {/*    gestureDirection: "horizontal",*/}
      {/*    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,*/}
      {/*  }}*/}
      {/*  name="Alarm"*/}
      {/*  component={Alarm}*/}
      {/*/>*/}

      <Root.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={"EventRoot"}
        component={EventInner}
      />

      {/*<Root.Screen*/}
      {/*  options={{*/}
      {/*    cardStyle: { backgroundColor: "#ffffff" },*/}
      {/*    cardOverlayEnabled: true,*/}
      {/*    gestureEnabled: Platform.OS === 'ios,*/}
      {/*    gestureDirection: "horizontal",*/}
      {/*    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,*/}
      {/*  }}*/}
      {/*  name="confirmEmail"*/}
      {/*  component={ConfirmEmail}*/}
      {/*/>*/}

      {/* 풀스크린 모달 */}
      <Root.Group
        screenOptions={{
          presentation: "transparentModal",
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Root.Screen
          name="AgreementDetail"
          component={AgreementDetail}
        />
        <Root.Screen
          name="VirtualBankAgreementDetail"
          component={VirtualBankAgreementDetail}
        />
      </Root.Group>

      {/* 반모달 그룹 */}
      <Root.Group
        screenOptions={{
          presentation: "transparentModal",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >

        {/* 통신사 선택 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            // ...TransitionPresets.ModalSlideFromBottomIOS,
            // cardStyleInterpolator:
            //   CardStyleInterpolators.forModalPresentationIOS,
          }}
          name="SelectCarrier"
          component={SelectCarrier}
        />

        {/* 인증번호 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CertificationNum"
          component={CertificationNum}
        />

        {/* 인증번호 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            gestureEnabled: false,
          }}
          name="CertificationRealName"
          component={CertificationRealName}
        />

        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name={"LoginFailModal"}
          component={LoginFailModal}
        />

        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name={"KakaoFailModal"}
          component={KakaoFailModal}
        />

        {/* 약관 동의 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="policyAgreement"
          component={PolicyAgreement}
        />

        {/* 가상계좌 약관 동의 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="VirtualBankPolicyAgreement"
          component={VirtualBankPolicyAgreement}
        />
        {/* 가상계좌 인증번호 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="VirtualBankCertification"
          component={VirtualBankCertification}
        />
        {/* 가상계좌 확인 모달 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="VirtualBankConfirmModal"
          component={VirtualBankConfirmModal}
        />

        {/* 홈 이벤트 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress }, next, inverted, layouts: { screen } }) => ({
              cardStyle: {
                transform: [{
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screen.height, 0],
                    extrapolate: 'clamp',
                  }),
                }],
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.6],
                  extrapolate: 'clamp',
                }),
              },
            }),
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 1200 } },
              close: { animation: 'timing', config: { duration: 300 } },
            }
          }}
          name="homeEvent"
          component={HomeEvent}
        />

        {/* 포트폴리오 구매 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="buyPortfolioModal"
          component={BuyPortfolioModal}
        />

        {/* 포트폴리오 단어 설명 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="portfolioInnerDesc"
          component={PortfolioInnerDesc}
        />

        {/* 포트폴리오 알림 신청 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="setAlarm"
          component={SetAlarm}
        />

        {/* 계좌 없음 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="noAccount"
          component={HaveNoAccount}
        />

        {/* 계좌 인증번호 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="bankAccountCheckCertificationNum"
          component={BankAccountCheckCertificationNum}
        />

        {/* 주소/이메일 없음 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="haveNoInfo"
          component={HaveNoInfo}
        />

        {/* 주소/이메일 있음 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="haveInfo"
          component={HaveInfo}
        />

        {/* 소유증서 신청 완료 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="requestDeed"
          component={RequestDeed}
        />

        {/* 소유증서 신청 실패 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="requestDeedFail"
          component={RequestDeedFail}
        />

        {/* 소유증서 보기 실패 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="OwnDeedFailModal"
          component={OwnDeedFailModal}
        />

        {/*/!* 이메일 등록 완료 *!/*/}
        {/*<Root.Screen*/}
        {/*  options={{*/}
        {/*    cardStyle: { backgroundColor: "transparent" },*/}
        {/*    cardOverlayEnabled: true,*/}
        {/*  }}*/}
        {/*  name="confirmEmailComplete"*/}
        {/*  component={ConfirmEmailComplete}*/}
        {/*/>*/}

        {/* 이메일 등록 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="UpdateEmailModal"
          component={UpdateEmailModal}
        />
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="ConfirmEmailModal"
          component={ConfirmEmailModal}
        />

        {/* 생체인증 재등록 필요 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="bioAuth"
          component={BioAuth}
        />

        {/* 구매 취소 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="cancelPurchase"
          component={CancelPurchase}
        />

        {/* 구매 취소 완료*/}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CancelPurchaseComplete"
          component={CancelPurchaseComplete}
        />

        {/* 구매 취소란 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="aboutCancelPurchase"
          component={AboutCancelPurchase}
        />

        {/* 증빙 자료 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="fullSizeImage"
          component={FullSizeImage}
        />

        {/* 예치금 필터 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="ownMoneyFilter"
          component={OwnMoneyFilter}
        />

        {/* 주소 검색 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="searchAddress"
          component={SearchAddress}
        />

        {/* 상세 주소 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="detailAddress"
          component={DetailAddress}
        />

        {/* 실명 인증 실패 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CertificationRealNameFailModal"
          component={CertificationRealNameFailModal}
        />

        {/* 실명 인증 성공 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CertificationRealNameCompleteModal"
          component={CertificationRealNameCompleteModal}
        />

        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CertificationFailModal"
          component={CertificationFailModal}
        />

        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CertificationFailModal2"
          component={CertificationFailModal2}
        />

        {/* 계좌 확인 실패 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="BankAccountCheckFailModal"
          component={BankAccountCheckFailModal}
        />

        {/* 주소 등록 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="confirmAddress"
          component={ConfirmModal}
        />

        {/* 비밀번호 변경 완료 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="pwChangeComplete"
          component={PwChangeComplete}
        />

        {/* 로그아웃 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="logout"
          component={Logout}
        />

        {/* 쿠폰 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CouponModal"
          component={CouponModal}
        />

        {/* 쿠폰 등록시 모달 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CommonModal"
          component={CommonModal}
        />

        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="CouponAlert"
          component={CouponAlert}
        />


        {/* 탈퇴 불가 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="unableToWithdraw"
          component={UnableToWithdraw}
        />

        {/* 탈퇴 재확인 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="withdrawalCheck"
          component={WithdrawalCheck}
        />
        {/* 로그아웃 모달 */}
        <Root.Screen
          options={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
          name="LogoutModal"
          component={LogoutModal}
        />


      </Root.Group>
    </Root.Navigator>
  );
}

function StackNavigation() {
  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const routes = useNavigationState(state => state.routes);


  return (
    <Stack.Navigator
      initialRouteName="tab"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
        cardOverlayEnabled: true,
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {/* 회원가입 */}
      <Stack.Screen name="auth" component={AuthNavigation} />
      {/* 메인 */}
      <Stack.Screen
        options={{ cardStyleInterpolator: forFade, gestureEnabled: Platform.OS === 'ios' }}
        name="tab"
        component={TabNavigation}
      />

      <Stack.Screen
        name="PieceWeb"
        component={PieceWeb}
      />

      {/* 하단 탭 내부 */}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Alarm"
        component={Alarm}
      />

      {/* 포트폴리오 상세 */}
      <Stack.Screen
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300 } },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: (props) => {
            const { current: { progress } } = props;
            // if (!routes[0].state?.routes?.[1]?.params?.shared) {
            //   return CardStyleInterpolators.forHorizontalIOS(props);
            // }
            return {
              cardStyle: { opacity: progress },
            };
          },
        }}
        name="Portfolio"
        component={PortfolioInner}
        sharedElements={(route, otherRoute) => {
          if (otherRoute.name !== 'homeScreen') return;

          const item = route.params.item;
          const portfolioId = item ? item.portfolioId : route.params.portfolioId;

          return [
            {
              id: `portfolio.${portfolioId}.image`,
              animation: "move",
            },
          ];
        }}
      />

      <Stack.Screen name="buy" component={PortfolioInnerStack} />

      {/* 매거진 게시물 */}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="magazinePost"
        component={Posts}
      />
      {/* 북마크 */}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="bookmark"
        component={Bookmark}
      />

      {/* 보유조각 */}
      <Stack.Screen
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300 } },
            close: { animation: "timing", config: { duration: 300 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: { opacity: progress },
            };
          },
        }}
        name="OwnPiece"
        component={OwnPiece}
        sharedElements={(route, otherRoute, showing) => {
          if (route.params.isCanceled) return;
          if (otherRoute.name !== 'walletScreen') return;

          const { item } = route.params;
          return [
            {
              id: `purchase.${item.purchaseId}.image`,
              animation: "move",
            },
          ];
        }}
      />

      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CancelPassword"
        component={CancelPassword}
      />

      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ownDeed"
        component={OwnDeed}
      />

      {/* 예치금 잔액 */}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="OwnMoneyStack"
        component={OwnMoneyNavigation}
      />

      {/* 계좌 등록 */}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="BankAccountRegisterStack"
        component={BankAccountRegisterStackNavigation}
      />
      {/* 실명 인증 */}
      <Stack.Screen
        name="CertificateRealName"
        component={CertificateRealName}
        options={{ gestureEnabled: false }}
      />
      {/* 마이페이지 */}
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="EventDetail" component={EventInner} />

      {/* 쿠폰함 추가 0513*/}
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
        name="Coupon" component={Coupon}
      />

      {/* 내지갑 트리맵 테스트 진행중 0621 */}
      {/* <Stack.Screen
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: false,
          gestureEnabled: Platform.OS === 'ios',
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
        name="TreeMap" component={TreeMap}
      /> */}



      {/*<Stack.Screen name="Event" component={EventStackNavigation} />*/}
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="Security" component={SecurityStackNavigation} />
      <Stack.Screen name="MyPageAlarm" component={MyPageAlarm} />
      <Stack.Screen name="Policy" component={PolicyStackNavigation} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="FAQ" component={Faq} />
    </Stack.Navigator>
  );
}

// 탭
function TabNavigation() {
  const queryClient = useQueryClient();

  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarIcon: ({ focused }: any) => {
          if (route.name === "home" && !focused) {
            return <HomeIcon />;
          } else if (route.name === "magazine" && !focused) {
            return <MagazineIcon />;
          } else if (route.name === "wallet" && !focused) {
            return <WalletIcon />;
          } else if (route.name === "mypage" && !focused) {
            return <MypageIcon />;
          } else if (route.name === "home" && focused) {
            return <HomeActiveIcon />;
          } else if (route.name === "magazine" && focused) {
            return <MagazineActiveIcon />;
          } else if (route.name === "wallet" && focused) {
            return <WalletActiveIcon />;
          } else if (route.name === "mypage" && focused) {
            return <MypageActiveIcon />;
          }
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
          backgroundColor: "#ffffff",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 0.02,
          shadowRadius: 3.5,
          elevation: 6,
        },
        gestureEnabled: Platform.OS === 'ios',
        detachInactiveScreens: false,
      })}
      initialRouteName="home"
    >
      <Tab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="home"
        component={AnimationHome}
        listeners={({ navigation }: any) => ({
          tabPress: async (e) => {
            Platform.OS === 'ios' && Haptics.selectionAsync();
            queryClient.invalidateQueries(['Portfolio']);
            queryClient.invalidateQueries(['NotificationStatus']);
            afHomeClick();
          },
        })}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="magazine"
        component={MagazineScreen}
        listeners={({ navigation }: any) => ({
          tabPress: (e) => {
            Platform.OS === 'ios' && Haptics.selectionAsync();
            queryClient.invalidateQueries(['Magazines']);
            afLoungeClick();

          }
        })}
      />
      <Tab.Screen
        listeners={({ navigation }: any) => ({
          tabPress: async (e) => {
            Platform.OS === 'ios' && Haptics.selectionAsync();
            e.preventDefault();
            const isLogin = await Storage.getItem('@isLogin');
            const isUser = await Storage.getItem('@auth');

            if (isLogin === 'false' || !isUser) {
              navigation.navigate('LoginRedirect', { isUser });
            } else {
              // bskr_jhm 0530 쿠폰 사용 후 내지갑 이동시에 소유조각 나오게 처리하기 위한 주석

              // navigation.reset({index:0,routes:[{name:'wallet'}]});
              // let history = navigation.getState().history;
              // if (e.target !== history[history.length - 1].key) {
              //   queryClient.invalidateQueries(['Deposit']);
              //   queryClient.invalidateQueries(['Account']);
              //   queryClient.invalidateQueries(['Purchases', 'PUS0102']);
              // }
              navigation.navigate('wallet');
              queryClient.invalidateQueries(['Deposit']);
              queryClient.invalidateQueries(['Account']);
              queryClient.invalidateQueries(['Purchases', 'PUS0102']);
            }
            afWalletClick();
          },
        })}
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="wallet"
        component={AnimationWallet}
      />
      <Tab.Screen
        listeners={({ navigation }: any) => ({
          tabPress: async (event) => {
            Platform.OS === 'ios' && Haptics.selectionAsync();
            event.preventDefault();
            const isLogin = await Storage.getItem('@isLogin');
            const isUser = await Storage.getItem('@auth');
            if (isLogin === 'false' || !isUser) {
              navigation.navigate('LoginRedirect', { isUser });
            } else {
              navigation.navigate("mypage");
            }
            afMoreClick();
          },
        })}
        options={{ headerShown: false, tabBarShowLabel: false }}
        name="mypage"
        component={MypageScreen}
      />
    </Tab.Navigator>
  );
}

const AnimationWallet = () => {
  return (
    <AnimationWalletStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AnimationWalletStack.Screen
        name="walletScreen"
        component={WalletScreen}
      />
    </AnimationWalletStack.Navigator>
  );
};

const AnimationHome = () => {
  return (
    <AnimationHomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AnimationHomeStack.Screen name="homeScreen" component={HomeScreen} />
    </AnimationHomeStack.Navigator>
  );
};

// Auth stack
function AuthNavigation() {
  return (
    <AuthStack.Navigator
      initialRouteName="certification"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <AuthStack.Screen name="certification" component={Certification} />
      <AuthStack.Screen name="CertificationComplete" component={CertificationComplete} />
      <AuthStack.Screen name="accountAlready" component={AccountAlready} />
      <AuthStack.Screen name="RegisterFail" component={RegisterFail} />
      <AuthStack.Screen name="password" component={PasswordScreen} />
      <AuthStack.Screen name="passwordCheck" component={PasswordScreen} />
      <AuthStack.Screen name="SignUpComplete" component={SignUpComplete} />
    </AuthStack.Navigator>
  );
}

// PortfolioInner stack
function PortfolioInnerStack() {
  return (
    <PortfolioStack.Navigator
      initialRouteName="buyPortfolio"
      screenOptions={{ headerShown: false }}
    >
      <PortfolioStack.Screen name={"buyPortfolio"} component={BuyPortfolio} />
      <PortfolioStack.Screen name={"password"} component={Password} />
      <PortfolioStack.Screen
        name={"result"}
        component={Result}
        options={{ gestureEnabled: false }}
      />
      <PortfolioStack.Screen name={"failedResult"} component={FailedResult} />
    </PortfolioStack.Navigator>
  );
}

// OwnMoney stack
function OwnMoneyNavigation() {
  return (
    <OwnMoneyStack.Navigator
      initialRouteName="OwnMoney"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <OwnMoneyStack.Screen name="OwnMoney" component={OwnMoney} />
      <OwnMoneyStack.Screen name="SendToMyAccount" component={MoneyMoves} />
      <OwnMoneyStack.Screen name="DepositRecharge" component={MoneyMoves} />
      <OwnMoneyStack.Screen
        name="MoneyMovesCheck"
        component={MoneyMovesCheck}
      />
      <OwnMoneyStack.Screen
        options={{ gestureEnabled: false }}
        name="MoneyMovesResult"
        component={MoneyMovesResult}
      />
      <OwnMoneyStack.Screen
        name="VirtualBankCreate"
        component={VirtualBankCreate}
      />
      <OwnMoneyStack.Screen
        options={{ gestureEnabled: false }}
        name="VirtualBankCreateComplete"
        component={VirtualBankCreateComplete}
      />
    </OwnMoneyStack.Navigator>
  );
}

// BankAccountRegister stack
function BankAccountRegisterStackNavigation({ route }: any) {
  return (
    <BankAccountRegisterStack.Navigator
      initialRouteName="SelectBankAccount"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <BankAccountRegisterStack.Screen
        name="SelectBankAccount"
        children={({ navigation }) => (
          <SelectBankAccount
            isCreate={route.params.isCreate}
            navigation={navigation}
          />
        )}
      />
      <BankAccountRegisterStack.Screen
        name="RegisterBankAccount"
        component={RegisterBankAccount}
      />
      <BankAccountRegisterStack.Screen
        name="BankAccountComplete"
        component={BankAccountComplete}
      />
      <BankAccountRegisterStack.Screen
        options={{ gestureEnabled: false }}
        name="registerComplete"
        component={RegisterComplete}
      />
    </BankAccountRegisterStack.Navigator>
  );
}

// // Event stack
// function EventStackNavigation() {
//   return (
//     <EventStack.Navigator
//       screenOptions={{
//         headerShown: false,
//         cardStyle: { backgroundColor: "#ffffff" },
//         gestureEnabled: Platform.OS === 'ios,
//         gestureDirection: "horizontal",
//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//       }}
//       initialRouteName="eventPage"
//     >
//       <EventStack.Screen name={"eventPage"} component={Event} />
//       <EventStack.Screen name={"eventInner"} component={EventInner} />
//     </EventStack.Navigator>
//   );
// }

// Security Stack
function SecurityStackNavigation() {
  return (
    <SecurityStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="securityPage"
    >
      <SecurityStack.Screen name={"securityPage"} component={Security} />
      <SecurityStack.Screen name={"changePw"} component={ChangePw} />
      <SecurityStack.Screen name={"newPw"} component={ChangePw} />
      <SecurityStack.Screen name={"newPwCheck"} component={ChangePw} />
      <SecurityStack.Screen name={"withdrawal"} component={Withdrawal} />
      <SecurityStack.Screen name={"withdrawal2"} component={Withdrawal2} />
      <SecurityStack.Screen
        name={"withdrawalComplete"}
        component={WithdrawalComplete}
      />
    </SecurityStack.Navigator>
  );
}

// Policy Stack
function PolicyStackNavigation() {
  return (
    <PolicyStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
        gestureEnabled: Platform.OS === 'ios',
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="policyPage"
    >
      <PolicyStack.Screen name={"policyPage"} component={Policy} />
      <PolicyStack.Screen name={"policyInner"} component={PolicyInner} />
    </PolicyStack.Navigator>
  );
}

/** AppsFlyer 홈 탭 터치 횟수 start **/
async function afHomeClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerHomeClick = '';

  if (memberId === '' || memberId === null) {
    appsFleyerHomeClick = 'af_home_click_browsing';
    const appsFleyerHomeValues = {
      af_device_id: deviceId
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerHomeClick,
        appsFleyerHomeValues
      )
      console.log("AppsFlyer af_home_click_browsing Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_home_click_browsing Error  : " + error);
    }
  }
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerHomeClick = 'af_home_click_login';
    const appsFleyerHomeValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerHomeClick,
        appsFleyerHomeValues
      )
      console.log("AppsFlyer af_home_click_login Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_home_click_login Error  : " + error);
    }
  }
}




/** AppsFlyer 라운지 탭 터치 횟수 start **/
async function afLoungeClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let deviceType = Platform.OS.toString()
  let memberId = await Storage.getItem('@auth');
  let appsFleyerLoungeClick = '';

  if (memberId === '' || memberId === null) {
    appsFleyerLoungeClick = 'af_lounge_click_browsing';
    const appsFleyerLoungeValues = {
      af_device_id: deviceId,
      af_device_type: deviceType,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerLoungeClick,
        appsFleyerLoungeValues
      )
      console.log("AppsFlyer af_lounge_click_browsing Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_lounge_click_browsing Error  : " + error);
    }
  }
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerLoungeClick = 'af_lounge_click_login';
    const appsFleyerLoungeValues = {
      af_device_id: deviceId,
      af_device_type: deviceType,
      af_member_id: memberId,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerLoungeClick,
        appsFleyerLoungeValues
      )
      console.log("AppsFlyer af_lounge_click_login Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_lounge_click_login Error  : " + error);
    }
  }
}
/** AppsFlyer 라운지 탭 터치 횟수 end **/


/** AppsFlyer 내지갑 탭 터치 횟수 start **/
async function afWalletClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerWalletClick = '';

  if (memberId === '' || memberId === null) {
    appsFleyerWalletClick = 'af_wallet_click_browsing';
    const appsFleyerWalletValues = {
      af_device_id: deviceId
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerWalletClick,
        appsFleyerWalletValues
      )
      console.log("AppsFlyer af_wallet_click_browsing Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_wallet_click_browsing Error  : " + error);
    }
  }
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerWalletClick = 'af_wallet_click_login';
    const appsFleyerWalletValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerWalletClick,
        appsFleyerWalletValues
      )
      console.log("AppsFlyer af_wallet_click_login Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_wallet_click_login Error  : " + error);
    }
  }
}
/** AppsFlyer 내지갑 탭 터치 횟수 end **/


/** AppsFlyer 더보기 탭 터치 횟수 start **/
async function afMoreClick() {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerMoreClick = '';

  if (memberId === '' || memberId === null) {
    appsFleyerMoreClick = 'af_more_click_browsing';
    const appsFleyerMoreValues = {
      af_device_id: deviceId
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerMoreClick,
        appsFleyerMoreValues
      )
      console.log("AppsFlyer af_more_click_browsing Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_more_click_browsing Error  : " + error);
    }
  }
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerMoreClick = 'af_more_click_login';
    const appsFleyerMoreValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerMoreClick,
        appsFleyerMoreValues
      )
      console.log("AppsFlyer af_more_click_login Result : " + result);
    } catch (error) {
      console.log("AppsFlyer af_more_click_login Error  : " + error);
    }
  }
}
/** AppsFlyer 더보기 탭 터치 횟수 end **/
