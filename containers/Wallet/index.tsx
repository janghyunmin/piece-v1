import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Box, ScrollView ,Text} from 'native-base';

import Layout from 'components/Layout';
import Header from './_fragments/Header';
import Balance from './_fragments/Balance';
import OwnPiece from './_fragments/OwnPiece';
import AccountInfo from './_fragments/AccountInfo';

import { useQuery } from 'react-query';
import { getDepositBalance } from 'apis/Deposit';
import { getMemberAccount } from 'apis/Member';
import { getPurchases } from 'apis/Purchase';
import { useScrollToTop } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { wait } from 'utils/wait';
import PageLoading from 'components/PageLoading'




export const Wallet = ({ navigation, route }: any) => {

  const ref: any = useRef();
  useScrollToTop(ref);


  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(600).then(() => {
      refetchDeposit();
      refetchAccount();
      refetchPurchases();
      setRefreshing(false);
    });
  }, []);


  // 내지갑 나의 예치금 잔액 불러오는 부분
  const {
    data: depositData,
    refetch: refetchDeposit,
  } = useQuery(
    ['Deposit'],
    getDepositBalance,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Deposit'] });
      },
      cacheTime: 0,
    }
  );

  // 내지갑 등록된 계좌 불러오는 부분
  const {
    data: accountData,
    refetch: refetchAccount,
  } = useQuery(
    ['Account'],
    getMemberAccount,
    {
      onSuccess: (data) => {
        
        if (data.isIdNo === 'MIC0102') {
          navigation.navigate('CertificationRealName', { amount: data?.dividendsAmount ?? 0, isInit: true });
        }
      },
      onError: (err: any) => {
        console.log('404 에러입니다');
        if (err?.response?.status === 404){
          return;
        } 
        navigation.navigate('NetworkError', { queryKey: ['Account'] });
      },
      cacheTime: 0,
    }
  )

  // 내지갑 소유조각 불러오는 부분
  const {
    data: purchasesData,
    refetch: refetchPurchases,
  } = useQuery(
    ['Purchases', 'PUS0102'],
    () => getPurchases({ purchase_state: 'PUS0102' }),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Purchases', 'PUS0102'] });
      },
      cacheTime: 0,
    }
  );

  return (
    <Layout bottomTab={true}>
      {!depositData || !purchasesData ? (
        <PageLoading />
      ) : (
        <ScrollView
          ref={ref}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollIndicatorInsets={{ top: 1, bottom: 1 }}
          contentInsetAdjustmentBehavior={'always'}
        >
          <Box px={'16px'}>
            <Header />

            {/* 나의 예치금 잔액 */}
            <Balance
              depositData={depositData}
              navigation={navigation}
            />

            {/* 등록된 계좌 */}
            <AccountInfo
              accountData={accountData}
              navigation={navigation}
            />
          </Box>

          {/* 내지갑 트리맵 테스트 진행중 0621 */}
          {/* <Box ml={'40px'}>
            <Text
              size={'textS'}
              color={'gray.700'}
              mb={'5px'}
              onPress={() => navigation.navigate('TreeMap')}
            >
              트리맵
            </Text>
          </Box> */}

          {/* 소유 조각 */}
          <OwnPiece
            purchasesData={purchasesData}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </Layout>
  );
};
