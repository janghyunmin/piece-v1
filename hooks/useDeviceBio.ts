import { useEffect, useState } from 'react'
import {
  getEnrolledLevelAsync,
  supportedAuthenticationTypesAsync,
  isEnrolledAsync,
  hasHardwareAsync,
} from 'expo-local-authentication'
import { Platform } from 'react-native'


export default function () {
  // 0 : 생체인증 없음 
  // 1 : 지문
  // 2 : face id
  // 3 : 홍채
  const [deviceBio, setDeviceBio] = useState<0 | 1 | 2 | 3>(0);

  const init = async () => {

    // 장치에 등록된 인증 종류는 반환함.
    // SecurityLevel 
    // 0 : 등록된 인증이 없음
    // 1 : 비 생체 인증 ( ex:PIN , 패턴 )
    // 2 : 생채인증
    const securityLevel = await getEnrolledLevelAsync(); 
    // console.log('securityLevel' + securityLevel);

    // 장치에 등록된 생체 정보가 있는지 없는지
    // return true / false
    const isEnrolled = await isEnrolledAsync();
    // console.log('isEnrolled' + isEnrolled);
   

     // if (securityLevel === 2) {
      // 해당 장치에 어떤 종류의 인증을 사용 할 수 있는지를 판별
      // 1 : 지문
      // 2 : Face ID
      // 3 : 홍채 - Android 전용
      const bioKinds = await supportedAuthenticationTypesAsync();

      // console.log('bioKinds : ' + bioKinds?.[0] ?? 0)
      // console.log('aos : ' + bioKinds)

      if (Platform.OS === 'ios') {
        setDeviceBio(bioKinds?.[0] ?? 0);
      }
      else if (Platform.OS === 'android') {
        if (bioKinds[0] === 1) { setDeviceBio(bioKinds?.[0] ?? 0); }
        if (bioKinds[1] === 2) { setDeviceBio(bioKinds?.[1] ?? 0); }
      }
      else setDeviceBio(0);
      // }
  }

  useEffect(() => {
    init()
  }, []);
  return deviceBio;
}