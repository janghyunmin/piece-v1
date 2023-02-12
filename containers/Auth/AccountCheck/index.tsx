import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { Box } from 'native-base';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Title from './_fragments/Title';
import CheckButton from './_fragments/CheckButton';
import FooterBtn from './_fragments/FooterBtn';
import { useDispatch } from 'react-redux'
import { initForm } from 'features/certificationFormSlice'

const AccountCheck = ({ navigation }: any) => {
  const dispatch = useDispatch();

  useLayoutEffect(useCallback(() => {
    dispatch(initForm());
  }, []))

  const [haveAccount, setHaveAccount] = useState<boolean>(true);

  const handleNext = () => {
    if (haveAccount) return navigation.navigate('certification', { kind: 'LOGIN' });
    if (!haveAccount) return navigation.navigate('accountCheckForm');
  }

  return (
    <Layout>
      <Box h={'100%'}>
        <Box flex={'1'}>
          <GoBack navigation={navigation} />

          <Box px={'16px'}>
            <Title />
          </Box>

          <Box px={'16px'}>
            <CheckButton
              haveAccount={haveAccount}
              setHaveAccount={setHaveAccount}
            />
          </Box>
        </Box>

        <Box px={'16px'} position={'absolute'} bottom={'0'} w={'100%'}>
          <FooterBtn next={handleNext} />
        </Box>
      </Box>
    </Layout>
  );
};

export default AccountCheck;
