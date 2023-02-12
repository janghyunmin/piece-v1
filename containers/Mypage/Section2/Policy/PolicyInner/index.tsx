import React, { useEffect, useMemo, useState } from 'react'

import { ScrollView } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';

import Title from './_fragment/Title';
import Body from './_fragment/Body';
import { useQuery } from 'react-query'
import { getConsentDetail, getConsentList } from 'apis/Consent'
import usePageLoaded from 'hooks/usePageLoaded'


const PolicyInner = ({ navigation, route }: any) => {
  const { consentGroup, defaultConsentCode } = route.params;

  const pageLoaded = usePageLoaded();

  const { data: consentList } = useQuery(
    ['Consents', consentGroup],
    () => getConsentList(consentGroup),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Consents', consentGroup] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  )
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const consentCode = useMemo(() => {
    return consentList ? consentList[selectedIndex].consentCode : defaultConsentCode;
  }, [defaultConsentCode, consentList])

  const { data: consentDetail } = useQuery(
    ['ConsentDetail', consentCode],
    () => consentCode && getConsentDetail(consentCode),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['ConsentDetail'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    },
  )

  return (
    <Layout>
      <GoBack navigation={navigation} />
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        {consentList && (
          <Title
            consentList={consentList}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        {pageLoaded && consentDetail && (
          <Body consentDetail={consentDetail} />
        )}
      </ScrollView>
    </Layout>
  );
};

export default PolicyInner;
