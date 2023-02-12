import React from 'react';

import Layout from 'components/Layout';
import Texts from './_fragments/Texts';
import FooterBtn from './_fragments/FooterBtn';
import { useRootState } from 'hooks/useRootState'
import usePreventBackButton from 'hooks/usePreventBackButton';

const AccountCheckComplete = ({ navigation, route }: any) => {
  const { isWeb } = route.params;
  const { form: { name } } = useRootState((state) => state.certificationForm);
  usePreventBackButton();
  return (
    <Layout>
      <Texts name={name} isWeb={isWeb} />

      <FooterBtn navigation={navigation} isLogin={route.params?.isLogin }/>
    </Layout>
  );
};

export default AccountCheckComplete;
