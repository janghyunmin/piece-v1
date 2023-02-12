import React, { useMemo, useState } from 'react'

import { Box } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import EssentialItems from './_fragments/EssentialItems';
import OptionalItem from './_fragments/OptionalItem';

import { ConsentData } from 'interfaces/mypage.type';
import { useQuery } from 'react-query'
import { getConsentList } from 'apis/Consent'
import { ConsentType } from 'apis/Consent/consent.type'
import OptionalItems from 'containers/Mypage/Section2/Policy/_fragments/OptionalItems'
import { getMemberConsentList } from 'apis/Member'
import PageLoading from 'components/PageLoading'

const Policy = ({ navigation }: any) => {
  const [consentList, setConsentList] = useState<ConsentData[]>([]);
  useQuery(
    ['Consents'],
    () => getConsentList(),
    {
      onSuccess: (data) => {
        setConsentList(data);
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Consents'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const { data: memberConsentList } = useQuery(
    ['MemberConsents'],
    getMemberConsentList,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['MemberConsents'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  )

  const essentialConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentData) => consent.isMandatory === 'Y');
  }, [consentList]);

  const optionalConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentData) => consent.isMandatory === 'N');
  }, [consentList]);


  return (
    <Layout>
      <GoBack
        navigation={navigation}
        title={'이용약관 및 마케팅 정보 수신 동의'}
      />
      {!consentList || !memberConsentList ? (
        <PageLoading />
      ) : (
        <Box bgColor={'gray.200'}>
          <EssentialItems essentialConsentList={essentialConsentList} navigation={navigation} />
          <OptionalItems optionalConsentList={optionalConsentList} memberConsentList={memberConsentList} />
        </Box>
      )}
    </Layout>
  );
};

export default Policy;
