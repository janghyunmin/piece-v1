import React, { useState } from 'react';

import { Platform, Share } from 'react-native'
import { Box, Flex, Pressable, Text } from 'native-base';

import GoBackIcon from 'components/Icons/GoBackIcon';
import BackWhiteIcon from 'components/Icons/BackWhiteIcon';
import MagazinePostBookmarkIcon from 'components/Icons/MagazinePostBookmarkIcon';
import MagazinePostBookmarkActiveIcon from 'components/Icons/MagazinePostBookmarkActiveIcon';
import ShareIosIcon from 'components/Icons/ShareIosIcon';
import ShareIcon from 'components/Icons/ShareIcon';
import ShareBlackIcon from 'components/Icons/ShareBlackIcon';
import ShareBlackIosIcon from 'components/Icons/ShareIosBlackIcon';

import { GoBackProps } from 'interfaces/components.type';
import useMemberBookmark from 'hooks/useMemberBookmark';
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage';


// 해당 파일은 뒤로가기 back image + 공유하기 기능이 있는 파일이다. ( 포트폴리오 상세 페이지  )
const GoBack = (props: GoBackProps) => {
  const {
    onBack,
    navigation,
    title,
    white,
    bookmark,
    preventBack = false,
    shared,
    portfolioTitle,
    shareUrl
  } = props;


    /** AppsFlyer 포트폴리오 공유 start **/
    async function afPortfolioShare() {
      let deviceId = await Storage.getItem('@deviceId');
      let memberId = await Storage.getItem('@auth');
      let appsFleyerPortfolioDetailClick = '';
      let portfoliotitle = portfolioTitle;

      if(memberId === '' || memberId === null) {
        appsFleyerPortfolioDetailClick = 'af_portfolio_share_browsing_' + portfoliotitle;
        const appsFleyerPortfolioValues = {
          af_device_id: deviceId,
          af_portfolioTitle: portfoliotitle,
        }
        try {
          var result = await appsFlyer.logEvent(
            appsFleyerPortfolioDetailClick,
            appsFleyerPortfolioValues
          )
          console.log("AppsFlyer af_portfolio_share_browsing Result : " + result);
        } catch (error) {
          console.log("AppsFlyer af_portfolio_share_browsing Error  : " + error);
        }
      } 
      // memberId가 있으면 회원가입 또는 로그인 한 상태
      else {
        appsFleyerPortfolioDetailClick = 'af_portfolio_share_login_' + portfolioTitle;
        const appsFleyerPortfolioValues = {
          af_device_id: deviceId,
          af_member_id: memberId,
          af_portfolioTitle: portfolioTitle,
        }
        try {
          var result = await appsFlyer.logEvent(
            appsFleyerPortfolioDetailClick,
            appsFleyerPortfolioValues
          )
          console.log("AppsFlyer af_portfolio_share_login Result : " + result);
        } catch (error) {
          console.log("AppsFlyer af_portfolio_share_login Error  : " + error);
        }
      }
     }
    /** AppsFlyer 포트폴리오 자세히보기 end **/


  const onShare = async () => {
    console.log('넘겨받은 shareUrl : ' + shareUrl)
    // 포트폴리오 공유하기 로직 
    try {
      /*********************************/
      // 포트폴리오 공유하기 로직 변경으로 인한 주석처리 bskr_jhm 0513


      /*  const result = await Share.share({
          message: portfolioTitle + '\n' +decodeURIComponent(shared!),               // a message to share
          url:shared!,     // a URL to share (iOS)
          title: portfolioTitle,                // title of the message (Android)
        },{
          dialogTitle: portfolioTitle, // android only
        });
        if (result.action === Share.sharedAction) {  
          if (result.activityType) {
            console.log('result activityType = ' + result.activityType);
          } else {
            // 포트폴리오 공유 성공
            console.log('Share!!!!');
            console.log('portfolioTitle 변환 ' + decodeURIComponent(shared!));
          }
        } 
        // 공유하기 창 닫힘
        else if (result.action === Share.dismissedAction) {
          console.log('dismissed');
        }
      */
      /*********************************/


      // 기존 공유 url 방식
      // message: portfolioTitle + '\n' + shared!,      // a message to share
      // url:shared!,                                   // a URL to share (iOS)
      // title: portfolioTitle,   

      if (Platform.OS === "android") {
        Share.share({
          message: portfolioTitle + '\n' + shareUrl!,      // a message to share
          url: shareUrl!,                                   // a URL to share (iOS)
          title: portfolioTitle,                         // title of the message (Android)
        },
          {
            dialogTitle: portfolioTitle,    // 안드로이드만 호환 가능 ( text )
          }
        )
          .then((result) => {
            console.log('result.action = ' + result.action)
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                console.log('activityType: ' + result.activityType)
              } else {
                console.log('android : ' + result + ' portfolio title : ' + portfolioTitle + ' shared : ' + shareUrl!)
                onSuccess();
              }
            }
            else if (result.action === Share.dismissedAction) {
              // 공유하기를 눌렀다가 취소했을때
              console.log('android share cancle');
            }

          })
          .catch((errorMsg) => console.log(errorMsg));
        return;
      } else if (Platform.OS === "ios") {
        Share.share({
          message: portfolioTitle + '\n' + shareUrl!,   // a message to share
          url: portfolioTitle + '\n' + shareUrl!,     // a URL to share (iOS)
          title: portfolioTitle,                     // title of the message (Android)
        })
        .then((result) => {
          console.log('result.action = ' + result.action)
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('activityType: ' + result.activityType)
            } else {
              console.log('ios : ' + result + ' portfolio title : ' + portfolioTitle + ' shared : ' + shareUrl!)
              onSuccess();
            }
          }
          else if (result.action === Share.dismissedAction) {
            console.log('ios share cancle');
          }

        })
          .catch((errorMsg) => console.log(errorMsg));
        return;
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  };

  const {
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
  } = useMemberBookmark();
  const { mutate: createBookmark } = useCreateBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const handleBookmark = (magazineId: string, bookmarked: boolean) => {
    if (!bookmarked) createBookmark(magazineId);
    else deleteBookmark(magazineId);
  };


  async function onSuccess() {
    // 공유하기 후 appsFlyer 데이터 전송
    afPortfolioShare();
  }



  return (
    <Flex
      zIndex={'999'}
      direction={'row'}
      h={'80px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      px={'16px'}
    >
      {/* 뒤로가기 버튼 */}
      <Pressable
        zIndex={99}
        onPress={() => {
          if (!preventBack) {
            if (onBack) onBack()
            else navigation.goBack()
          }
        }}
        w={'40px'}
        h={'80px'}
        justifyContent={'center'}
      >
        {white ? (
          <BackWhiteIcon />
        ) : (
          <GoBackIcon />
        )}
      </Pressable>

      {/* 타이틀 */}
      <Text size={'textM'}>{title}</Text>

      {/* 우측 아이콘 */}
      {shared && (white ? (
        <Pressable
          w={'40px'}
          h={'80px'}
          alignItems={'flex-end'}
          justifyContent={'center'}
          onPress={() => {
            // android share
            onShare()
            }
          }
        >
          {Platform.OS === 'ios' ? <ShareIosIcon /> : <ShareIcon />}
        </Pressable>
      ) : (
        <Pressable
          w={'40px'}
          h={'80px'}
          alignItems={'flex-end'}
          justifyContent={'center'}
          onPress={() => {
            // ios share
            onShare()
            }
          }
        >
          {Platform.OS === 'ios' ? <ShareBlackIosIcon /> : <ShareBlackIcon />}
        </Pressable>
      ))}

      {bookmark && (
        <Pressable
          w={'40px'}
          h={'80px'}
          alignItems={'flex-end'}
          justifyContent={'center'}
          onPress={() => handleBookmark(bookmark.magazineId, bookmark.bookmarked)}
        >
          {bookmark.bookmarked ? <MagazinePostBookmarkActiveIcon /> : <MagazinePostBookmarkIcon />}
        </Pressable>
      )}

      {!shared && !bookmark && (
        <Box w={'40px'} h={'80px'} />
      )}
    </Flex>
  );
};


export default GoBack;
