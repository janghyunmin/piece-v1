import React, { useEffect, useState } from 'react';

import { Flex } from 'native-base';

import Layout from 'components/Layout';
import TopContainer from './_fragments/TopContainer';
import BottomContainer from './_fragments/BottomContainer';

const index = ({ navigation, route }: any) => {
  const [accountChecked, setAccountChecked] = useState<boolean>(false);

  useEffect(() => {
    setAccountChecked(route.params.isRealAccount);
  }, [route.params]);

  const handleGoBack = () => {
    if (accountChecked) {
      navigation.navigate('registerComplete', {
        accountInfo: route.params.accountInfo,
      });
    } else {
      navigation.navigate('tab');
    }
  };

  return (
    <Layout>
      <Flex
        flex={1}
        px={'16px'}
        pt={'120px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <TopContainer accountChecked={accountChecked} />

        <BottomContainer
          accountChecked={accountChecked}
          handleGoBack={handleGoBack}
        />
      </Flex>
    </Layout>
  );
};

export default index;
