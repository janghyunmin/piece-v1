import React, { useEffect, useRef, useState } from 'react'

import { Box, Flex, Text } from 'native-base'
import { Animated } from 'react-native'

import { PortfolioInnerSection1Props } from 'interfaces/home.type';
import portfolioBadgeColor from 'utils/portfolioBadge';
import { convertPrice } from 'utils/convertPrice';
import { comma } from 'utils/comma';
import { formatDate } from 'utils/formatDate'
import LottieView from 'lottie-react-native'

const Section1 = (props: PortfolioInnerSection1Props) => {
  const { item, headerAnimated, amount } = props;
  // console.log('item : ' + JSON.stringify(item));
  // console.log('headerAnimated : ' + headerAnimated );
  // console.log('amount : ' + amount );

  const translateLeftAnim = useRef(new Animated.Value(0)).current;
  const [runStatus, setRunStatus] = useState<'start_pose'|'start'|'looping'|'end'>('start_pose');

  const [percent, setPercent] = useState<{ previous: number, current: number }>({
    previous: 0,
    current: 0,
  });

  useEffect(() => {
    // console.log('amount * 100 : ' + amount * 100);
    // console.log ('item.recruitmentAmount : ' + item.recruitmentAmount);
    // console.log('current : ' + Math.floor(amount * 100 / item.recruitmentAmount));
    setPercent((percent) => ({
      previous: percent.current,
      current: Math.floor(amount * 100 / item.recruitmentAmount),
    }));
  }, [amount]);




  useEffect(() => {
    if (runStatus === 'looping' || runStatus === 'end') {
      Animated.timing(translateLeftAnim, {
        toValue: percent.current,
        duration: (percent.current-percent.previous)*10,
        useNativeDriver: false,
      }).start();
      console.log('toValue : ' + percent.current);
    }
  }, [runStatus, percent]);

  useEffect(() => {
    if (item.recruitmentState !== 'PRS0101') {
      const removeTimeout = setTimeout(() => {
        runStatus === 'start_pose' && setRunStatus('start');
      }, 400);
      const removeTimeout2 = setTimeout(() => {
        setRunStatus('looping');
      }, runStatus === 'start_pose' ? 900 : 0);

      if (!['PRS0101', 'PRS0102'].includes(item.recruitmentState)) {
        const removeTimeout3 = setTimeout(() => {
          setRunStatus('end');
        }, runStatus === 'start_pose' ? 2000 : 0);
        return () => {
          clearTimeout(removeTimeout);
          clearTimeout(removeTimeout2);
          clearTimeout(removeTimeout3);
        }
      }

      return () => {
        clearTimeout(removeTimeout);
        clearTimeout(removeTimeout2);
      }
    }
  }, [item.recruitmentState]);

  return (
    <Box
      borderTopLeftRadius={headerAnimated ? 0 : '20px'}
      borderTopRightRadius={headerAnimated ? 0 : '20px'}
      zIndex={'99'}
      bgColor={'white'}
      py={'20px'}
      px={'16px'}
      mb={'10px'}
    >
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={'70px'}
      >
        <Text size={'titleL'}>판매 현황</Text>
        <Text size={'titleM'} color={'primary.500'}>
          {portfolioBadgeColor(item.recruitmentState).text}
        </Text>
      </Flex>
      <Box
        w={'100%'}
        bgColor={'white'}
        shadow={2}
        borderRadius={'10px'}
        pt={'30px'}
        pb={'15px'}
        px={'15px'}
        mb={'20px'}
        display={'flex'}
      >
        <Flex
          direction={'row'}
          alignItems={'flex-end'}
          bgColor={'gray.200'}
          borderRadius={'5px'}
          h={'10px'}
          mb={'15px'}
        >
          <Animated.View
            style={{
              width: translateLeftAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: '#10CFC9',
              borderRadius: 5,
              height: 10,
            }}
          />
          <Box
            left={'-75px'}
            bottom={'-23px'}
          >
            <LottieView
              key={runStatus}
              source={
                (runStatus === 'start_pose' || runStatus === 'start')
                  ? require('assets/lottie/run_start.json')
                  : runStatus === 'looping'
                  ? require('assets/lottie/run_looping.json')
                  : require('assets/lottie/run_end.json')
              }
              style={{ width: 150, height: 150 }}
              autoPlay={runStatus !== 'start_pose'}
              loop={runStatus === 'looping'}
            />
          </Box>
        </Flex>
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
        >
          <Box>
            <Text size={'titleS'} color={'gray.600'}>
              판매 누적 금액
            </Text>
            <Text size={'titleL'}>{comma(amount)}원</Text>
          </Box>
          <Text size={'titleXL'} color={'primary.500'}>
            {percent.current}%
          </Text>
        </Flex>
      </Box>

      <Box bgColor={'primary.50'} w={'100%'} p={'15px'} borderRadius={'10px'}>
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'10px'}
        >
          <Text size={'titleM'} color={'primary.500'}>
            총 판매 금액
          </Text>
          <Text size={'titleM'} color={'gray.700'}>
            {convertPrice(item.recruitmentAmount)}원
          </Text>
        </Flex>
        {/*{!!item.vatRate && (*/}
        {/*  <Flex*/}
        {/*    direction={'row'}*/}
        {/*    justifyContent={'space-between'}*/}
        {/*    alignItems={'center'}*/}
        {/*    mb={'10px'}*/}
        {/*  >*/}
        {/*    <Text size={'titleM'} color={'primary.500'}>*/}
        {/*      부가가치세*/}
        {/*    </Text>*/}
        {/*    <Text size={'titleM'} color={'gray.700'}>*/}
        {/*      {convertPrice(item.recruitmentAmount * item.vatRate / 100)}원*/}
        {/*    </Text>*/}
        {/*  </Flex>*/}
        {/*)}*/}
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text size={'titleM'} color={'primary.500'}>
            판매 기간
          </Text>
          <Text size={'titleM'} color={'gray.700'}>
            {`${formatDate(item.recruitmentBeginDate)} ~ ${formatDate(item.recruitmentEndDate)}`}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Section1;
