import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query'
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { get_member_id } from 'utils/getMemberId'
import { Box, Button, Flex, HStack, Text } from 'native-base';
import { Platform, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CouponIcon from 'components/Icons/CouponIcon';
import EditCloseIcon from 'components/Icons/EditCloseIcon';
import Storage from '@react-native-async-storage/async-storage'

const CouponModal = ({ navigation, route }: any) => {
  const { Code } = route.params;

  const [getMessage, setMessage] = useState('');
  const [getReturnCode, setReturnCode] = useState(0);
  const queryClient = useQueryClient();

  let titleMsg = ''; // 쿠폰 Dialog 제목
  let resMsg = ''; // 쿠폰 Dialog 내용
  let couponType = '';

  console.log('--------------------------------')
  console.log('넘겨받은 데이터 1 : ' + JSON.stringify(route.params));
  console.log('catch 로 넘겨받은 데이터 : ' + JSON.stringify(route.params));
  console.log('--------------------------------')

  // 쿠폰함에서 코드 입력 후 모달 화면 진입시 최초 1회만 실행 
  useEffect(() => {
    console.log('useEffect start..')
    setReturnCode(route.params.status);
    setMessage(route.params.response);
  }, []);

  if (route.params.response.data === null) {
    console.log('여기 catch')
    couponType = 'ERROR'
    titleMsg = '쿠폰 사용 오류'
    resMsg = route.params.response.message
  } else {
    // 쿠폰 잘못 입력했을떄 
    if (route.params.status === 'NOT_FOUND' || route.params.response.status === 'NOT_FOUND') {
      console.log('route.params.response.data.couponType : ' + route.params.response.data.couponType)
      console.log('쿠폰번호 잘못 입력함')
      couponType = 'ERROR'
      titleMsg = '쿠폰 사용 오류'
      resMsg = route.params.response.message
    }
    // 정상 쿠폰으로 입력했을때 
    else if (route.params.status === 'OK' || route.params.response.status === 'OK') {
      console.log('쿠폰 정상 기입 완료')

      console.log('타입 : '+route.params.couponType)
      if (route.params.response === 'CPT0101') {
        couponType = 'CPT0101'
        titleMsg = '포인트 지급 완료'
        resMsg = '포인트 지급이 완료 되었어요.'
      }
      else if (route.params.response === 'CPT0102') {
        couponType = 'CPT0102'
        titleMsg = '포인트 지급 완료'
        resMsg = '포인트 지급이 완료 되었어요.'
      }
      else if (route.params.response === 'CPT0103') {
        couponType = 'CPT0103'
        titleMsg = '쿠폰 사용 완료'
        resMsg = '교환된 조각은 내지갑에서 확인 할 수 있어요.'
      }
      else if (route.params.response === 'CPT0104') {
        couponType = 'CPT0104'
        titleMsg = '쿠폰 사용 완료'
        resMsg = '교환된 조각은 내지갑에서 확인 할 수 있어요.'
      }
      else if (route.params.response === 'CPT0105') {
        console.log('여기 105 임')
        couponType = 'CPT0105'
        titleMsg = '이벤트 참여 완료'
        resMsg = '이벤트 참여가 정상적으로 되었어요.'
      }
      else if (route.params.response === 'CPT0106') {
        couponType = 'CPT0106'
        titleMsg = '쿠폰 사용 완료'
        resMsg = '쿠폰이 정상적으로 등록 되었어요.'
      }
      else if (route.params.response === 'CPT0107') {
        couponType = 'CPT0107'
        titleMsg = '쿠폰 사용 오류'
        resMsg = '정상적인 쿠폰 사용이 아닙니다.'
      }
      else {
        couponType = 'ERROR'
        resMsg = route.params.response.message
      }
    }
    // 이미 사용된 쿠폰번호를 입력했을때
    else if (route.params.status === 'ALREADY_REPORTED' || route.params.response.status === 'ALREADY_REPORTED') {
      couponType = 'ERROR'
      console.log('이미 사용된 쿠폰')
      titleMsg = '쿠폰 사용 오류'
      resMsg = '이미 사용된 쿠폰입니다.'
    }
    else if (route.params.Code === 'ERROR') {
      console.log('ERROR 로 들어옴')
      couponType = 'ERROR'
      titleMsg = '쿠폰 사용 오류'
      resMsg = route.params.response.message
    }

  }
  return (
    <Flex
      position={'absolute'}
      zIndex={'999'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      flex={1}
      w={'100%'}
      justifyContent={'center'}
      px={'16px'}
    >

      {couponType === 'CPT0103' || couponType === 'CPT0104' ?
        <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
          <Text
            size={'titleL'}
            textAlign={'center'}
            mb={'10px'}
            color={'gray.800'}
          >
            {titleMsg}
          </Text>

          <Text
            size={'couponS_'}
            textAlign={'center'}
            mb={'30px'}
            color={'gray.600'}
          >
            {resMsg}
          </Text>

          <HStack space={'10px'}>
            <Button
              flex={1}
              onPress={() =>
                navigation.goBack()
              }
              h={'48px'}
              borderRadius={'10px'}
              colorScheme={'#EAECF0'}
            >
              <Text size={'buttonM'} color={'white'}>
                닫기
              </Text>
            </Button>


            <Button
              flex={1}
              onPress={() => {
                navigation.navigate('wallet')
                queryClient.invalidateQueries(['Deposit']);
                queryClient.invalidateQueries(['Account']);
                queryClient.invalidateQueries(['Purchases', 'PUS0102']);
              }
              }
              h={'48px'}
              borderRadius={'10px'}
              // colorScheme={'primary'}
              bgColor={'#10CFC9'}
            >
              <Text size={'buttonM'} color={'white'}>
                내지갑 바로가기
              </Text>
            </Button>
          </HStack>
        </Box>

        :

        // 포인트 지급 완료
        (couponType === 'CPT0101' || couponType === 'CPT0102') ?
          <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
            <Text
              size={'titleL'}
              textAlign={'center'}
              mb={'10px'}
              color={'gray.800'}
            >
              {titleMsg}
            </Text>

            <Text
              size={'couponS_'}
              textAlign={'center'}
              mb={'30px'}
              color={'gray.600'}
            >
              {resMsg}
            </Text>


            <HStack space={'10px'}>
              <Button
                flex={1}
                onPress={() =>
                  navigation.goBack()
                }
                h={'48px'}
                borderRadius={'10px'}
                // colorScheme={'primary'}
                bgColor={'#10CFC9'}

              >
                <Text size={'buttonM'} color={'white'}>
                  확인
                </Text>
              </Button>
            </HStack>
          </Box>

          :
          // 이벤트 참여 완료
          (couponType === 'CPT0105') ?
            <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
              <Text
                size={'titleL'}
                textAlign={'center'}
                mb={'10px'}
                color={'gray.800'}
              >
                {titleMsg}
              </Text>

              <Text
                size={'couponS_'}
                textAlign={'center'}
                mb={'30px'}
                color={'gray.600'}
              >
                {resMsg}
              </Text>


              <HStack space={'10px'}>
                <Button
                  flex={1}
                  onPress={() =>
                    navigation.goBack()
                  }
                  h={'48px'}
                  borderRadius={'10px'}
                  // colorScheme={'primary'}
                  bgColor={'#10CFC9'}

                >
                  <Text size={'buttonM'} color={'white'}>
                    확인
                  </Text>
                </Button>
              </HStack>
            </Box>


            :
            //쿠폰 사용 완료 - 정상 등록
            (couponType === 'CPT0106') ?
              <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
                <Text
                  size={'titleL'}
                  textAlign={'center'}
                  mb={'10px'}
                  color={'gray.800'}
                >
                  {titleMsg}
                </Text>

                <Text
                  size={'couponS_'}
                  textAlign={'center'}
                  mb={'30px'}
                  color={'gray.600'}
                >
                  {resMsg}
                </Text>


                <HStack space={'10px'}>
                  <Button
                    flex={1}
                    onPress={() =>
                      navigation.goBack()
                    }
                    h={'48px'}
                    borderRadius={'10px'}
                    // colorScheme={'primary'}
                    bgColor={'#10CFC9'}

                  >
                    <Text size={'buttonM'} color={'white'}>
                      확인
                    </Text>
                  </Button>
                </HStack>
              </Box>

              :
             
              (couponType === 'ERROR') ?
                <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
                  <Text
                    size={'titleL'}
                    textAlign={'center'}
                    mb={'10px'}
                    color={'gray.800'}
                  >
                    {titleMsg}
                  </Text>

                  <Text
                    size={'couponS_'}
                    textAlign={'center'}
                    mb={'30px'}
                    color={'gray.600'}
                  >
                    {resMsg}
                  </Text>


                  <HStack space={'10px'}>
                    <Button
                      flex={1}
                      onPress={() =>
                        navigation.goBack()
                      }
                      h={'48px'}
                      borderRadius={'10px'}
                      // colorScheme={'primary'}
                      bgColor={'#10CFC9'}

                    >
                      <Text size={'buttonM'} color={'white'}>
                        확인
                      </Text>
                    </Button>
                  </HStack>
                </Box>

                :
                // 관리자에게 문의
                <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
                  <Text
                    size={'titleL'}
                    textAlign={'center'}
                    mb={'10px'}
                    color={'gray.800'}
                  >
                    {titleMsg}
                  </Text>

                  <Text
                    size={'couponS_'}
                    textAlign={'center'}
                    mb={'30px'}
                    color={'gray.600'}
                  >
                    {resMsg}
                  </Text>


                  <HStack space={'10px'}>
                    <Button
                      flex={1}
                      onPress={() =>
                        navigation.goBack()
                      }
                      h={'48px'}
                      borderRadius={'10px'}
                      // colorScheme={'primary'}
                      bgColor={'#10CFC9'}

                    >
                      <Text size={'buttonM'} color={'white'}>
                        확인
                      </Text>
                    </Button>
                  </HStack>
                </Box>

      }

    </Flex>
  );
}
export default CouponModal;
