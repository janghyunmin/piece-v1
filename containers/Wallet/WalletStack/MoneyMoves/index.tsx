import React, { useCallback, useMemo, useState, useEffect } from 'react';

import { Box, Flex } from 'native-base'

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import MoneyMoveTitle from './_fragments/MoneyMoveTitle';
import Status from './_fragments/Status';
import Remittable from './_fragments/Remittable';
import Account from './_fragments/Account';
import FooterBtn from './_fragments/FooterBtn';
import { useQuery } from 'react-query';
import { getDepositBalance } from 'apis/Deposit';
import { getMemberAccount } from 'apis/Member'
import ShortCutAdd from 'containers/Wallet/WalletStack/MoneyMoves/_fragments/ShortCutAdd';
import NumberPad from 'components/NumberPad';
import * as Haptics from 'expo-haptics';


const MoneyMoves = ({ navigation, route }: any) => {
  const { type } = route.params;
  const [status, setStatus] = useState<number>(0);
  const {
    data: depositData,
  } = useQuery(
    ['Deposit'],
    getDepositBalance,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Deposit'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  );


  const {
    data: accountData,
  } = useQuery(
    ['Account'],
    getMemberAccount,
    {
      onError: (err: any) => {
        if (err?.response?.status === 404) return;
        navigation.navigate('NetworkError', { queryKey: ['Account'] });
      },
      cacheTime: 0,
    }
  )

  const disabled = useMemo(() => {
    return !status;
  }, [status]);

  const handleAllAmount = () => {
    setStatus(depositData.depositBalance);
  }

  const add = useCallback((data: number) => {
    setStatus((cur: number) => {
      const s = cur + data * 10000;
      if (s > 99999999999) {
        Haptics.notificationAsync();
        return 99999999999;
      } else {
        return s;
      }
    });
  }, []);

  const reset = useCallback(() => {
    setStatus(0);
  }, []);

  const setNumber = useCallback((data: number) => {
    setStatus((cur: number) => {
      const s = Number(String(cur) + String(data));
      if (s > 99999999999) {
        Haptics.notificationAsync();
        return 99999999999;
      } else {
        return s;
      }
    });
  }, []);

  const deleteNumber = useCallback(() => {
    setStatus((cur) => {
      const curStr = String(cur);
      if (curStr.length > 0) return Number(curStr.substr(0, curStr.length - 1));
      return 0;
    });
  }, []);


  return (
    <Layout>
      <GoBack
        navigation={navigation}
        title={type === 'send' ? '출금 신청하기' : '예치금 충전하기'}
      />
      <Flex flex={1}>
        <Box px={'16px'} py={'8px'} flex={1} justifyContent={'space-between'}>
          <MoneyMoveTitle pageType={type === 'send'} />

          <Box>
            <Status status={status} type={type} />
            {type === 'send' ? (
              <Remittable pageType={type === 'send'} depositData={depositData} handleAllAmount={handleAllAmount} />
            ) : (
              <Box h={'24px'} />
            )}
          </Box>
          {type === 'send' ? (
            <Account accountData={accountData} pageType={type === 'send'} />
          ) : (
            <ShortCutAdd add={add} />
          )}
        </Box>
        <Box>

          <NumberPad
            setNumber={setNumber}
            deleteNumber={deleteNumber}
            reset={reset}
          />

          <FooterBtn
            navigation={navigation}
            pageType={type === 'send'}
            disabled={disabled}
            status={status}
            from={route.params?.from}
            accountData={accountData}
            depositData={depositData}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default MoneyMoves;
