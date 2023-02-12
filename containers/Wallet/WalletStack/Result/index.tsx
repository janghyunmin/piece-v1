import React from 'react';

import { Box, Flex } from 'native-base';

import Layout from 'components/Layout';
import TopContainer from './_fragments/TopContainer';
import BottomContainer from './_fragments/BottomContainer';
import usePreventBackButton from 'hooks/usePreventBackButton';

const Result = ({ navigation, route }: any) => {
  const { type, status, success } = route.params;
  usePreventBackButton();
  const handleNext = () => {
    navigation.navigate('OwnMoney');
  };

  return (
    <Layout>
      <Flex
        px={'16px'}
        flex={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box />

        <TopContainer type={type} status={status} success={success} />

        <BottomContainer handleNext={handleNext} success={success} />
      </Flex>
    </Layout>
  );
};

export default Result;
