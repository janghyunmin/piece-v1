import React, { useState, useEffect } from 'react';
import { Button, View, Input, Pressable, Image, Flex, Text } from 'native-base';
import { Platform, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Title from "./_fragments/Title";
import CouponIcon from 'components/Icons/CouponIcon';
import EditCloseIcon from 'components/Icons/EditCloseIcon';


const Coupon = ({ navigation }: any) => {

  const screenHeight = Dimensions.get('screen').height;
  const windowHeight = Dimensions.get('window').height;
  const navbarHeight = screenHeight - windowHeight + getStatusBarHeight();
  const [CouponCode, setCouponCode] = useState('');
  const [getMessage, setMessage] = useState('');
  const [getReturnCode, setReturnCode] = useState(0);
  console.log('CouponCode : ' + CouponCode)



  // 모달 => 쿠폰함 재진입시 Input Clear 
  useEffect(() => {
    const deleteCode = navigation.addListener('focus', () => {
      setCouponCode('');
    });
    return deleteCode;
  }, [navigation]);



  {/* Shadow & Style CSS start  */ }
  const styles = StyleSheet.create({
    container: {
      ...Platform.select({
        ios: {
          height: screenHeight,
          backgroundColor: '#ffffff'
        },
        android: {
          height: screenHeight,
          backgroundColor: '#ffffff'
        },
      })
    },

    // Top layout CSS
    top_layout: {
      ...Platform.select({
        ios: {
          marginTop: 33,
          zIndex: 998,
        },
        android: {
          marginTop: 33,
          zIndex: 998
        },
      }),
    },

    // Bottom layout CSS
    bottom_layout: {
      ...Platform.select({
        ios: {
          flex: 1,
          marginTop: 20,
        },
        android: {
          flex: 1,
          marginTop: 20,
        },
      }),
    },

    noitem_layout: {
      ...Platform.select({
        ios: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#F2F3F4',
          height: '100%'
        },
        android: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#F2F3F4',
          height: '100%'
        },
      }),
    },

    top_layout_shadow: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.41,
          elevation: 1,
        },
        android: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.41,
          elevation: 3,

        },
      }),
    },

    input: {
      backgroundColor: "#ffffff",
      color: "black"
    }
  });
  {/* Shadow & Style CSS end  */ }

  return (
    // 부모 layout start

      <View style={styles.container}>

        <View style={[styles.top_layout]}>

          <Title navigation={navigation} />

          <View
            mt={'48px'}
            ml={'19px'}
            flexDirection="row"
          >

            <View flex={2} height={'46px'} >

              <Input
                style={styles.input}
                borderWidth={'1px'}
                //borderColor={'gray.300'}
                pl={'9px'}
                placeholder={'프로모션 코드를 입력해 주세요'}
                fontSize={'14px'}
                borderRadius={'10px'}
                h={'46px'}
                lineHeight={'18px'}
                textAlign={'left'}
                textAlignVertical={'center'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                keyboardType={'email-address'}
                multiline={false}
                maxLength={23}
                type='text'
                pr={'40px'}
                onSubmitEditing={Keyboard.dismiss}
                value={CouponCode}
                onChangeText={(text: string) => setCouponCode(text)}
              />
            </View>

            <View
              zIndex={'999'}
              position={'absolute'}
              right={'37%'}
              top={'14px'}
              height={'46px'}
            >
              {CouponCode.length > 0 && (
                <Pressable
                  onPress={() =>
                    setCouponCode('')
                  }
                >
                  <EditCloseIcon />
                </Pressable>
              )}
            </View>

            <View flex={1} alignItems={'flex-end'} >

              <Button
                borderRadius={'10px'}
                w={'90px'}
                h={'46px'}
                mr={'19px'}
                justifyContent={'center'}
                alignItems={'center'}
                bg={CouponCode === '' ? '#EAECF0' : '#10CFC9'}
                disabled={!CouponCode}
                onPress={CouponCode === '' ?
                  () => { } :
                  () =>
                  //  CouponController(CouponCode)
                  // navigation.navigate('CouponModal', { Code: CouponCode })
                  navigation.navigate('CommonModal' , { Code : CouponCode })
                }
              >
                <Text color={'white'} size={'buttonS'}>
                  등록하기
                </Text>
              </Button>

            </View>
          </View>

          <View
            ml={'19px'}
            mt={'20px'}
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
          >
            <CouponIcon />

            <Text
              size={'textS'}
              color={'gray.700'}
              ml={'6px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              나의 보유 쿠폰
            </Text>
            <Text
              alignItems={'center'}
              justifyContent={'flex-start'}
              size={'couponC_T'}
              color={'gray.900'}
              ml={'6px'}
            >
              {0}
            </Text>
            <Text
              size={'textS'}
              color={'gray.700'}
              ml={'6px'}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              장
            </Text>


            <View flex={1} alignItems={'flex-end'} >
              <Text
                alignItems={'flex-end'}
                justifyContent={'flex-end'}
                mr={Platform.OS === 'ios' ? '19px' : '19px'}
                size={'couponS'}
                color={'gray.600'}
                onPress={() => navigation.navigate('CouponAlert')}
              >
                사용 시 유의사항
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.bottom_layout]}>
          <View style={[styles.top_layout_shadow]}
            alignItems={'flex-end'}
            zIndex={999}
            h={'1px'}
          >
          </View>

          <View
            style={[styles.noitem_layout]}>

            <View
              justifyContent={'center'}
              alignItems={'center'}

              top={Platform.OS === 'ios' ? '-50%' : '-45%'}>
              {/* <NoCoupon /> */}
              <Image
                w={'142px'}
                h={'120px'}
                source={require('assets/images/c_nocoupon_icon.png')}
                alt='nocoupon'
              />
            </View>

          </View>
        </View>
      </View>
  );
};

export default Coupon;
