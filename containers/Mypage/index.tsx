import React, { useRef } from 'react';

import { ScrollView } from 'native-base';
import { useScrollToTop } from '@react-navigation/native';

import Layout from 'components/Layout';
import Title from './_fragments/Title';
import Section1 from './_fragments/Section1';
import Section2 from './_fragments/Section2';
import Section3 from './_fragments/Section3';
import Section4 from './_fragments/Section4';
import TitleImage from './_fragments/TitleImage';
import { getMember } from 'apis/Member'
import { useQuery } from 'react-query'
import PageLoading from 'components/PageLoading'

export const Mypage = ({ navigation }: any) => {
  const ref: any = useRef();
  useScrollToTop(ref);

  const {
    data: memberData,
    isLoading,
  } = useQuery(
    ['Member'],
    getMember,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Member'] });
      },
      cacheTime: 0,
    }
  );

  return (isLoading ? (
    <PageLoading />
  ) : (
    <Layout noStatusBar={true} bottomTab={true}>
      <ScrollView
        position={'relative'}
        ref={ref}
        bgColor={'gray.200'}
        bounces={false}
      >
        {/* title */}
        <TitleImage />
        <Title navigation={navigation} memberData={memberData} />

        {/* section1 */}
        <Section1 navigation={navigation} />

        {/* section2 */}
        <Section2 navigation={navigation} />

        {/* section3 */}
        <Section3 navigation={navigation} />

        {/* section4 */}
        <Section4 />
      </ScrollView>
    </Layout>
  ));
};
