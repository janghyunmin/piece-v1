import React, { useMemo } from 'react'

import { Flex, Text } from 'native-base';

import { comma } from 'utils/comma';
import { TextsAboveNumberPadProps } from 'interfaces/home.type';
import { useRootState } from 'hooks/useRootState';

const TextsAboveNumberPad = (props: TextsAboveNumberPadProps) => {
  const { status, pieceAmount, remainingPiece, min, max, item } = props;
  const month = useMemo(() => {
    const date = +new Date(item.dividendsExpecatationDate) - +new Date(item.recruitmentBeginDate)
    return Math.floor(date / 86400000 / 30);
  }, [item])

  return (
    <>
      <Flex
        mb={'20px'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {!status ? (
          <>
            <Text size={'textS'} color={'gray.600'}>
              남은 수량{' '}
            </Text>
            <Text size={'titleS'} color={'primary.500'}>
              {comma(remainingPiece)}
            </Text>
            <Text size={'textS'} color={'gray.600'}>
              피스
            </Text>
          </>
        ) : status > max ? (
          <>
            <Text size={'textS'} color={'gray.600'}>
              최대{' '}
            </Text>
            <Text size={'titleS'} color={'warning.500'}>
              {comma(max)}피스
            </Text>
            <Text size={'textS'} color={'gray.600'}>
              까지 구매할 수 있어요.
            </Text>
          </>
        ) : status < min ? (
          <>
            <Text size={'textS'} color={'gray.600'}>
              최소{' '}
            </Text>
            <Text size={'titleS'} color={'warning.500'}>
              {comma(min)}피스
            </Text>
            <Text size={'textS'} color={'gray.600'}>
              이상 구매할 수 있어요.
            </Text>
          </>
        ) : (
          <>
            {/*<Text size={'textS'} color={'gray.600'}>*/}
            {/*  /!*약 {month}개월 후{' '}*!/*/}
            {/*</Text>*/}
            <Text size={'titleS'} color={'primary.500'}>
              {comma(Math.floor(status*pieceAmount*item.expectationProfitRate/100))}원
            </Text>
            <Text size={'textS'} color={'gray.600'}>
              의 수익이 예상돼요.
            </Text>
          </>
        )}



        {/*{!remainingPiece ? (*/}
        {/*  <>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      남은 수량이 없어요.*/}
        {/*    </Text>*/}
        {/*  </>*/}
        {/*) : (status !== 0 && status < min) ? (*/}
        {/*  <>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      최소{' '}*/}
        {/*    </Text>*/}
        {/*    <Text size={'titleS'} color={'warning.500'}>*/}
        {/*      {comma(min)}피스*/}
        {/*    </Text>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      이상 구매할 수 있어요.*/}
        {/*    </Text>*/}
        {/*  </>*/}
        {/*) : status > max ? (*/}
        {/*  <>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      최대{' '}*/}
        {/*    </Text>*/}
        {/*    <Text size={'titleS'} color={'warning.500'}>*/}
        {/*      {comma(max)}피스*/}
        {/*    </Text>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      까지 구매할 수 있어요.*/}
        {/*    </Text>*/}
        {/*  </>*/}
        {/*) : (status*pieceAmount > deposit && status <= max) ? (*/}
        {/*  <>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      구매하려면{' '}*/}
        {/*    </Text>*/}
        {/*    <Text size={'titleS'} color={'primary.500'}>*/}
        {/*      {comma(status*pieceAmount - deposit)}*/}
        {/*    </Text>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      {' '}*/}
        {/*      원이 더 필요해요.*/}
        {/*    </Text>*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  status !== 0 &&*/}
        {/*  status < deposit &&*/}
        {/*  status <= max*/}
        {/*) ? (*/}
        {/*  <>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      {month}개월 후{' '}*/}
        {/*    </Text>*/}
        {/*    <Text size={'titleS'} color={'primary.500'}>*/}
        {/*      {comma(Math.floor(status*pieceAmount*item.expectationProfitRate/100))}원*/}
        {/*    </Text>*/}
        {/*    <Text size={'textS'} color={'gray.600'}>*/}
        {/*      의 수익이 예상돼요.*/}
        {/*    </Text>*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  <></>*/}
        {/*)}*/}
      </Flex>
    </>
  );
};

export default TextsAboveNumberPad;
