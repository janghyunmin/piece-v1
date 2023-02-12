import React from 'react';

import { Box, Flex, Text } from 'native-base';

import GoBack from 'components/GoBack';
import Layout from 'components/Layout';
import Account from '../MoneyMoves/_fragments/Account';
import MoneyMoveTitle from '../MoneyMoves/_fragments/MoneyMoveTitle';
import FooterBtn from './_fragments/FooterBtn';
import Notice from './_fragments/Notice';
import Remittable from './_fragments/Remittable';

const MoneyMovesCheck = ({ navigation, route }: any) => {
  const { type, status, depositData, accountData } = route.params;

  return (
    <Layout>
      <GoBack
        navigation={navigation}
        title="출금 신청하기"
      />

      <Flex flex={1} justifyContent={'space-between'}>
        <Box px={'16px'} mt={'10px'}>
          <MoneyMoveTitle pageType={type} />

          <Notice type={type} status={status} />

          <Remittable type={type} depositData={depositData} status={status} />
        </Box>

        <Box px={'16px'}>
          <Box mb={'16px'}>
            <Account pageType={type} accountData={accountData} />
          </Box>

          <FooterBtn navigation={navigation} pageType={type} status={status} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default MoneyMovesCheck;
