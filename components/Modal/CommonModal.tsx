import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query'
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { get_member_id } from 'utils/getMemberId'
import { Box, Button, View, Input, Pressable, Image, Flex, Text, HStack } from 'native-base';
import { Platform, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CouponIcon from 'components/Icons/CouponIcon';
import EditCloseIcon from 'components/Icons/EditCloseIcon';
import Storage from '@react-native-async-storage/async-storage'
import { getCouponCode } from "apis/Coupon";

const CommonModal = ({ navigation, route }: any) => {
    const { Code } = route.params;
    const [getMessage, setMessage] = useState('');
    const [getReturnCode, setReturnCode] = useState(0);
    // console.log('Common CouponCode : ' + Code)
    // const devUrl = 'http://piece-api-dev-member-11073566-907f6b13a003.kr.lb.naverncp.com/member/coupon/';
    // const prodUrl = 'http://piece-api-member-11137154-f541a222c6e6.kr.lb.naverncp.com/member/coupon/';

    // 개발 api url 
    const devUrl_v2 = 'https://lui1qyiqx4.apigw.ntruss.com/piece-dev/v2/member/coupon/';
     // 운영 api url 
    const prodUrl_v2 = 'https://z8danh2uj7.apigw.ntruss.com/pieve-prod/v2/member/coupon/';


    const CouponController = async (Code: string) => {
        let auth = await Storage.getItem('@auth');
        let deviceId = await Storage.getItem('@deviceId');

        // console.log('---------------------- header 정보 -------------------------')
        // console.log('memberId : ' + JSON.parse(auth!)?.memberId)
        // console.log('deviceId : ' + deviceId)
        // console.log('accessToken : ' + `Bearer ${JSON.parse(auth!)?.accessToken}`)
        // console.log('refreshToken : ' + `Bearer ${JSON.parse(auth!)?.refreshToken}`)
        // console.log('---------------------- parameter 정보 ----------------------')
        // console.log('couponCode : ' + Code)
        // console.log('-----------------------------------------------------------')
        

        try {
            axios.get(`${devUrl_v2}${Code}`, {
                method: 'GET',
                headers: {
                    memberId: JSON.parse(auth!)?.memberId,
                    deviceId: deviceId!,
                    accessToken: `Bearer ${JSON.parse(auth!)?.accessToken}`
                },
                params: {
                    couponCode: Code,
                }
            })
                .then((response) => {
                    // console.log('response : '+ response.data)
                    console.log('response status : ' + response.data.status);
                    console.log('response.data : ' + JSON.stringify(response.data.data));

                    // code 200 : 성공
                    if (response.status === 200) {
                        setReturnCode(response.status);
                        setMessage(response.data.data.message);
                        navigation.navigate('CouponModal', { Code: Code, status: response.data.status, response: response.data.data.couponType })
                    }
                    // code 208 : 이미 사용된 쿠폰
                    else if (response.status === 208) {
                        setReturnCode(response.status);
                        setMessage(response.data.data.message);

                        navigation.navigate('CouponModal', { Code: Code, status: response.data.status, response: response.data.data.couponType })
                    }
                    // code 400 : 회원 정보가 일치하지 않을때
                    else if (response.status === 400) {
                        setReturnCode(response.status);
                        setMessage(response.data.message);

                        navigation.navigate('CouponModal', { Code: Code, status: response.data.status, response: response.data.data.couponType })
                    }
                    // code 404 : 사용할 수 있는 쿠폰이 없을때
                    else if (response.status === 404) {
                        setReturnCode(response.status);
                        setMessage(response.data.message);

                        navigation.navigate('CouponModal', { Code: Code, status: response.data.status, response: response.data.data.couponType })
                    }
                    // 사용 가능한 쿠폰이 아니거나 사용기한을 넘겼을때
                    else {
                        setReturnCode(response.status);
                        setMessage(response.data.message);
                        navigation.navigate('CouponModal', { Code: Code, status: response.data.status, response: response.data.data.couponType })
                    }
                })
                .catch((error) => {
                    console.log('catch ' + JSON.stringify(error.response.data)) 
                    console.log('error.response : ' + JSON.stringify(error.response.status) + ' ' + JSON.stringify(error.response.data.status) + ' ' + error.response.data ) 
                    // ex: 404
                    // ex: "NOT_FOUND"
                    // ex: 쿠폰번호가 유효하지않아요.
                    // setReturnCode(error.response.status);
                    // setMessage(error.response.data.data);

                    navigation.navigate('CouponModal', { Code: 'ERROR', status: error.response.data.status, response: error.response.data })
                })
        }
        catch (error) {
            console.log('error : ' + error)
        }
    }

    const Dismiss = () => {
        navigation.goBack();
    }

    const onClick = () => {
        Dismiss();
        CouponController(Code);
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

            <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
                <Text
                    size={'titleL'}
                    textAlign={'center'}
                    mb={'10px'}
                    color={'gray.800'}
                >
                    {'쿠폰을 바로 사용할까요?'}
                </Text>

                <Text
                    size={'couponS_'}
                    textAlign={'center'}
                    mb={'30px'}
                    color={'gray.600'}
                >
                    {'등록 완료된 쿠폰은 취소할 수 없어요.'}
                </Text>

                <HStack space={'10px'}>
                    <Button
                        flex={1}
                        onPress={() =>
                            navigation.goBack()
                        }
                        h={'48px'}
                        borderRadius={'10px'}
                        colorScheme={'button_gray'}
                    >
                        <Text size={'buttonM'} color={'white'}>
                            닫기
                        </Text>
                    </Button>


                    <Button
                        flex={1}
                        onPress={
                            onClick
                        }
                        h={'48px'}
                        borderRadius={'10px'}
                        // colorScheme={'primary'}
                        bgColor={'#10CFC9'}
                    >
                        <Text size={'buttonM'} color={'white'}>
                            사용하기
                        </Text>
                    </Button>
                </HStack>
            </Box>
        </Flex>
    );
}
export default CommonModal;
