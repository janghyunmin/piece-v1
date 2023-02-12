import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteMemberBookmark, getMemberBookmark, postMemberBookmark } from 'apis/Member'
import * as Haptics from 'expo-haptics';


import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'


export default function () {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['MemberBookmark'];

  // 북마크 리스트 아이디값을 조회하는 로직
  const useGetBookmarkQuery = (options: any) => {
    return useQuery(
      QUERY_KEY,
      async () => {
        const data = await getMemberBookmark();
        return data.map((d: {magazineId: string;}) => d.magazineId);
      },
      {
        cacheTime: 0,
        ...options,
      },
    );
  }

   

  /** 라운지 북마크 클릭 정의
   * 1. 홈 > 포트폴리오 > 포트폴리오 자세히 보기 > 해당 아이템 상세 페이지 북마크 클릭 
   * 2. 매거진 > 리스트 개별 북마크 클릭
   * 3. 매거진 > 리스트 개별 클릭 > 해당 아이템 상세 페이지 상단 북마크 클릭
   * 4. 매거진 > 상단 북마크 이미지 클릭 > 리스트 개별 북마크 클릭
   */


  /** AppsFlyer 라운지 > 전체 리스트에서 개별 아이템 북마크 클릭시 start **/
  async function afBookmarkMain(magazineId: string) {
    let deviceId = await Storage.getItem('@deviceId');
    let memberId = await Storage.getItem('@auth');
    let appsFleyerBookMarkClick = '';
    if (memberId === '' || memberId === null) {
      appsFleyerBookMarkClick = 'af_lounge_bookmark_browsing_' + magazineId;
      const appsFleyerLoungeBookMarkValues = {
        af_device_id: deviceId
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerBookMarkClick,
          appsFleyerLoungeBookMarkValues
        )
        console.log("AppsFlyer af_lounge_bookmark_browsing_ Result : " + result + magazineId);
      } catch (error) {
        console.log("AppsFlyer af_lounge_bookmark_browsing_ Error  : " + error);
      }
    } 
    // memberId가 있으면 회원가입 또는 로그인 한 상태
    else {
      appsFleyerBookMarkClick = 'af_lounge_bookmark_login_' + magazineId;
      const appsFleyerLoungeBookMarkValues = {
        af_device_id: deviceId,
        af_member_id: memberId,
        af_bookmark_id: magazineId,
      }
      try {
        var result = await appsFlyer.logEvent(
          appsFleyerBookMarkClick,
          appsFleyerLoungeBookMarkValues
        )
        console.log("AppsFlyer af_lounge_bookmark_login_ Result : " + result + magazineId);
      } catch (error) {
        console.log("AppsFlyer af_lounge_bookmark_login_ Error  : " + error);
      }
    }
  

  }
  /** AppsFlyer 라운지 > 전체 리스트에서 개별 아이템 북마크 클릭시 end **/

   // 라운지 > 개별 북마크 저장 처리 로직 담당
  const useCreateBookmarkMutation = () => {
    return useMutation(
      (id: string) => postMemberBookmark(id),
      {
        onSuccess: (res, id) => {
          console.log('res : ' + JSON.stringify(res));
          addBookmark(id);
          afBookmarkMain(id); //appsFlyer 라운지 리스트에서 개별 북마크 클릭
        },
        onError: (err) => console.log('북마크 생성 에러'),
      },
    )
  };

   // 라운지 > 개별 북마크 저장 삭제 처리 로직 담당
  const useDeleteBookmarkMutation = () => {
    return useMutation(
      (id: string) => deleteMemberBookmark(id),
      {
        onSuccess: (res, id) => {
          removeBookmark(id);
        },
        onError: (err) => console.log('북마크 삭제 에러'),
      },
    )
  };

  const addBookmark = (magazineId: string) => {
    queryClient.setQueryData(QUERY_KEY, (cur: any) => cur.concat(magazineId));
  }

  const removeBookmark = (magazineId: string) => {
    queryClient.setQueryData(QUERY_KEY, (cur: any) => cur.filter((id: string) => id !== magazineId));
  }

  return { useGetBookmarkQuery, useCreateBookmarkMutation, useDeleteBookmarkMutation };
}
