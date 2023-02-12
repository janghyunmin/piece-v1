import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Flex, ScrollView, Text } from 'native-base'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'

import GoBack from 'components/GoBack';
import Layout from 'components/Layout';
import Forms from './_fragments/Forms';
import Header from './_fragments/Header';
import ChangeBankAccount from './_fragments/ChangeBankAccount';
import FooterBtn from './_fragments/FooterBtn';

import { checkNum } from 'utils/validate';
import useMemberQuery from 'hooks/useMemberQuery'
import { createMemberAccount, updateMemberAccount } from 'apis/Member';
import { useMutation } from 'react-query';

const RegisterBankAccount = ({ navigation, route }: any) => {
  const ref: any = useRef();
  const { isCreate } = route.params;
  const updateOrCreateMemberAccount = isCreate ? createMemberAccount : updateMemberAccount;

  const { data: memberData } = useMemberQuery();
  const [bankAccount, setBankAccount] = useState<string>('');
  const [bankAccountFocus, setBankAccountFocus] = useState<boolean>(false);
  const [bankAccountIncorrect, setBankAccountIncorrect] = useState<string>('');
  const [formFilled, setFormFilled] = useState<boolean>(false);

  useEffect(() => {
    if (
      bankAccount.length > 0 &&
      bankAccountIncorrect === ''
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [bankAccount, bankAccountIncorrect]);

  useEffect(() => {
    if (!checkNum(bankAccount) && bankAccount !== '') {
      setBankAccountIncorrect('숫자만 입력할 수 있어요');
    } else {
      setBankAccountIncorrect('');
    }

    if (bankAccountIncorrect) setBankAccountIncorrect('');
  }, [bankAccount]);

  const registerUserAccount = () => {
    if (bankAccount === '')
      return setBankAccountIncorrect('계좌번호를 입력해주세요');
    if (formFilled) {
      const req = {
        bankCode: route.params.bankSelected.code,
        accountNo: bankAccount,
      };
      mutate(req);
    }
  };

  const { mutate, isLoading } = useMutation(
    (body: any) => updateOrCreateMemberAccount(body),
    {
      onSuccess: (res) => {
        navigation.navigate('registerComplete', {
          accountInfo: {
            bankAccount: bankAccount,
            bankName: route.params.bankSelected.name,
            image: route.params.bankSelected.image,
          },
          isCreate,
        });
      },
      onError: (err) => {
        navigation.navigate('BankAccountCheckFailModal');
      },
    },
  )

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView
          ref={ref}
          scrollIndicatorInsets={{ top: 1, bottom: 1 }}
          contentInsetAdjustmentBehavior={'always'}
        >
          <GoBack navigation={navigation} title={isCreate ? '계좌 등록하기': '계좌 변경하기'} />

          <Box px={'16px'}>
            <Header isCreate={isCreate} />

            <ChangeBankAccount
              handleGoBack={() => navigation.goBack()}
              image={route.params.bankSelected.image}
              bankName={route.params.bankSelected.name}
            />

            <Forms
              name={memberData?.name}
              bankAccountFocus={bankAccountFocus}
              bankAccount={bankAccount}
              setBankAccountFocus={setBankAccountFocus}
              setBankAccount={setBankAccount}
              bankAccountIncorrect={bankAccountIncorrect}
            />
          </Box>
        </ScrollView>

        {Platform.OS === 'ios' && bankAccountFocus && (
          <Button
            borderRadius={0}
            borderTopWidth={'1px'}
            borderColor={'#ffffff'}
            onPress={() => Keyboard.dismiss()}
            h={'50px'}
            bg={'#10CFC9'}
          >
            <Text color="white" size={'buttonM'}>확인</Text>
          </Button>
        )}
      </KeyboardAvoidingView>

      <FooterBtn
        registerUserAccount={registerUserAccount}
        isLoading={isLoading}
        formFilled={formFilled}
        isCreate={isCreate}
      />
    </Layout>
  );
};

export default RegisterBankAccount;
