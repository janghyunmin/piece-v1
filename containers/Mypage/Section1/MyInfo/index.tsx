import React, { useEffect, useState } from 'react';

import { Box } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Section1 from './_fragments/Section1';
import Section2 from './_fragments/Section2';
import Section3 from './_fragments/Section3';

import useMemberQuery from 'hooks/useMemberQuery'
import useNextNavigate from 'hooks/useNextNavigate'

const MyInfo = ({ navigation, route }: any) => {
  const { data: memberData } = useMemberQuery();
  useNextNavigate(navigation, route.params?.next);

  return (
    <Layout>
      <GoBack navigation={navigation} title={'내 정보'} />

      <Box bgColor={'gray.200'}>
        <Section1
          memberData={memberData}
          navigation={navigation}
        />

        <Section2
          navigation={navigation}
          memberData={memberData}
        />

        <Section3
          navigation={navigation}
          memberData={memberData}
        />
      </Box>
    </Layout>
  );
};

export default MyInfo;
