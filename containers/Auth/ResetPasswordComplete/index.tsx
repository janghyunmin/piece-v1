import React, { useEffect } from 'react'

import { Box, Flex } from 'native-base';
import { useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import TopContainer from './_fragments/TopContainer';
import BottomContainer from './_fragments/BottomContainer';

import { initForm } from 'features/certificationFormSlice'

export const ResetPasswordComplete = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const handleNext = () => {
    navigation.navigate('tab');
  };

  useEffect(() => {
    return () => {
      dispatch(initForm());
    }
  }, [])


  return (
    <Layout>
      <Flex
        flex={1}
        px={'16px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box />

        <TopContainer />

        <BottomContainer handleNext={handleNext} />
      </Flex>
    </Layout>
  );
};
