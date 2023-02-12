import React, { useEffect } from 'react'

import Layout from 'components/Layout';
import Texts from './_fragments/Texts';
import FooterBtn from './_fragments/FooterBtn';
import { useDispatch } from 'react-redux'
import { initForm } from 'features/certificationFormSlice'

const RegisterFail = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(initForm());
    }
  }, [])

  return (
    <Layout>
      <Texts />

      <FooterBtn navigation={navigation} />
    </Layout>
  );
};

export default RegisterFail;
