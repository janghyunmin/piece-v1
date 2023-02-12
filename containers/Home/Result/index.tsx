import React, { useEffect } from 'react';

import { Box, Flex } from 'native-base';

import Layout from 'components/Layout';
import TopContainer from './_fragments/TopContainer';
import BottomContainer from './_fragments/BottomContainer';
import usePreventBackButton from 'hooks/usePreventBackButton';
import usePurchaseWebsocket from 'hooks/usePurchaseWebsocket';

const Result = ({ navigation, route }: any) => {
  const { item, purchasePieceVolume, sessionId } = route.params;
  // console.log('sessionId : ' + sessionId);

  const statusCode = usePurchaseWebsocket(sessionId);
  // console.log('statusCode : ' + statusCode);

  usePreventBackButton();
  const handleNext = () => {
    if (statusCode === 'PUR0101') {
      navigation.reset({
        routes: [
          { name: 'StackNavigation', params: { screen: 'tab', params: { screen: 'wallet' }} }
        ],
      });
    } else {
      navigation.navigate('Portfolio', { item });
    }
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

        <TopContainer
          item={item}
          purchasePieceVolume={purchasePieceVolume}
          statusCode={statusCode}
        />

        {statusCode !== 'PUR0100' ? (
          <BottomContainer
            handleNext={handleNext}
            statusCode={statusCode}
            // isLoading={statusCode === 'PUR0100'}
          />
        ) : (
          <Box h={'74px'} />
        )}
      </Flex>
    </Layout>
  );
};

export default Result;
