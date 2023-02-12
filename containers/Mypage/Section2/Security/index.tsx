import React, { useState } from 'react';

import { Box } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Section1 from './_fragments/Section1';
import Section2 from './_fragments/Section2';

import { useRootState } from 'hooks/useRootState';
import useDeviceBio from 'hooks/useDeviceBio';
import useIsFido from 'hooks/useIsFido';

const Security = ({ navigation, route }: any) => {
  const { isFido } = useRootState((state) => state.auth);
  const deviceBio = useDeviceBio();

  const handleToggle = () => {
    navigation.navigate('bioAuth', { isFido });
  }

  return (
    <Layout>
      <GoBack navigation={navigation} title={'인증 및 보안'} />

      <Box bgColor={'gray.200'}>
        <Section1
          toggle={isFido === 'Y'}
          handleToggle={handleToggle}
          navigation={navigation}
          deviceBio={deviceBio}
        />

        <Section2 navigation={navigation} />
      </Box>
    </Layout>
  );
};

export default Security;
