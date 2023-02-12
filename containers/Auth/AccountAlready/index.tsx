import React from 'react';

import Layout from 'components/Layout';
import Texts from './_fragments/Texts';
import FooterBtn from './_fragments/FooterBtn';
import { useRootState } from 'hooks/useRootState'

const AccountAlready = ({ navigation, route }: any) => {
  const { form: { name } } = useRootState((state) => state.certificationForm);
  return (
    <Layout>
      <Texts name={name} />

      <FooterBtn navigation={navigation} />
    </Layout>
  );
};

export default AccountAlready;
