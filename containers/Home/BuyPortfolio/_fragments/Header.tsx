import React from 'react';

import { Box, Button, Center, Text } from 'native-base';

import { comma } from 'utils/comma';
import { BuyPortfolioHeaderProps } from 'interfaces/home.type';

const Header = (props: BuyPortfolioHeaderProps) => {
  const { navigation, status, pieceAmount, deposit, item } = props;

  return (
    <Box>
      <Text
        size={'titleXL'}
        color={!!status ? 'black' : 'gray.300'}
        mb={'10px'}
        textAlign={'center'}
      >
        {!!status ? `${comma(status)} 피스` : '몇 피스를 구매할까요?'}
      </Text>
      {!status ? (
        <Text size={'textS'} bold color={'gray.500'} textAlign={'center'}>
          예치금 {comma(deposit)}원
        </Text>
      ) : (status*pieceAmount > deposit) ? (
        <Center>
          <Button
            bgColor={'primary.100'}
            borderRadius={'5px'}
            onPress={() => {
              navigation.navigate('OwnMoneyStack', {
                screen: 'DepositRecharge',
                params: { type: 'charge', from: 'buy' },
              });
            }}
          >
            <Text size={'titleS'} color={'primary.500'}>
              예치금 충전
            </Text>
          </Button>
        </Center>
      ) : (
        <Text size={'textS'} bold color={'black'} textAlign={'center'}>
          {comma((status * pieceAmount) + item.purchaseFee)}원
        </Text>
      )}

      {/*{!!status && (status*pieceAmount > deposit ? (*/}
      {/*  <Center>*/}
      {/*    <Button*/}
      {/*      bgColor={'primary.100'}*/}
      {/*      borderRadius={'5px'}*/}
      {/*      onPress={() => {*/}
      {/*        navigation.navigate('OwnMoneyStack', {*/}
      {/*          screen: 'DepositRecharge',*/}
      {/*          params: { type: 'charge', from: 'buy' },*/}
      {/*        });*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Text size={'titleS'} color={'primary.500'}>*/}
      {/*        예치금 충전*/}
      {/*      </Text>*/}
      {/*    </Button>*/}
      {/*  </Center>*/}
      {/*) : (*/}
      {/*  <Text size={'textS'} bold color={'black'} textAlign={'center'}>*/}
      {/*    {comma((status * pieceAmount) + item.purchaseFee)}원*/}
      {/*  </Text>*/}
      {/*))}*/}
    </Box>
  );
};

export default Header;
