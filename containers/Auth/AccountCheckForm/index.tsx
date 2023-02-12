import React, { useState } from 'react';

import { Box, ScrollView, Text } from 'native-base'

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Title from './_fragments/Title';
import CheckForm from './_fragments/CheckForm';
import FooterBtn from './_fragments/FooterBtn';
import { useMutation } from 'react-query'
import { CheckExistingMember } from 'apis/Member/member.type'
import { checkExistingMember } from 'apis/Member'
import { KeyboardAvoidingView } from 'react-native'
import { useRootState } from 'hooks/useRootState'
import { setForm } from 'features/certificationFormSlice'
import { useDispatch } from 'react-redux'
import { validateEmail } from 'utils/validate'


const AccountCheckForm = ({ navigation }: any) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();

  const { form } = useRootState((state) => state.certificationForm);
  const [emailIncorrect, setEmailIncorrect] = useState<string>('');

  const handleNext = () => {
    if (!validateEmail(form.email)) {
      setEmailIncorrect('올바른 이메일 형식이 아닙니다.');
      return;
    }
    mutate({
      name: form.name,
      email: form.email,
    });
  }

  const { mutate } = useMutation(
    (_body: CheckExistingMember) => checkExistingMember(_body),
    {
      onSuccess: (res) => {
        if (res.isDi) {
          navigation.navigate('accountCheckComplete', { isWeb: false })
        }
        else {
          dispatch(setForm({ name: 'memberId', value: res.memberId }))
          navigation.navigate('accountCheckComplete', { isWeb: true, isLogin: false })
        }
      },
      onError: (err: any) => {
        if (err?.response?.status === 404) navigation.navigate('accountCheckComplete', { isWeb: false });
      },
    }
  )

  return (
    <Layout>
      <KeyboardAvoidingView>
        <Box h={'100%'}>
          <ScrollView
            flex={'1'}
            scrollIndicatorInsets={{ top: 1, bottom: 1 }}
            contentInsetAdjustmentBehavior={'always'}
          >
            <GoBack navigation={navigation} />

            <Box px={'16px'}>
              <Title />
            </Box>

            <Box px={'16px'}>
              <CheckForm
                name={form.name}
                email={form.email}
                emailIncorrect={emailIncorrect}
                setEmailIncorrect={setEmailIncorrect}
              />
            </Box>
          </ScrollView>

          <Box px={'16px'} position={'absolute'} bottom={'0'} w={'100%'}>
            <Text
              size={'captionM'}
              color={'warning.500'}
              textAlign={'center'}
              mb={'10px'}
            >
              {errorMessage}
            </Text>
            <FooterBtn
              isDisabled={!form.name || !form.email}
              next={handleNext}
            />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default AccountCheckForm;
