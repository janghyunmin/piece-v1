import React, { useEffect, useState } from 'react';

import { Box, ScrollView } from 'native-base';

import Layout from "components/Layout";
import NoAlert from "./_fragments/NoAlert";
import Title from "./_fragments/Title";

import { getNotificationList, updateNotificationStatus } from 'apis/Notification'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import PageLoading from 'components/PageLoading'
import Storage from '@react-native-async-storage/async-storage'
import Modal from 'containers/Home/Alarm/_fragments/Modal'
import Contents from 'containers/Home/Alarm/_fragments/Contents'
import * as Notifications from 'expo-notifications'

export type CategoryType = {
  title: string;
  notificationType: string;
  parent?: string;
}

const Alarm = ({ navigation, route }: any) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (notificationType: string) => updateNotificationStatus(notificationType),
    {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries(['NotificationStatus']);
        Notifications.setBadgeCountAsync(res.count ?? 0);
      }
    }
  );

  const categoryList: CategoryType[] = [
    {title: '알림', notificationType: 'NTT01', parent: 'NTT01'},
    {title: '혜택', notificationType: 'NTT02', parent: 'NTT02'},
  ];
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    route.params.category === 'NTT01' ? categoryList[0] : categoryList[1]
  );

  const {
    data: notificationList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['Notifications', selectedCategory.notificationType],
    async ({ pageParam: offset = 0 }) => {
      const limit = 20;
      const data = await getNotificationList({
        notification_type: selectedCategory.notificationType,
        limit,
        offset,
      });
      return { ...data, limit, offset }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count > lastPage.offset+lastPage.limit) return lastPage.offset+lastPage.limit;
      },
      onSuccess: (res) => {
        if (res.pages[0].offset === 0) {
          mutation.mutate(selectedCategory.notificationType)
        }
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Notifications', selectedCategory.notificationType] });
      },
      keepPreviousData: false,
      refetchOnMount: true,
      cacheTime: 0,
    },
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    Notifications.getPermissionsAsync()
      .then(({ status }) => {
        if (status !== 'granted') {
          Storage.getItem('@alarmDate')
            .then((alarmDate) => {
              if (!alarmDate || Number(alarmDate) < +new Date()) setShowModal(true);
            });
        }
      });
  }, []);

  const handleAfter30Day = () => {
    Storage.setItem('@alarmDate', String(+new Date()+30*24*60*60*1000))
      .then((_) => setShowModal(false));
  };

  return (
    <Layout>
      <Box px={"16px"} h={"100%"} position={'relative'}>
        <Title
          navigation={navigation}
          categoryList={categoryList.filter((category) => category.parent === category.notificationType)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/*<Category*/}
        {/*  categoryList={categoryList.filter((category) => category.parent === selectedCategory.parent)}*/}
        {/*  selectedCategory={selectedCategory}*/}
        {/*  setSelectedCategory={setSelectedCategory}*/}
        {/*/>*/}
        
        {isLoading ? (
          <PageLoading />
        ) : (
          <>
            {notificationList?.pages.flatMap((page) => page.data).length ? (
              <ScrollView
                onMomentumScrollEnd={() => hasNextPage && fetchNextPage()}
                scrollIndicatorInsets={{ top: 1, bottom: 1 }}
                contentInsetAdjustmentBehavior={'always'}
              >
                <Contents
                  navigation={navigation}
                  notificationList={notificationList.pages.flatMap((page) => page.data)}
                />
              </ScrollView>
            ) : (
              <NoAlert
                parent={selectedCategory.parent}
              />
            )}
          </>
        )}
      </Box>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        // handleAlarm={handleAlarm}
        handleAfter30Day={handleAfter30Day}
      />
    </Layout>
  );
};

export default Alarm;
