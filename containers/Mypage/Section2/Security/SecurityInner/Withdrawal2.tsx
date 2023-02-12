import React, { useState } from 'react'

import { Box, ScrollView } from 'native-base'

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Withdrawal2Top from './_fragment/Withdrawal2Top';
import Withdrawal2Check from './_fragment/Withdrawal2Check';
import Withdrawal2Bottom from './_fragment/Withdrawal2Bottom';
import { useQuery } from 'react-query'
import { getDepositBalance } from 'apis/Deposit'
import { getPurchases } from 'apis/Purchase'

const Withdrawal2 = ({ navigation, route }: any) => {
  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [isPurchases, setIsPurchases] = useState<boolean>(true);

  useQuery(
    ['Deposit'],
    getDepositBalance,
    {
      onSuccess: (res) => {
        setIsDeposit(!!res.depositBalance)
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Deposit'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  )

  useQuery(
    ['Purchases', 'PUS0102'],
    () => getPurchases({
      purchase_state: 'PUS0102',
    }),
    {
      onSuccess: (res) => {
        setIsPurchases(!!res.length);
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Purchases', 'PUS0102'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  )

  return (
    <Layout>
      <ScrollView mb={'30px'} pb={'50px'}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <GoBack navigation={navigation} />

        <Box bgColor={'gray.200'}>
          <Withdrawal2Top />

          <Withdrawal2Check navigation={navigation} />
        </Box>
      </ScrollView>

      <Withdrawal2Bottom
        navigation={navigation}
        params={route.params}
        allowedWithdrawal={!isDeposit && !isPurchases}
      />
    </Layout>
  );
};

export default Withdrawal2;
