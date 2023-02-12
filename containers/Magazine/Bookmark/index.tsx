import React, { useCallback, useEffect, useState } from 'react'

import { Box, Flex, Pressable, ScrollView, Text } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';

import { MagazinesTypes } from 'interfaces/magazine.type';
import { Image } from 'react-native';
import { getMagazineBookmarkList } from 'apis/Magazine';
import useMemberBookmark from 'hooks/useMemberBookmark';
import { useQuery } from 'react-query';
import * as Haptics from 'expo-haptics';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

const Bookmark = ({ navigation }: any) => {
  const {
    useGetBookmarkQuery,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
  } = useMemberBookmark();
  const { data: bookmarkIds } = useGetBookmarkQuery({
    onError: (err: any) => {
      navigation.navigate('NetworkError', { queryKey: ['MemberBookmark'] })
    },
  });
  const { mutate: createBookmark } = useCreateBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const { data: magazineData } = useQuery(
    ['Magazines', 'bookmark'],
    getMagazineBookmarkList,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Magazines', 'bookmark'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  );

  const getBookmarked = useCallback((magazineId) => {
    return bookmarkIds?.some((id: string) => id === magazineId);
  }, [bookmarkIds])

 


  /** AppsFlyer 라운지 > 상단 북마크 > 북마크 리스트에서 개별 아이템 북마크 클릭시 start **/
  async function afBookMarkClick(category: string, magazineId: string, title: string) {
    let deviceId = await Storage.getItem('@deviceId');
    let memberId = await Storage.getItem('@auth');
    let appsFleyerLoungeBookMarkClick = '';

    // memberId가 있으면 회원가입 또는 로그인 한 상태
    appsFleyerLoungeBookMarkClick = 'af_lounge_bookmark_login_' + category + '_' + title;
    const appsFleyerLoungeDetailValues = {
      af_device_id: deviceId,
      af_member_id: memberId,
      af_bookmark_id: magazineId,
      af_title: title,
    }
    try {
      var result = await appsFlyer.logEvent(
        appsFleyerLoungeBookMarkClick,
        appsFleyerLoungeDetailValues
      )
      console.log("AppsFlyer af_lounge_bookmark_login_ Result : " + result + category + '_' + title);
    } catch (error) {
      console.log("AppsFlyer af_lounge_bookmark_login_ Error  : " + error);
    }

  }
  /** AppsFlyer 라운지 > 상단 북마크 > 북마크 리스트에서 개별 아이템 북마크 클릭시 end **/

  const handleBookmark = (magazineId: string , magazineSmallTitle: string , magazineTitle: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!getBookmarked(magazineId)) {
      createBookmark(magazineId);
       //afBookMarkClick(magazineSmallTitle,magazineId,magazineTitle);
    } else {
      deleteBookmark(magazineId);
    }
  };

  return (
    <Layout>
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <GoBack navigation={navigation} title={'북마크'} />
        {magazineData?.map((data: MagazinesTypes, index: number) => {
          return (
            <Box key={index} px={'16px'}>
              <Box
                pt={index === 0 ? '0' : '20px'}
                pb={'20px'}
                borderBottomWidth={index < magazineData.length - 1 ? '1px' : 0}
                borderBottomColor={'gray.300'}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate('magazinePost', {
                      magazineId: data.magazineId,
                    })
                  }
                >
                  <Flex direction={'row'}>
                    <Box flex={1} mr={'15px'}>
                      <Text size={'titleL'}>{data.title}</Text>
                      <Text size={'titleM'} mb={'5px'}>
                        {data.midTitle}
                      </Text>
                      <Text size={'textS'}>{data.smallTitle}</Text>
                    </Box>
                    <Box w={'108px'} h={'108px'} position={'relative'}>
                      <Image
                        style={{ width: 108, height: 108, borderRadius: 10 }}
                        source={{ uri: data.representThumbnailPath }}
                      />
                      <Pressable
                        onPress={() => handleBookmark(data.magazineId , data.smallTitle , data.title)}
                        position={'absolute'}
                        bottom={'5px'}
                        right={'5px'}
                      >
                        <Image
                          source={
                            getBookmarked(data.magazineId)
                              ? require('assets/images/bookmark_active.png')
                              : require('assets/images/bookmark_gray.png')
                          }
                          style={{ width: 40, height: 40 }}
                        />
                      </Pressable>
                    </Box>
                  </Flex>
                </Pressable>
              </Box>
            </Box>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

export default Bookmark;
