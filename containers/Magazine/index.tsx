import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Box, Center, ScrollView, Spinner } from 'native-base';
import { Platform } from 'react-native';
import Layout from "components/Layout";
import Header from "./_fragments/Header";
import Category from "./_fragments/Category";
import Magazines from "./_fragments/Magazines";

import useMemberBookmark from "hooks/useMemberBookmark";
import useMagazinesInfiniteQuery from "hooks/useMagazinesInfiniteQuery";
import { useScrollToTop } from "@react-navigation/native";
import { Dimensions, RefreshControl } from 'react-native';
import { wait } from "utils/wait";
import { useRootState } from 'hooks/useRootState';
import * as Haptics from 'expo-haptics';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

const category = [
  {
    title: "전체",
    magazineType: "",
  },
  {
    title: "포트폴리오",
    magazineType: "MZT0201",
  },
  {
    title: "핀테크 트렌드",
    magazineType: "MZT0101",
  },
  {
    title: "핫 플레이스",
    magazineType: "MZT0102",
  },
  {
    title: "쿨 피플",
    magazineType: "MZT0103",
  },
  {
    title: "잘알못 칼럼",
    magazineType: "MZT0104",
  },
];

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const statusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();

export const Magazine = ({ navigation, route }: any) => {

  const ref: any = useRef();
  useScrollToTop(ref);
  const categoryRef1: any = useRef();
  const categoryRef2: any = useRef();
  const { isUser } = useRootState((state) => state.auth);
  const [selectCategoryType, setSelectCategoryType] = useState<string>("");

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(600).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, []);

  const {
    useGetBookmarkQuery,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
  } = useMemberBookmark();
  const { data: bookmarkIds, isLoading: isBookmarkIdsLoading } = useGetBookmarkQuery({
    onError: (err: any) => {
      navigation.navigate('NetworkError', { queryKey: ['MemberBookmark'] })
    },
  });

  const { mutate: createBookmark } = useCreateBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const {
    data: magazineData,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading: isMagazineLoading,
  } = useMagazinesInfiniteQuery(selectCategoryType, {
    onError: (err: any) => {
      navigation.navigate('NetworkError', { queryKey: ['Magazines', selectCategoryType] });
    }
  });

  const getBookmarked = useCallback(
    (magazineId) => {
      return bookmarkIds?.some((id: string) => id === magazineId);
    },
    [bookmarkIds],
  );

  const handleBookmark = (magazineId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isUser) return navigation.navigate('LoginRedirect', { isUser });
    if (!getBookmarked(magazineId)) createBookmark(magazineId);
    else deleteBookmark(magazineId);
  };

  useEffect(() => {
    const magazineType = route.params?.magazineType;
    setSelectCategoryType(magazineType ? magazineType : "");
  }, [navigation]);




   /** AppsFlyer 라운지 탭 > 각각 탭 클릭시 로직 start **/
   async function afRootTabClick(type: string) {
    let deviceId = await Storage.getItem('@deviceId');
    let memberId = await Storage.getItem('@auth');
    let deviceType = Platform.OS.toString()
    let division = type;
    let appsFleyerRootTabClick = '';

    if(memberId === '' || memberId === null) {
      appsFleyerRootTabClick = division + '_browsing';
      const appsFleyerPortfolioTabValues = {
        af_device_id: deviceId,
        af_device_type: deviceType,
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerRootTabClick,
          appsFleyerPortfolioTabValues
        )
        console.log("AppsFlyer " + appsFleyerRootTabClick + " Result : " + result);
      } catch (error) {
        console.log("AppsFlyer " + appsFleyerRootTabClick + " Result : " + error);
      }
    } 
    // memberId가 있으면 회원가입 또는 로그인 한 상태
    else {
      appsFleyerRootTabClick = division + '_login';
      const appsFleyerPortfolioValues = {
        af_device_id: deviceId,
        af_member_id: memberId,
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerRootTabClick,
          appsFleyerPortfolioValues
        )
        console.log("AppsFlyer " + appsFleyerRootTabClick + " Result : " + result);
      } catch (error) {
        console.log("AppsFlyer " + appsFleyerRootTabClick + " Result : " + error);
      }
    }
   }
  /** AppsFlyer 라운지 탭 > 각각 탭 클릭시 로직 end **/

  const handleSelectCategory = (category: string) => {
    setSelectCategoryType(category);
    if (ref.current) {
      console.log('아이템 탭 클릭' + category);
      setTimeout(() => ref.current.scrollTo({y: (width*1.4)-statusBarHeight+1}), 100);
      if(category === 'MZT0201') {
        console.log('포트폴리오 탭');
        afRootTabClick('af_lounge_portfolio_click')
      } 
      else if(category === 'MZT0101') {
        console.log('핀테크 트렌드 탭');
        afRootTabClick('af_lounge_fintechTrend_click')
      } 
      else if(category === 'MZT0102') {
        console.log('핫플레이스 탭');
        afRootTabClick('af_lounge_hotPlace_click')
      } 
      else if(category === 'MZT0103') {
        console.log('쿨 피플 탭')
        afRootTabClick('af_lounge_cool_click')
      } 
      else if(category === 'MZT0104') {
        console.log('잘알못 칼럼 탭')
        afRootTabClick('af_lounge_jalalmot_click')
      }
    }
  }

  const [isSticky, setIsSticky] = useState<boolean>(false);


  return (
    <Layout noStatusBar={true} bottomTab={true}>
      <Box
        pt={`${statusBarHeight}px`}
        bgColor={'#ffffff'}
        zIndex={9999}
        display={isSticky ? 'flex' : 'none'}
      >
        <Category
          currentRef={categoryRef1}
          differentRef={categoryRef2}
          category={category}
          handleSelectCategory={handleSelectCategory}
          selectCategoryType={selectCategoryType}
        />
      </Box>
      <ScrollView
        mt={isSticky ? `${-statusBarHeight-64}px` : 0}
        ref={ref}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={50}
          />
        }
        scrollEventThrottle={16}
        onScroll={(event) => {
          if (event.nativeEvent.contentOffset.y > width*1.4-statusBarHeight) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        }}
        onMomentumScrollEnd={() => hasNextPage && fetchNextPage()}
      >
        <Header
          navigation={navigation}
          bookmarkCount={bookmarkIds?.length ?? 0}
          isUser={isUser}
        />

        <Category
          currentRef={categoryRef2}
          differentRef={categoryRef1}
          category={category}
          handleSelectCategory={handleSelectCategory}
          selectCategoryType={selectCategoryType}
        />
        <Box minH={`${height-statusBarHeight-bottomSpace-128}px`}>
          {isMagazineLoading || isBookmarkIdsLoading ? (
            <Center flex={1}>
              <Spinner size={'lg'} color={'primary.500'} />
            </Center>
          ) : (
            <Magazines
              navigation={navigation}
              magazines={magazineData?.pages.flatMap((page) => page.data)}
              bookmarkIds={bookmarkIds}
              handleBookmark={handleBookmark}
            />
          )}
        </Box>
      </ScrollView>
    </Layout>
  );
};
