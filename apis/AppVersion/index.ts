import instance from 'apis/config'
import Storage from "@react-native-async-storage/async-storage";

// 기기별 앱 버전 조회 [header : memberId 추가 bskr_jhm 0620]
export const getAppVersion = async (deviceType: 'MDO0101'|'MDO0102') => {
  let auth = await Storage.getItem('@auth');
  const headers = {
    memberId : JSON.parse(auth!)?.memberId
  }
  const { data } = await instance.get(`/appversion/${deviceType}`,{headers});
  console.log('-----------------------------------------------------')
  console.log('/appversion/{device_type} get call..');
  console.log('-----------------------------------------------------')
  return data;
};
