import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Animated, NativeSyntheticEvent, StatusBar } from 'react-native';

import Layout from "components/Layout";

import Header from "./_fragments/Header";
import Top from "./_fragments/Top";
import FooterFixed from "./_fragments/FooterFixed";
import InnerContent from "./_fragments/InnerContent";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getPortfolioDetail } from 'apis/Portfolio'
import useForegroundEffect from 'hooks/useForegroundEffect'
import { getMemberNotification, getPortfolioAlarm, updatePortfolioAlarm } from 'apis/Member';
import { useRootState } from 'hooks/useRootState';
import { useDispatch } from 'react-redux';
import { setRecruitmentAmount } from 'features/portfolioSlice';
import usePortfolioWebsocket from 'hooks/usePortfolioWebsocket';
import usePageLoaded from 'hooks/usePageLoaded';
import Title from 'containers/Mypage/ConfirmEmail/_fragments/Title';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

/** AppsFlyer 해당 포트폴리오 리스트 아이템 클릭 수 start **/
async function afPortfolioClick(portfolioId:String , title:String) {
  let deviceId = await Storage.getItem('@deviceId');
  let memberId = await Storage.getItem('@auth');
  let appsFleyerPortfolioClick = '';

  console.log('deviceid : ' + deviceId + ' memberId : ' + memberId);

  if(memberId === '' || memberId === null) {
    appsFleyerPortfolioClick = 'af_portfolio_main_browsing_' + title;
    const appsFleyerPortfolioValues = {
      af_device_id: deviceId,
      af_portfolio_id: portfolioId,
      af_title: title,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerPortfolioClick,
        appsFleyerPortfolioValues
      )
      console.log("AppsFlyer af_portfolio_main_browsing_ Result : " + result + title);
    } catch (error) {
      console.log("AppsFlyer af_portfolio_main_browsing_ Error  : " + error);
    }
  } 
  // memberId가 있으면 회원가입 또는 로그인 한 상태
  else {
    appsFleyerPortfolioClick = 'af_portfolio_main_login_' + title;
    const appsFleyerPortfolioValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
      af_portfolio_id: portfolioId,
      af_title: title,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerPortfolioClick,
        appsFleyerPortfolioValues
      )
      console.log("AppsFlyer af_portfolio_main_login_ Result : " + result + title);
    } catch (error) {
      console.log("AppsFlyer af_portfolio_main_login_ Error  : " + error);
    }
  }
}
/** AppsFlyer 해당 포트폴리오 리스트 아이템 클릭 수 end **/


const PortfolioInner = ({ navigation, route }: any) => {
  const item = route.params.item;
  const { isUser } = useRootState((state) => state.auth);
  const portfolioId = item ? item.portfolioId : route.params.portfolioId;
  const queryClient = useQueryClient();
  const scrollY = useRef(new Animated.Value(0)).current;



  const [headerAnimated, setHeaderAnimated] = useState<boolean>(false);
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const pageLoaded = usePageLoaded();

  // 포트폴리오 제목 
  const [portfolioTitle,setPortfolioTitle] = useState('');

  // shareUrl
  const [shareUrl, setShareUrl] = useState('');


  const { refetch: statusBarRefetch } = useRootState((state) => state.statusBar);
  useEffect(() => {
    if (!headerAnimated) StatusBar.setBarStyle('light-content');
    else StatusBar.setBarStyle('dark-content');
    return () => StatusBar.setBarStyle('dark-content');
  }, [headerAnimated, statusBarRefetch]);

  const {
    data: portfolioData,
    refetch,
  } = useQuery(
    ['Portfolio', portfolioId],
    () => getPortfolioDetail(portfolioId),
    {
      onSuccess: (res) => {
        setPortfolioTitle(res.title); // 포트폴리오 제목
        setShareUrl(res.shareUrl); // shareUrl
        afPortfolioClick(portfolioId,res.title); // 포트폴리오 개별 클릭 수 AppsFlyer data 전송
        
        if (res.recruitmentState === 'PRS0101') {
          const now = +new Date();
          const openDate = +new Date(res.recruitmentBeginDate+'+09:00');
          if (openDate > now) {
            setIsTimer(true);
            setTimer(parseInt(String((openDate - now) / 1000)));
          }
         
        }
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Portfolio', portfolioId] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  useForegroundEffect(() => refetch());

  // 웹소켓
  usePortfolioWebsocket(portfolioData);

  const {
    data: portfolioAlarmData,
  } = useQuery(
    ['PortfolioAlarm', portfolioId],
    () => getPortfolioAlarm(portfolioId),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['PortfolioAlarm', portfolioId] });
      },
      enabled: isUser,
      refetchOnMount: true,
      cacheTime: 0,
    },
  );

  const { data: alarmData } = useQuery(
    ['Notifications'],
    getMemberNotification,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Notifications'] });
      },
      enabled: isUser,
      refetchOnMount: true,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (isTimer) {
      const clearTimer = setInterval(() => {
        setTimer((cur) => {
          if (cur > 0) {
            return cur - 1;
          } else {
            setIsTimer(false);
            return 0;
          }
        });
      }, 1000)
      return () => clearInterval(clearTimer);
    }
  }, [isTimer]);

  const { mutate: updateAlarm, isLoading: updateAlarmIsLoading } = useMutation(
    () => updatePortfolioAlarm(portfolioId),
    {
      onSuccess: (res) => {
        console.log('res : ' + JSON.stringify(res));
        queryClient.setQueryData(['PortfolioAlarm', portfolioId], (cur: any) => ({isAlarm: !cur.isAlarm}));
      },
      onError: (err: any) => {
        console.log(err?.response?.data);
      },
    }
  );

  return (
    <Layout noStatusBar={!headerAnimated}>
      <Animated.ScrollView
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (e: NativeSyntheticEvent<any>) => {
              if (e.nativeEvent.contentOffset.y > 305) {
                setHeaderAnimated(true);
              } else {
                setHeaderAnimated(false);
              }
            },
          }
        )}
        scrollEventThrottle={16}
      >
        {/* 공유하기 기능을 위해 portfolioTitle 부분 추가 bskr_jhm 0513 */}
        <Header
          navigation={navigation}
          scrollY={scrollY}
          headerAnimated={headerAnimated}
          portfolioId={portfolioId}
          portfolioTitle={portfolioTitle}
          shareUrl={shareUrl}
        />
        <Top
          navigation={navigation}
          item={item}
          portfolioId={portfolioId}
          imagePath={portfolioData?.representThumbnailImagePath}
          scrollY={scrollY}
        />

        {/* 포트폴리오 상세 판매 현황 Detail */}
        {pageLoaded && portfolioData && (
          <InnerContent
            item={portfolioData}
            headerAnimated={headerAnimated}
            navigation={navigation}
          />
        )}
      </Animated.ScrollView>

      {/* 포트폴리오 상세페이지 하단 종모양 아이콘 + n 오픈예정 */}
      {pageLoaded && portfolioData && (
        <FooterFixed
          queryClient={queryClient}
          portfolioId={portfolioId}
          item={portfolioData}
          navigation={navigation}
          isAlarm={portfolioAlarmData?.isAlarm}
          portfolioNotification={alarmData?.portfolioNotification}
          timer={timer}
          updateAlarm={updateAlarm}
          updateAlarmIsLoading={updateAlarmIsLoading}
        />
      )}
    </Layout>
  );
};

export default PortfolioInner;
