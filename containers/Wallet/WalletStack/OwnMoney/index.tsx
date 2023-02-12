import React, { useEffect, useState } from 'react';

import { Box, ScrollView } from 'native-base';

import GoBack from 'components/GoBack';
import Layout from 'components/Layout';
import OwnMoneyHeaderText from './_fragments/OwnMoneyHeaderText';
import OwnMoneyHeaderBtn from './_fragments/OwnMoneyHeaderBtn';
import Filter from './_fragments/Filter';

import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { getDepositBalance, getDepositHistory } from 'apis/Deposit';
import History from 'containers/Wallet/WalletStack/OwnMoney/_fragments/History'


const OwnMoney = ({ navigation, route }: any) => {
  const categoryList = [
    {title: '전체', historyType: ''},
    {title: '조각 거래 내역', historyType: 'MDR02'},
    {title: '예치금 입출금 내역', historyType: 'MDR01'},
  ];

  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<{ title: string; historyType: string; }>({title: '전체', historyType: ''});

  const { data: depositData } = useQuery(
    ['Deposit'],
    getDepositBalance,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Deposit'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const {
    data: depositHistoryData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['DepositHistory', selectedCategory.historyType],
    async ({ pageParam: offset = 0 }) => {
      const limit = 20;
      const data = await getDepositHistory({
        history_type: selectedCategory.historyType,
        limit,
        offset,
      });
      return {
        ...data,
        limit,
        offset,
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count > lastPage.offset+lastPage.limit) return lastPage.offset+lastPage.limit;
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['DepositHistory', selectedCategory.historyType] });
      },
      keepPreviousData: false,
      refetchOnMount: true,
      cacheTime: 0,
    }
  )

  useEffect(() => {
    if (route.params) setSelectedCategory(route.params.select);
  }, [route.params]);

  return (
    <Layout>
      <GoBack navigation={navigation} onBack={() => {
        navigation.goBack();
        queryClient.invalidateQueries(['Deposit']);
        queryClient.invalidateQueries(['Account']);
        queryClient.invalidateQueries(['Purchases', 'PUS0102']);
      }} title={'나의 예치금'} />
      <ScrollView
        onScrollEndDrag={() => hasNextPage && fetchNextPage()}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >

        <Box px={'16px'} mt={'20px'}>
          <OwnMoneyHeaderText data={depositData} />

          <OwnMoneyHeaderBtn navigation={navigation} data={depositData} />

          <Filter
            navigation={navigation}
            categoryList={categoryList}
            selectedCategory={selectedCategory}
          />
        </Box>

        <History data={depositHistoryData?.pages.flatMap((page) => page.data) ?? []} />
      </ScrollView>
    </Layout>
  );
};

export default OwnMoney;
