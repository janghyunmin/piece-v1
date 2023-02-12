import React from 'react'
import { useQuery } from 'react-query'
import { getConsentDetail } from 'apis/Consent'
import Layout from 'components/Layout'
import GoBack from 'components/GoBack'
import PageLoading from 'components/PageLoading'
import { Box, ScrollView, Text } from 'native-base'
import HTMLView from 'react-native-htmlview'


const AgreementDetail = ({ navigation, route }: any) => {
  const { consentCode } = route.params;

  const { data: consentData, isLoading } = useQuery(
    ['Consent', consentCode],
    () => getConsentDetail(consentCode),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Consent', consentCode] });
      },
      cacheTime: 0,
    },
  );

  return (
    <Layout>
      <GoBack navigation={navigation} />
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <Box px={'16px'}>
            <Box
              pb={'20px'}
              borderBottomWidth={'1px'}
              borderBottomColor={'gray.200'}
            >
              <Text size={'titleL'}>
                {consentData.consentTitle}
              </Text>
            </Box>
          </Box>
          <ScrollView
            pt={'20px'}
            px={'16px'}
            scrollIndicatorInsets={{ top: 1, bottom: 1 }}
            contentInsetAdjustmentBehavior={'always'}
          >
            <Box mb={'30px'}>
              <HTMLView value={consentData.consentContents} addLineBreaks={false} />
            </Box>
          </ScrollView>
        </>
      )}
    </Layout>
  )
}

export default AgreementDetail;
