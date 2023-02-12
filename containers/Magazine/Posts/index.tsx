import React, { useCallback, useEffect, useState } from 'react';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import { getMagazineDetail } from 'apis/Magazine';
import useMemberBookmark from 'hooks/useMemberBookmark';
import { useQuery } from 'react-query';
import { Box, Center, Flex, ScrollView, Spinner, Text, ZStack } from 'native-base'
import { formatDate } from 'utils/formatDate'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import usePageLoaded from 'hooks/usePageLoaded'
import { WEBVIEW_URL } from 'apis/config';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

const statusBarHeight = getStatusBarHeight();
const bottomHeight = getBottomSpace();
const deviceHeight = Dimensions.get('window').height;


const Posts = ({ navigation, route }: any) => {
  const { magazineId } = route.params;
  const pageLoaded = usePageLoaded();

  const { useGetBookmarkQuery } = useMemberBookmark();
  const { data: bookmarkIds } = useGetBookmarkQuery({
    onError: (err: any) => {
      navigation.navigate('NetworkError', { queryKey: ['MemberBookmark'] })
    },
  });

  const { data: magazineData } = useQuery(
    ['Magazines', magazineId],
    async () =>

      getMagazineDetail(magazineId),
    {
      onError: (err: any) => {
        if (err?.response?.status === 404) navigation.navigate('NotFound');
        else
          navigation.navigate('NetworkError', { queryKey: ['Magazines', magazineId] });
      },
      cacheTime: 0,
    },
  );

  const getBookmarked = useCallback((magazineId) => {
    return bookmarkIds?.some((id: string) => id === magazineId);
  }, [bookmarkIds]);



  /** AppsFlyer 해당 라운지 클릭 수 start **/
  async function afLoungeDetailClick(category: string, magazineId: string, title: string) {
    let deviceId = await Storage.getItem('@deviceId');
    let memberId = await Storage.getItem('@auth');
    let appsFleyerLoungeDetailClick = '';

    if (memberId === '' || memberId === null) {
      appsFleyerLoungeDetailClick = 'af_lounge_click_browsing_' + category + '_' + title;
      const appsFleyerLoungeDetailValues = {
        af_device_id: deviceId,
        af_magazine_id: magazineId,
        af_magazine_type: category,
        af_title: title,
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerLoungeDetailClick,
          appsFleyerLoungeDetailValues
        )
        console.log("AppsFlyer af_lounge_click_browsing_ Result : " + result + category + '_' + title);
      } catch (error) {
        console.log("AppsFlyer af_lounge_click_browsing_ Error  : " + error);
      }
    }
    // memberId가 있으면 회원가입 또는 로그인 한 상태
    else {
      appsFleyerLoungeDetailClick = 'af_lounge_click_login_' + category + '_' + title;
      const appsFleyerLoungeDetailValues = {
        af_device_id: deviceId,
        af_member_id: memberId,
        af_magazine_id: magazineId,
        af_magazine_type: category,
        af_title: title,
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerLoungeDetailClick,
          appsFleyerLoungeDetailValues
        )
        console.log("AppsFlyer af_lounge_click_login_ Result : " + result + category + '_' + title);
      } catch (error) {
        console.log("AppsFlyer af_lounge_click_login_ Error  : " + error);
      }
    }
  }
  /** AppsFlyer 해당 라운지 클릭 수 end **/
  if (!pageLoaded) {
    console.log('라운지 웹뷰 실행 전');
  } else {
    console.log('라운지 웹뷰 실행 후');
    afLoungeDetailClick(magazineData?.smallTitle, magazineId, magazineData?.title);
  }


 






  return (
    <Layout bottomTab>
      <GoBack
        navigation={navigation}
        bookmark={{
          bookmarked: getBookmarked(magazineId),
          magazineId: magazineId,
        }}
      />
      <ScrollView
        flex={1}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <Box px={"16px"}>
          <Text size={"titleL"} mb={'5px'}>{magazineData?.title}</Text>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"20px"}
            borderBottomColor={"gray.300"}
            borderBottomWidth={"1px"}
          >
            <Text size={"textS"}>
              {magazineData?.smallTitle}
              {magazineData?.createdAt && ` | ${formatDate(magazineData?.createdAt)}`}
            </Text>
          </Flex>
        </Box>

        <Flex flex={1} mb={bottomHeight}>
          <Flex
            position={'absolute'}
            m={'auto'}
            top={0}
            left={0}
            right={0}
            py={(deviceHeight - statusBarHeight - 180) / 2}
          >
            <Spinner
              size={'lg'}
              color={'primary.500'}
            />
          </Flex>
          {pageLoaded && magazineData?.magazineId && (
            <Flex
              flex={1}
              minH={deviceHeight - statusBarHeight - 180}
            >
              <AutoHeightWebView
                scrollEnabled={false}
                source={{
                  uri: `${WEBVIEW_URL}/magazine/${magazineData?.magazineId}/detail`,
                }}
              />
            </Flex>
          )}
        </Flex>
      </ScrollView>
    </Layout>
  );
};

export default Posts;
