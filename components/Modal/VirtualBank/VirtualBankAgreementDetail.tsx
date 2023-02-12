import React from 'react'
import Layout from 'components/Layout'
import GoBack from 'components/GoBack'
import { Box, ScrollView, Text } from 'native-base'
import VirtualBankAgreementBody from 'components/Modal/VirtualBank/_fragments/VirtualBankAgreementBody'


const VirtualBankAgreementDetail = ({ navigation, route }: any) => {
  const { consent } = route.params;

  return (
    <Layout>
      <GoBack navigation={navigation} />
      <Box px={'16px'}>
        <Box
          pb={'20px'}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
        >
          <Text size={'titleL'}>
            {consent.consentTitle}
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
          <VirtualBankAgreementBody consentCode={consent.consentCode}/>
        </Box>
      </ScrollView>
    </Layout>
  )
}

export default VirtualBankAgreementDetail;
