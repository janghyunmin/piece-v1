import React, { useState } from 'react';

import { Box, ScrollView } from 'native-base';

import GoBack from 'components/GoBack';
import Header from './_fragments/Header';
import Banks from './_fragments/Banks';

import { BanksProps } from 'interfaces/wallet.type';
import Layout from 'components/Layout';

const SelectBankAccount = ({ navigation, isCreate }: any) => {
  const [banks] = useState<BanksProps[][]>([
    [
      {
        id: 1,
        name: 'KB국민은행',
        code: '004',
        image: require('assets/images/bank1.png'),
      },
      {
        id: 2,
        name: '신한은행',
        code: '026',
        image: require('assets/images/bank2.png'),
      },
      {
        id: 3,
        name: '하나은행',
        code: '005',
        image: require('assets/images/bank3.png'),
      },
    ],
    [
      {
        id: 4,
        name: '경남은행',
        code: '039',
        image: require('assets/images/bank4.png'),
      },
      {
        id: 5,
        name: '광주은행',
        code: '034',
        image: require('assets/images/bank5.png'),
      },
      {
        id: 6,
        name: '대구은행',
        code: '031',
        image: require('assets/images/bank6.png'),
      },
    ],
    [
      {
        id: 7,
        name: '부산은행',
        code: '032',
        image: require('assets/images/bank7.png'),
      },
      {
        id: 8,
        name: '수협은행',
        code: '007',
        image: require('assets/images/bank8.png'),
      },
      {
        id: 9,
        name: '우리은행',
        code: '020',
        image: require('assets/images/bank9.png'),
      },
    ],
    [
      {
        id: 10,
        name: '전북은행',
        code: '037',
        image: require('assets/images/bank10.png'),
      },
      {
        id: 11,
        name: '제주은행',
        code: '035',
        image: require('assets/images/bank11.png'),
      },
      {
        id: 12,
        name: '카카오뱅크',
        code: '090',
        image: require('assets/images/bank12.png'),
      },
    ],
    [
      {
        id: 13,
        name: '케이뱅크',
        code: '089',
        image: require('assets/images/bank13.png'),
      },
      {
        id: 14,
        name: '토스뱅크',
        code: '092',
        image: require('assets/images/bank14.png'),
      },
      {
        id: 15,
        name: '씨티은행',
        code: '027',
        image: require('assets/images/bank15.png'),
      },
    ],
    [
      {
        id: 16,
        name: 'IBK기업은행',
        code: '003',
        image: require('assets/images/bank16.png'),
      },
      {
        id: 17,
        name: 'KDB산업은행',
        code: '002',
        image: require('assets/images/bank17.png'),
      },
      {
        id: 18,
        name: 'NH농협은행',
        code: '011',
        image: require('assets/images/bank18.png'),
      },
    ],
    [
      {
        id: 19,
        name: 'SC제일은행',
        code: '023',
        image: require('assets/images/bank19.png'),
      },
      {
        id: 20,
        name: '우체국은행',
        code: '071',
        image: require('assets/images/bank20.png'),
      },
      {
        id: 21,
        name: '외환은행',
        code: '',
        image: require('assets/images/bank21.png'),
      },
    ],
    [
      {
        id: 22,
        name: '신협은행',
        code: '047',
        image: require('assets/images/bank22.png'),
      },
      {
        id: 23,
        name: '산림조합은행',
        code: '064',
        image: require('assets/images/bank23.png'),
      },
      {
        id: 24,
        name: '새마을은행',
        code: '045',
        image: require('assets/images/bank24.png'),
      },
    ],
  ]);

  return (
    <Layout>
      <ScrollView
        flex={1}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <GoBack navigation={navigation} title={isCreate ? '계좌 등록하기' : '계좌 변경하기'} />

        <Box px={'16px'}>
          <Header />

          <Banks banks={banks} isCreate={isCreate} navigation={navigation} />
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default SelectBankAccount;
