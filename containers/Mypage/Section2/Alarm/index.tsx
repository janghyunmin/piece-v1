import React, { useCallback, useEffect, useState } from 'react'

import { Box } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Section from './_fragments/Section';
import SectionItem from './_fragments/SectionItem';

import {
  getMemberNotification,
  updateMemberNotification,
} from 'apis/Member';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as Notifications from 'expo-notifications'
import Storage from '@react-native-async-storage/async-storage'
import Modal from 'containers/Home/Alarm/_fragments/Modal'
import * as Haptics from 'expo-haptics';

const Alarm = ({ navigation }: any) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ['Notifications'],
    getMemberNotification,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Notifications'] });
      },
      cacheTime: 0,
    },
  )
  const mutation = useMutation(
    (body: {name: string, value: 'Y'|'N'}) => updateMemberNotification({[body.name]: body.value}),
    {
      onSuccess: (res, data) => {
        queryClient.setQueryData(['Notifications'], (cur: any) => ({
          ...cur,
          [data.name]: data.value,
        }));
      },
    }
  )

  const handleToggle = useCallback((name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    mutation.mutate({ name, value: data?.[name] === 'Y' ? 'N' : 'Y' });
  }, [data]);

  // const [showModal, setShowModal] = useState<boolean>(false);
  // useEffect(() => {
  //   Notifications.getPermissionsAsync()
  //     .then(({ status }) => {
  //       if (status !== 'granted') {
  //         Storage.getItem('@alarmDate')
  //           .then((alarmDate) => {
  //             if (!alarmDate || Number(alarmDate) < +new Date()) setShowModal(true);
  //           });
  //       }
  //     });
  // }, []);

  // const handleAlarm = () => {
  //   Notifications.requestPermissionsAsync()
  //     .then(({ status }) => {
  //       if (status === 'granted') setShowModal(false);
  //     });
  // }

  // const handleAfter30Day = () => {
  //   Storage.setItem('@alarmDate', String(+new Date()+30*24*60*60*1000))
  //     .then((_) => setShowModal(false));
  // }

  return (
    <Layout>
      <GoBack navigation={navigation} title={'알림 설정'} />

      <Box bgColor={'gray.200'}>
        <Section title={'자산 및 공지'}>
          <SectionItem
            title={'자산 변동'}
            subTitle={'예치금, 구매 내역, 분배금 변동 시 알려 드려요.'}
            toggle={data?.assetNotification === 'Y'}
            handleToggle={() => handleToggle('assetNotification')}
          />
          <SectionItem
            title={'포트폴리오'}
            subTitle={'오픈 예정, 완판 시 알려 드려요.'}
            toggle={data?.portfolioNotification === 'Y'}
            handleToggle={() => handleToggle('portfolioNotification')}
          />
        </Section>

        <Section title={'이벤트 · 혜택 알림'}>
          <SectionItem
            title={'문자 알림'}
            toggle={data?.marketingSms === 'Y'}
            handleToggle={() => handleToggle('marketingSms')}
          />
          <SectionItem
            title={'앱 알림'}
            toggle={data?.marketingApp === 'Y'}
            handleToggle={() => handleToggle('marketingApp')}
          />
        </Section>
      </Box>
      {/*<Modal*/}
      {/*  showModal={showModal}*/}
      {/*  setShowModal={setShowModal}*/}
      {/*  // handleAlarm={handleAlarm}*/}
      {/*  handleAfter30Day={handleAfter30Day}*/}
      {/*/>*/}
    </Layout>
  );
};

export default Alarm;
