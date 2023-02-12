import React from 'react';

import { Flex } from 'native-base';

import Layout from 'components/Layout';
import WithdrawalCompleteTop from './_fragment/WithdrawalCompleteTop';
import WithdrawalCompleteBottom from './_fragment/WithdrawalCompleteBottom';

const WithdrawalComplete = ({ navigation }: any) => {
  return (
    <Layout>
      <Flex
        flex={1}
        px={'16px'}
        pt={'160px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <WithdrawalCompleteTop />

        <WithdrawalCompleteBottom navigation={navigation} />
      </Flex>
    </Layout>
  );
};

export default WithdrawalComplete;
