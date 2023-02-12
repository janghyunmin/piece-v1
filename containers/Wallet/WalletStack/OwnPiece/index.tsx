import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import {
  Box,
  Button, Center,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { Animated, Dimensions, Image } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import CardDetail from 'containers/Wallet/_fragments/CardDetail';

import { LinearGradient } from 'expo-linear-gradient';
import ArrowPrimaryIcon from 'components/Icons/ArrowPrimaryIcon';
import QuestionPrimaryIcon from 'components/Icons/QuestionPrimaryIcon';
import { useQuery } from 'react-query';
import { getPurchase } from 'apis/Purchase';
import OwnInfoItem from 'containers/Wallet/WalletStack/OwnPiece/_fragments/OwnInfoItem'
import { comma } from 'utils/comma'
import PurchaseInfoItem from 'containers/Wallet/WalletStack/OwnPiece/_fragments/PurchaseInfoItem'
import { convertPrice } from 'utils/convertPrice'
import useMemberQuery from 'hooks/useMemberQuery'

const windowWidth = Dimensions.get('window').width;
const cardHeight = windowWidth - 32;
const cardWidth = cardHeight * 0.67;
const top = (cardHeight - cardWidth) / 2;

const OwnPiece = ({ navigation, route }: any) => {
  const { item } = route.params;
  const height = 500;
  const buttonHeight = 50;
  const headerHeight = -50;

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(height)).current; // Initial value for opacity: 0
  const buttonTranslateYAnim = useRef(new Animated.Value(buttonHeight)).current; // Initial value for opacity: 0
  const goBackOpacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const headerOpacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const headerTranslateYAnim = useRef(new Animated.Value(headerHeight)).current; // Initial value for opacity: 0
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const [preventBack, setPreventBack] = useState<boolean>(false);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const { data: memberData } = useMemberQuery();

  useEffect(() => {
    if (route.params?.isCanceled) {
      navigation.removeListener('beforeRemove');
      navigation.goBack();
    }
  }, [route.params]);


  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 400,
      delay: 600,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
    }).start();
    Animated.timing(headerOpacityAnim, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
    }).start();
    Animated.timing(headerTranslateYAnim, {
      toValue: 0,
      duration: 400,
      delay: 600,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonTranslateYAnim, {
      toValue: 0,
      duration: 400,
      delay: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonOpacityAnim, {
      toValue: 1,
      duration: 600,
      delay: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(goBackOpacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(
    () => {
      navigation.addListener('beforeRemove', (e: any) => {
        setPreventBack(true);
        e.preventDefault();
        Animated.timing(translateYAnim, {
          toValue: 500,
          duration: 400,
          delay: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800,
          delay: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(headerOpacityAnim, {
          toValue: 0,
          duration: 300,
          // delay: 500,
          useNativeDriver: true,
        }).start();
        Animated.timing(headerTranslateYAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(buttonTranslateYAnim, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(buttonOpacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(goBackOpacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          navigation.dispatch(e.data.action);
          const removeTimeout = setTimeout(() => {
            setPreventBack(false);
          }, 400);
          return () => clearTimeout(removeTimeout);
        });
      })
    },
    [navigation]
  );

  const [activeProduct, setActiveProduct] = useState(0);
  const { data: purchaseData } = useQuery(
    ['Purchase', item.purchaseId],
    async () => getPurchase(item.purchaseId),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Purchase', item.purchaseId] });
      },
      cacheTime: 0,
    },
  );

  const isRetraction = useMemo(() => {
    if (purchaseData?.recruitmentEndDate) {
      return new Date(purchaseData.recruitmentEndDate+'+09:00') > new Date();
    }
    return true;
  }, [purchaseData])

  // const [isCoupon , setIsCoupon] = useState('');
  // useEffect(() => {
  //   console.log('isCoupon1231232 : ' + isCoupon);
  //   setIsCoupon(purchaseData?.isCoupon);
  // })

  // const isCoupone = useMemo(() => {
  //   console.log('purchaseData.isCoupon : '+purchaseData.isCoupon);
  //   if(purchaseData?.isCoupon === 'Y') {
  //     setIsCoupon('Y');
  //   }else {
  //     setIsCoupon('N');
  //   }
  // },[purchaseData])

  const getDate = useCallback((date: string) => {
    const tempDate = new Date(date+'Z');
    return `${tempDate.getUTCFullYear()}년 ${tempDate.getUTCMonth()+1}월 ${tempDate.getUTCDate()}일`;
  }, [])

  return (
    <Layout>
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ translateY: headerTranslateYAnim }],
            zIndex: 99,
          }}
        >
          <GoBack
            navigation={navigation}
            title={'소유 조각'}
            preventBack={preventBack}
          />
        </Animated.View>

        <Flex alignItems={'center'} top={-top} h={cardWidth}>
          <Animated.View
            style={{
              transform: [{ rotate: rotate }],
            }}
          >
            <SharedElement id={`purchase.${item.purchaseId}.image`}>
              <CardDetail item={item} rotate />
            </SharedElement>
          </Animated.View>
        </Flex>

        {!isRetraction && (
          <Animated.View
            style={{
              opacity: buttonOpacityAnim,
              transform: [{ translateY: buttonTranslateYAnim }],
            }}
          >
            <Flex
              mt={'10px'}
              px={'16px'}
              direction={'row'}
              alignItems={'center'}
            >
              <Pressable
                onPress={() => navigation.navigate('aboutCancelPurchase')}
              >
                <QuestionPrimaryIcon />
              </Pressable>
              <Text size={'titleS'} color={'primary.500'} ml={'4px'}>
                구매 취소는 판매종료 후 7일 이내에만 할 수 있습니다.
              </Text>
            </Flex>
          </Animated.View>
        )}

        {purchaseData && (
          <Animated.View
            style={{
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }],
            }}
          >
            {/*소유 정보*/}
            <Box px={'16px'} mt={'60px'} mb={'40px'}>
              <Text size={'titleL'} mb={'30px'}>
                소유 정보
              </Text>
              <VStack space={'20px'}>
                <OwnInfoItem
                  title={'구매 일자'}
                  body={getDate(purchaseData.purchaseAt)}
                  image={require('assets/images/own_piece_2.png')}
                />
                <OwnInfoItem
                  title={'조각 수'}
                  body={`${comma(purchaseData.purchasePieceVolume)} 피스`}
                  image={require('assets/images/own_piece_3.png')}
                />
                <OwnInfoItem
                  title={'총 구매 금액'}
                  body={`${convertPrice(purchaseData.purchaseTotalAmount)} 원`}
                  image={require('assets/images/own_piece_5.png')}
                />
                <OwnInfoItem
                  title={'소유주'}
                  body={memberData?.name}
                  image={require('assets/images/own_piece_6.png')}
                />
              </VStack>
            </Box>

            {/* 소유증서 */}
            <Box px={'16px'} mb={'40px'}>
              <Text size={'titleL'} mb={'20px'}>
                소유 증서
              </Text>

              <Button
                onPress={() => navigation.navigate('ownDeed', { purchaseData })}
                bgColor={'white'}
                shadow={2}
                borderWidth={'1px'}
                borderColor={'primary.500'}
                h={'65px'}
                borderRadius={'10px'}
              >
                <Flex
                  w={windowWidth - 64}
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Text size={'titleM'} color={'primary.500'}>
                    {purchaseData.title}
                  </Text>
                  {/* <Image
                    source={require('assets/images/icons/primary_arrow.png')}
                    style={{ width: 24, height: 24 }}
                  /> */}
                  <ArrowPrimaryIcon />
                </Flex>
              </Button>
            </Box>

            {/* 증빙자료 */}
            {!!purchaseData.products.length && (
              <Box>
                <Box px={'16px'}>
                  <Text size={'titleL'} mb={'20px'}>
                    증빙 자료
                  </Text>
                </Box>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  mb={'20px'}
                >
                  <HStack px={'16px'}>
                    {purchaseData.products.map((product: any, i: number) => (
                      <Pressable onPress={() => setActiveProduct(i)} key={i}>
                        <Center
                          bgColor={activeProduct === i ? 'primary.500' : 'gray.200'}
                          py={'5px'}
                          px={'15px'}
                          borderRadius={'15px'}
                          mr={purchaseData.products -1 === i ? '32px' : '5px'}
                        >
                          <Text
                            size={'buttonS'}
                            color={activeProduct === i ? 'white' : 'gray.500'}
                          >
                            {product.title}
                          </Text>
                        </Center>
                      </Pressable>
                    ))}
                  </HStack>
                </ScrollView>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  mb={'40px'}
                >
                  <HStack px={'16px'} space={'13px'}>
                    {purchaseData.products?.[activeProduct]?.documents.map((document: any) => (
                      <Flex key={document.documentId} alignItems={'center'}>
                        <Pressable
                          onPress={() => {
                            if (document.documentImagePath) {
                              navigation.navigate('fullSizeImage', { uri: document.documentImagePath })
                            }
                          }}
                        >
                          <Image
                            key={document.documentId}
                            source={{ uri: document.documentImagePath }}
                            style={{
                              width: 76,
                              height: 76,
                              marginBottom: 5,
                              borderRadius: 10,
                            }}
                          />
                        </Pressable>
                        <Text>{document.documentName}</Text>
                      </Flex>
                    ))}
                  </HStack>
                </ScrollView>
              </Box>
            )}

            {/* 구매정보 */}
            <Box px={'16px'} mb={'40px'}>
              <Text size={'titleL'} mb={'20px'}>
                구매 정보
              </Text>

              <Box mb={'80px'}>
                <VStack
                  space={'15px'}
                  shadow={2}
                  borderRadius={'10px'}
                  bgColor={'white'}
                  py={'15px'}
                  px={'16px'}
                >
                  <PurchaseInfoItem title={'컬렉션'} body={purchaseData.title} />
                  <PurchaseInfoItem title={'구성자산'} body={purchaseData.products.map((product: any) => (
                    `· ${product.title}`
                    // `· ${product.author} - ${product.title}(${product.productionYear})`
                  )).join('\n')} />
                  <PurchaseInfoItem title={'자산가치'} body={`${convertPrice(purchaseData.recruitmentAmount)}원`} />
                  <PurchaseInfoItem
                    title={'구매가능금액'}
                    body={function () {
                      return `최소 ${convertPrice(purchaseData.minPurchaseAmount)}원 ~ 최대 ${convertPrice(purchaseData.maxPurchaseAmount)}원`;
                    }()}
                    subBody={function () {
                      let pieceAmount = purchaseData.recruitmentAmount / purchaseData.totalPieceVolume;
                      let min = purchaseData.minPurchaseAmount/pieceAmount;
                      let max  = purchaseData.maxPurchaseAmount/pieceAmount;
                      return `최소 ${comma(min)}피스 ~ 최대 ${comma(max)}피스`;
                    }()}
                  />
                  <PurchaseInfoItem
                    title={'구매단위'}
                    body={`조각 당 ${comma(purchaseData.recruitmentAmount/purchaseData.totalPieceVolume)}원`}
                  />
                  <PurchaseInfoItem title={'만기일'} body={getDate(purchaseData.dividendsExpecatationDate)} />
                </VStack>
              </Box>
            </Box>
          </Animated.View>
        )}
      </ScrollView>
      <LinearGradient
        style={{
          position: 'absolute',
          bottom: 0,
          height: 150,
          width: '100%',
        }}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0.1, 0.4583]}
        colors={['#ffffff00', '#ffffff']}
      >
        <Animated.View
          style={{
            opacity: buttonOpacityAnim,
            transform: [{ translateY: buttonTranslateYAnim }],
          }}
        >
          <Flex
            alignItems={'flex-end'}
            flexDirection={'row'}
            px={'16px'}
            pt={'75px'}
          >
            <HStack space={'10px'}>
              {isRetraction && (
                (purchaseData?.isCoupon === 'Y') ?
                <Flex/>
                :
                <Button
                  onPress={() => {
                    navigation.navigate('cancelPurchase', {
                      purchaseData,
                    })
                  }}
                  colorScheme="button_primary_light"
                  w={'107px'}
                  h={'48px'}
                  bgColor={'#E6F9FA'}
                  borderRadius={'10px'}
                >
                  <Text size={'buttonM'} color={'primary.500'}>
                    구매 취소
                  </Text>
                </Button>
                
              )}
              <Button
                onPress={() => navigation.navigate("Portfolio", {
                  item: {
                    portfolioId: purchaseData.portfolioId,
                    representThumbnailImagePath: item.representThumbnailImagePath,
                  },
                })}
                flex={'1'}
                // colorScheme="primary"
                bgColor={'#10CFC9'}
                h={'48px'}
                borderRadius={'10px'}
              >
                <Text size={'buttonM'} color={'white'}>
                  포트폴리오 보러 가기
                </Text>
              </Button>
            </HStack>
          </Flex>
        </Animated.View>
      </LinearGradient>
    </Layout>
  );
};

export default OwnPiece;
