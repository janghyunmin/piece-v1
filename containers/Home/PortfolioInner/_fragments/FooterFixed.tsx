import React, { useEffect, useRef, useCallback , useState} from 'react'
import LottieView from 'lottie-react-native';

import { Box, Button, Flex, Pressable, Text } from 'native-base';
import { Image, Animated, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { formatDateOpenPortfolio } from 'utils/formatDate'
import Storage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const bottomSpace = getBottomSpace();

const FooterFixed = (props: any) => {
  const {
    item,
    navigation,
    isAlarm,
    portfolioNotification,
    timer,
    updateAlarm,
    updateAlarmIsLoading,
  } = props;
  const height = Platform.OS === 'ios' ? 120 : 90;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const translateYAnim = useRef(new Animated.Value(height)).current; // Initial value for opacity: 0

  const getRemainingTime = useCallback((time) => {
    const hours = String(parseInt(String(time/3600))).padStart(2, '0');
    const minutes = String(parseInt(String((time%3600)/60))).padStart(2, '0');
    const seconds = String(time%60).padStart(2, '0');
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }, []);

  /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
  const [isSelect, setSelect] = useState<boolean>(false);
  const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
  };

  useEffect(() => {
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 600,
      // delay: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (isAlarm === false) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isAlarm])

  const hideAlarmInfo = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      // delay: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {item.recruitmentState === 'PRS0101' && (
        <Pressable
          onPress={hideAlarmInfo}
          px={'16px'}
          zIndex={'99999'}
          bottom={`${bottomSpace + 60}px`}
          position={'absolute'}
        >
          <Animated.View
            style={{
              zIndex: 99,
              opacity: fadeAnim,
              // bottom: Platform.OS === 'ios' ? bottomHeight + 30 : 30,
            }}
          >
            <Image
              style={{ width: 298, height: 58 }}
              source={require('assets/images/portfolio_inner_alarm_text.png')}
            />
          </Animated.View>
        </Pressable>
      )}

      <LinearGradient
        style={{
          position: 'absolute',
          bottom: 30,
          height: height,
          width: '100%',
        }}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0.1, 0.4583]}
        colors={['#ffffff00', '#ffffff']}
      >
        <Animated.View
          style={{
            transform: [{ translateY: translateYAnim }],
            zIndex: 99,
          }}
        >
          <Flex
            w={'100%'}
            direction={'row'}
            px={'16px'}
            h={'118px'}
            // bgColor={'red.100'}
            alignItems={'flex-end'}
            pb={Platform.OS === 'ios' ? '0' : '30px'}
            zIndex={'99'}
          >
            {item.recruitmentState === 'PRS0101' ? (
              <>
                <Pressable
                  onPress={async () => {
                    const isLogin = await Storage.getItem('@isLogin');
                    const isUser = await Storage.getItem('@auth');
                    if (isLogin === 'false' || !isUser) {
                      return navigation.navigate('LoginRedirect', { isUser });
                    }
                    if (!portfolioNotification || portfolioNotification === 'N') {
                      return navigation.navigate('MyPageAlarm');
                    }
                    if (!updateAlarmIsLoading) {
                      if (isAlarm) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      else Haptics.notificationAsync();
                      updateAlarm();
                      hideAlarmInfo();
                    }
                  }}
                  w={'50px'}
                  h={'48px'}
                  mr={'10px'}
                >
                  {isAlarm ? (
                    <Image
                      key={'subscribe_active'}
                      source={require('assets/images/subscribe_active.png')}
                      style={{
                        width: 50,
                        height: 48,
                      }}
                    />
                  ) : (
                    <Box
                      borderRadius={'10px'}
                      borderWidth={1}
                      borderColor={'#EAECF0'}
                    >
                      <LottieView
                        key={'alarm_set'}
                        source={require('assets/lottie/alarm_set.json')}
                        autoPlay
                        style={{
                          width: 50,
                          height: 48,
                        }}
                        loop={true}
                      />
                  </Box>
                  )}
                </Pressable>
                <Button
                  flex={'1'}
                  bgColor={'secondary.800'}
                  h={'48px'}
                  borderRadius={'10px'}
                >
                  <Text size={'buttonM'} color={'white'}>
                    {timer < 24*60*60 ? (
                      `${getRemainingTime(timer)} 후에 오픈`
                    ) : (
                      `${formatDateOpenPortfolio(item.recruitmentBeginDate)} 오픈예정`
                    )}
                  </Text>
                </Button>
              </>
            ) : item.recruitmentState === 'PRS0102' ? (
              <Button
                onPress={async () => {
                  let tempSelect = isSelect;
                  tempSelect = !tempSelect;
                  onPressed();
                  setSelect(tempSelect);

                  const isLogin = await Storage.getItem('@isLogin');
                  const isUser = await Storage.getItem('@auth');
                  if (isLogin === 'false' || !isUser) {
                    StatusBar.setBarStyle('dark-content');
                    navigation.navigate('LoginRedirect', { isUser });
                  } else {
                    StatusBar.setBarStyle('dark-content');
                    navigation.navigate('buy', {
                      screen: 'buyPortfolio',
                      params: { item },
                    });
                  }
                }
              }
                style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]}
                 bgColor={'#10CFC9'}
                 w={'100%'}
                 h={'48px'}
                 borderRadius={'10px'}
              >
                <Text color={'white'} size={'buttonM'}>
                  구매하기
                </Text>
              </Button>
            ) : (
              <Button
                w={'100%'}
                h={'48px'}
                borderRadius={'10px'}
                isDisabled={true}
              >
                <Text color={'white'} size={'buttonM'}>
                  모두 판매되었어요
                </Text>
              </Button>
            )}
          </Flex>
        </Animated.View>
      </LinearGradient>
    </>
  );
};

export default FooterFixed;
