import React, { useEffect, useRef, useState } from 'react'

import { Input, ScrollView } from 'native-base'
import { Platform, KeyboardAvoidingView } from 'react-native'

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import Withdrawal1Top from './_fragment/Withdrawal1Top';
import Withdrawal1Reason from './_fragment/Withdrawal1Reason';
import Withdrawal1BottomBtn from './_fragment/Withdrawal1BottomBtn';


const Withdrawal = ({ navigation }: any) => {
  const reasonList = [
    {
      withdrawalReasonCode: 'MWR0101',
      title: '사용하지 않는 앱이에요',
    },
    {
      withdrawalReasonCode: 'MWR0102',
      title: '수익률 회수기간이 너무 길어요',
    },
    {
      withdrawalReasonCode: 'MWR0103',
      title: '앱에 오류가 많아요',
    },
    {
      withdrawalReasonCode: 'MWR0104',
      title: '앱을 어떻게 쓰는지 모르겠어요',
    },
    {
      withdrawalReasonCode: 'MWR0105',
      title: '비슷한 서비스가 더 좋아요',
    },
    {
      withdrawalReasonCode: 'MWR0106',
      title: '기타',
    },
  ]

  const ref = useRef<any>(null);

  const [withdrawalReasonCode, setWithdrawalReasonCode] = useState<string>('');
  const [withdrawalReasonText, setWithdrawalReasonText] = useState<string>('');

  const [buttonSelected, setButtonSelected] = useState<boolean>(false);

  const handleSelect = (withdrawalReasonCode: string) => {
    setWithdrawalReasonText('');
    setWithdrawalReasonCode(withdrawalReasonCode);
    setButtonSelected(!!withdrawalReasonCode);
  }

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          scrollIndicatorInsets={{ top: 1, bottom: 1 }}
          contentInsetAdjustmentBehavior={'always'}
          ref={ref}
        >
          <GoBack navigation={navigation} />

          <Withdrawal1Top />

          <Withdrawal1Reason
            reasonList={reasonList}
            handleSelect={handleSelect}
            withdrawalReasonCode={withdrawalReasonCode}
            withdrawalReasonText={withdrawalReasonText}
            setWithdrawalReasonText={setWithdrawalReasonText}
            scrollRef={ref}
          />
        </ScrollView>
        <Withdrawal1BottomBtn
          navigation={navigation}
          buttonSelected={buttonSelected}
          withdrawalReasonCode={withdrawalReasonCode}
          withdrawalReasonText={withdrawalReasonText}
        />
      </KeyboardAvoidingView>

    </Layout>
  );
};

export default Withdrawal;
