import React, { useState } from 'react';

import { Box, ScrollView } from 'native-base';
import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import EventCard from './_fragments/EventCard';

import { useQuery } from 'react-query'
import { getEvent } from 'apis/Board';

const Event = ({ navigation }: any) => {
  const { data } = useQuery(
    ['Events'],
    getEvent,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Events'] });
      },
      cacheTime: 0,
    }
  );

  return (
    <Layout>
      <GoBack navigation={navigation} title={'이벤트'} />
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >

        <Box px={'16px'}>
          <EventCard event={data} navigation={navigation} />
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default Event;
