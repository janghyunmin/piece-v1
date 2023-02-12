import React, { useEffect } from 'react';

import { Flex } from 'native-base';
import { useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import TopContainer from './_fragments/TopContainer';
import BottomContainer from './_fragments/BottomContainer';

import { useQueryClient } from 'react-query'
import usePreventBackButton from 'hooks/usePreventBackButton';

const index = ({ navigation, route }: any) => {
  const queryClient = useQueryClient();
  usePreventBackButton();
  return (
    <Layout>
      <Flex
        flex={1}
        pt={'120px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <TopContainer isCreate={route.params.isCreate} />

        <BottomContainer
          accountInfo={route.params.accountInfo}
          handleGoBack={() => {
            queryClient.invalidateQueries(['Account']);
            navigation.navigate('tab');
          }}
        />
      </Flex>
    </Layout>
  );
};

export default index;
