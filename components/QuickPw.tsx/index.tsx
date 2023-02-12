import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

import { Flex } from "native-base";
import { Alert } from "react-native";

// import NumberPad from "./_fragments/NumberPad";
import NumberPad from "components/NumberPad";
import PasswordHeader from "./_fragments/PasswordHeader";
import BioAuth from "./_fragments/BioAuth";
import Layout from "components/Layout";

import { PasswordBox } from "interfaces/auth.type";
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'


const QuickPw = ({ navigation, route }: any) => {
  const { item } = route.params;

  const [randomPw1, setRandomPw1] = useState<number[]>([1, 2, 3]);
  const [randomPw2, setRandomPw2] = useState<number[]>([4, 5, 6]);
  const [randomPw3, setRandomPw3] = useState<number[]>([7, 8, 9]);
  const [randomPw4, setRandomPw4] = useState<(number | string)[]>([
    "초기화",
    0,
    "back",
  ]);
  // 패스워드
  const [passwordBox, setPasswordBox] = useState<PasswordBox[]>([
    { password: "", active: false },
    { password: "", active: false },
    { password: "", active: false },
    { password: "", active: false },
    { password: "", active: false },
    { password: "", active: false },
  ]);
  const [tempPw] = useState([
    { password: "0", active: true },
    { password: "0", active: true },
    { password: "0", active: true },
    { password: "0", active: true },
    { password: "0", active: true },
    { password: "0", active: true },
  ]);
  // 현재 패스워드 위치
  const [passwordIndex, setPasswordIndex] = useState<number>(0);
  // 패스워드 같은지
  const [passwordIncorrect, setPasswordIncorrect] = useState<string>("");

  // 번호 믹스
  const mixNumber = () => {};
  // 생체인증
  const bioAuth = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error("등록된 생체 인증 정보가 없습니다.");
      }

      // Authenticate user
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "피스 생체인증",
      });
      // promptMessage : '생체인증 모달 타이틀'
      Alert.alert("Authenticated", "Welcome back !");
    } catch (error: any) {
      Alert.alert("생체 인증을 사용할 수 없습니다.", error.message);
    }
  };



   /** AppsFlyer 간편비밀번호 등록 start **/
   async function afPwd() {
    let deviceId = await Storage.getItem('@deviceId');
    const appsFlyerPwd = 'af_pwd';
    const appsFlyerPwdValues = {
      af_device_id: deviceId,
    }

    try {
      var result = await appsFlyer.logEvent(
        appsFlyerPwd,
        appsFlyerPwdValues
      )
      console.log("AppsFlyer af_pwd Result : " + result + ' deviceId : ' + deviceId);
    } catch (error) {
      console.log("AppsFlyer af_pwd Error  : " + error);
    }
  }
  /** AppsFlyer 간편비밀번호 등록 end **/


  // 간편 비밀번호와 비밀번호 확인이 같은지 확인 후 회원가입 완료 모달로
  useEffect(() => {
    if (passwordIndex === 6) {
      if (JSON.stringify(passwordBox) === JSON.stringify(tempPw)) {
        navigation.navigate("result", { item: item });
        afPwd()
      } else {
        setPasswordIncorrect("간편 비밀번호가 달라요");
        reset();
      }
    }
  }, [passwordIndex]);

  // 비밀번호 다시 입력하면 간편 비밀번호가 달라요 에러 사라지게
  useEffect(() => {
    for (let i in passwordBox) {
      if (passwordBox[i].active) {
        setPasswordIncorrect("");
      }
    }
  }, [passwordBox]);

  useEffect(() => {
    bioAuth();
    mixNumber();
  }, []);




  // 패스워드 입력
  const pressPassword = (pw: number) => {
    if (passwordIndex >= 6) return;
    const tempPwBox = [...passwordBox];
    tempPwBox[passwordIndex].password = JSON.stringify(pw);
    tempPwBox[passwordIndex].active = true;
    setPasswordBox(tempPwBox);
    if (passwordIndex < 6) {
      setPasswordIndex((prev) => prev + 1);
    }
  };

  // 패스워드 지우기
  const deletePassword = () => {
    if (passwordIndex === 0) return;
    const tempPwBox = [...passwordBox];
    tempPwBox[passwordIndex - 1].password = "";
    tempPwBox[passwordIndex - 1].active = false;
    setPasswordBox(tempPwBox);
    if (passwordIndex > 0) {
      setPasswordIndex((prev) => prev - 1);
    }
  };

  // 패스워드 초기화
  const reset = () => {
    const tempPwBox = [...passwordBox];
    for (let i in tempPwBox) {
      tempPwBox[i].password = "";
      tempPwBox[i].active = false;
    }
    setPasswordBox(tempPwBox);
    setPasswordIndex(0);
  };

  return (
    <Layout>
      <Flex flex={1} justifyContent="space-between">
        <PasswordHeader
          navigation={navigation}
          passwordIncorrect={passwordIncorrect}
          passwordBox={passwordBox}
        />

        <BioAuth bioAuth={bioAuth} />

        <NumberPad
          setNumber={pressPassword}
          deleteNumber={deletePassword}
          reset={reset}
          isRandom
        />
      </Flex>
    </Layout>
  );
};

export default QuickPw;
