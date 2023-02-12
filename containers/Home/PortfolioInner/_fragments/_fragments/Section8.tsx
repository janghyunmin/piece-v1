import React from "react";

import { Box, Button, Flex, Text } from "native-base";
import { PortfolioInnerSection8Props } from "interfaces/home.type";
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'

const Section8 = ({ navigation, item }: PortfolioInnerSection8Props) => {
     /** AppsFlyer 포트폴리오 자세히 보기 start **/
     async function afPortfolioDetail() {
      let deviceId = await Storage.getItem('@deviceId');
      let memberId = await Storage.getItem('@auth');
      let appsFleyerPortfolioDetailClick = '';
      let portfolioId = item.portfolioId;

      if(memberId === '' || memberId === null) {
        appsFleyerPortfolioDetailClick = 'af_portfolio_detail_browsing';
        const appsFleyerPortfolioValues = {
          af_device_id: deviceId,
          af_portfolio_id: portfolioId,
        }
        try {
          var result = await appsFlyer.logEvent(
            appsFleyerPortfolioDetailClick,
            appsFleyerPortfolioValues
          )
          console.log("AppsFlyer af_portfolio_detail_browsing Result : " + result);
        } catch (error) {
          console.log("AppsFlyer af_portfolio_detail_browsing Error  : " + error);
        }
      } 
      // memberId가 있으면 회원가입 또는 로그인 한 상태
      else {
        appsFleyerPortfolioDetailClick = 'af_portfolio_detail_login';
        const appsFleyerPortfolioValues = {
          af_device_id: deviceId,
          af_member_id: memberId,
          af_portfolio_id: portfolioId,
        }
        try {
          var result = await appsFlyer.logEvent(
            appsFleyerPortfolioDetailClick,
            appsFleyerPortfolioValues
          )
          console.log("AppsFlyer af_portfolio_detail_login Result : " + result);
        } catch (error) {
          console.log("AppsFlyer af_portfolio_detail_login Error  : " + error);
        }
      }
     }
    /** AppsFlyer 포트폴리오 자세히보기 end **/



  return (
    <Box px={"16px"}>
      <Box pb={"20px"}>
        {item.magazineId && (
          <Button
            colorScheme="primary"
            variant="outline"
            borderColor={"primary.500"}
            borderWidth={"1px"}
            h={"48px"}
            borderRadius={"10px"}
            onPress={() => {
              afPortfolioDetail();
              navigation.navigate("magazinePost", {
                magazineId: item.magazineId,
              });
            }}
          >
            <Flex direction={"row"}>
              <Text size={"titleS"} color={"primary.500"} mr={"10px"}>
                포트폴리오 자세히 보기
              </Text>
            </Flex>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Section8;
