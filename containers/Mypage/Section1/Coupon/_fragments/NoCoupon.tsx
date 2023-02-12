import React from 'react';

import { Box, Center, Flex, Text } from 'native-base'
import { Image } from 'react-native';

const NoCoupon = () => {
    return (
        <Flex
        justifyContent={'center'}
        alignItems={'center'}
        alignSelf={'center'}
        w={'100%'}
        h={'100%'}
        mt={'50%'}
        >
            <Flex alignItems={'center'}>
                <Image
                    style={{ width: 98, height: 83 }}
                    source={require('assets/images/coupon.png')}
                    />
                <Text size={'textS'} marginTop={'20px'} color={'gray.600'} textAlign={'center'}>
                    사용 가능한 쿠폰이 없어요.
                </Text>
            </Flex>
        </Flex>
    );
};

export default NoCoupon;