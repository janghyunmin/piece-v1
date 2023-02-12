import React, { useCallback, useMemo, useState } from 'react';

import { Box, Flex } from "native-base";

import { useQuery } from "react-query";
import { getDepositBalance } from "apis/Deposit";

import Layout from "components/Layout";
import GoBack from "components/GoBack";
import NumberPad from "components/NumberPad";

import Header from "./_fragments/Header";
import TextsAboveNumberPad from "./_fragments/TextsAboveNumberPad";
import ShortCutAdd from "./_fragments/ShortCutAdd";
import FooterBtn from "./_fragments/FooterBtn";
import { getPurchases } from 'apis/Purchase'
import { useRootState } from 'hooks/useRootState';
import { useDispatch } from 'react-redux';
import { setRefetch } from 'features/statusBarSlice';
import * as Haptics from 'expo-haptics';

const BuyPortfolio = ({ navigation, route }: any) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const { amount } = useRootState((state) => state.portfolio);
  const [status, setStatus] = useState<number>(0);

  const {
    data: depositData,
  } = useQuery(
    ['Deposit'],
    getDepositBalance,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Deposit'] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const {
    data: purchaseData,
  } = useQuery(
    ['Purchases', 'PUS0102', item.portfolioId],
    () => getPurchases({
      purchase_state: 'PUS0102',
      portfolio_id: item.portfolioId,
    }),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Purchase', 'PUS0102', item.portfolioId] });
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const [
    pieceAmount,
    remainingPiece,
    minPiece,
    maxPiece,
  ] = useMemo(() => {
    let pieceAmount = 0;
    let remainingPiece = 0;
    let minPiece = 0;
    let maxPiece = 0;

    if (item) {
      pieceAmount = item.recruitmentAmount/item.totalPieceVolume;
      const remainingAmount = item.recruitmentAmount-amount;
      remainingPiece = remainingAmount / pieceAmount;
      if (purchaseData) {
        const buyAmount = purchaseData.reduce((cur: number, d: any) => (
          cur + (d.purchasePieceVolume * pieceAmount)
        ), 0);
        minPiece = (item.minPurchaseAmount)/pieceAmount;

        if (depositData) {
          let p;
          if (item.maxPurchaseAmount - buyAmount < remainingAmount) {
            p = item.maxPurchaseAmount-buyAmount;
          } else {
            p = remainingAmount;
          }

          const maxAmount = p > 0 ? p : 0 ;
          if (depositData.depositBalance > maxAmount) {
            maxPiece = maxAmount / pieceAmount;
          } else {
            maxPiece = parseInt(String(depositData.depositBalance / pieceAmount));
          }
        }
      }
    }

    return [pieceAmount, remainingPiece, minPiece, maxPiece];
  }, [item, depositData, purchaseData, amount]);

  const reset = useCallback(() => {
    setStatus(0);
  }, []);

  const setNumber = useCallback((data: number) => {
    setStatus((cur) => {
      const s = Number(String(cur) + String(data));
      if (cur > maxPiece) {
        Haptics.notificationAsync();
        return cur;
      }
      if (s <= maxPiece) {
        return s;
      } else {
        Haptics.notificationAsync();
        return s;
      }
    });
  }, [maxPiece]);

  const add = useCallback((data: number|string) => {
    if (typeof data === 'string') return setStatus(maxPiece);
    return setStatus((cur) => {
      if (cur > maxPiece) {
        Haptics.notificationAsync();
        return cur;
      }
      const s = cur + data;
      if (s <= maxPiece) {
        return s;
      } else {
        Haptics.notificationAsync();
        return s;
      }
    });
  }, [maxPiece]);

  const deleteNumber = useCallback(() => {
    setStatus((cur) => {
      const curStr = String(cur);
      if (curStr.length > 0) return Number(curStr.substr(0, curStr.length-1));
      return 0;
    });
  }, []);

  return (
    <Layout>
      <GoBack
        navigation={navigation}
        onBack={() => {
          dispatch(setRefetch());
          navigation.goBack();
        }}
      />
      {depositData && purchaseData && (
        <Flex justifyContent={"space-between"} pt={"48px"} px={"16px"} flex={1}>
          <Header
            navigation={navigation}
            status={status}
            pieceAmount={pieceAmount}
            item={item}
            deposit={depositData.depositBalance}
          />

          <Box>
            <TextsAboveNumberPad
              status={status}
              pieceAmount={pieceAmount}
              remainingPiece={remainingPiece}
              min={minPiece}
              max={maxPiece}
              item={item}
            />

            <ShortCutAdd add={add} />

            <NumberPad
              reset={reset}
              setNumber={setNumber}
              deleteNumber={deleteNumber}
            />
            <FooterBtn
              item={item}
              status={status}
              pieceAmount={pieceAmount}
              deposit={depositData.depositBalance}
              min={minPiece}
              max={maxPiece}
              navigation={navigation}
            />
          </Box>
        </Flex>
      )}
    </Layout>
  );
};

export default BuyPortfolio;
