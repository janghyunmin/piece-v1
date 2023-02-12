import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Button, Flex, HStack, Image, ScrollView, Text, ZStack } from 'native-base'
import { Text as RnText, Image as RnImage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import GoBack from 'components/GoBack';
import Layout from 'components/Layout';

import useMemberQuery from 'hooks/useMemberQuery';
import PageLoading from 'components/PageLoading';
import useNextNavigate from 'hooks/useNextNavigate';
import { comma } from 'utils/comma'

const OwnDeed = ({ navigation, route }: any) => {
  const { data: memberData, isLoading } = useMemberQuery();
  const { purchaseData } = route.params;
  useNextNavigate(navigation, route.params?.next);

  const openModal = (type: string) => {
    const params = {
      type,
      memberId: memberData.memberId,
      purchaseData: purchaseData,
    }
    if (type === 'post') {
      if (!memberData.baseAddress) {
        navigation.navigate('haveNoInfo', params);
      } else {
        navigation.navigate('haveInfo', params);
      }
    }
    if (type === 'email') {
      if (!memberData.email) {
        navigation.navigate('haveNoInfo', params);
      } else {
        navigation.navigate('haveInfo', params);
      }
    }
  };

  const getDate = useCallback((date: string) => {
    const tempDate = new Date(date + 'Z');
    return `${tempDate.getUTCFullYear()}년 ${tempDate.getUTCMonth()+1}월 ${tempDate.getUTCDate()}일`;
  }, [])

  const [ratio, setRatio] = useState<number>(0);
  useEffect(() => {
    if (purchaseData?.representThumbnailImagePath) {
      RnImage.getSize(
        purchaseData.representThumbnailImagePath,
        (width: number, height: number) => {
          setRatio(width/height);
        },
      );
    }
  }, [purchaseData?.representThumbnailImagePath])

  return (
    <Layout bottomTab>
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <ScrollView
            scrollIndicatorInsets={{ top: 1, bottom: 1 }}
            contentInsetAdjustmentBehavior={'always'}
          >
            <GoBack navigation={navigation} title={'소유 증서'} />
            <Box mt={'20px'} px={'16px'} mb={'100px'}>
              <Text size={'titleL'}>자산 구매 및 업무 위탁 계약서</Text>
              <Text size={'textM'} color={'gray.600'} mb={'20px'}>
                (분할 소유권 확인 증서)
              </Text>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <RnText
                  style={{
                    fontFamily: 'Pretendard_Regular',
                    fontSize: 16,
                    lineHeight: 25,
                    color: '#8C919F',
                  }}
                  allowFontScaling={false}
                >
                  <RnText style={{ fontFamily: 'Pretendard_Bold' }} allowFontScaling={false}>{memberData.name}</RnText>{' '}
                  (이하 “갑", 생년월일 {memberData.birthDay.replace(/-/gi, '').substr(2)})과 (주)바이셀스탠다드
                  (이하 “을", 법인등록번호 110111 - 7035606)는 다음과 같이 특정
                  자산에 대한 소유권 지분 매매 및 업무 위탁 계약을 체결한다.
                </RnText>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제 1조
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  본 계약은 갑이 을로부터 특정 자산의 분할 소유권을 구매함에 있어 첫째, 갑이 특정 자산(이하 "자산")의 분할 소유권을 취득하게 되고, 둘째, 을이 갑이 취득한 분할 소유권에 대한 업무 위탁 계약에 따른 권리 관계 및 자산 매각에 따른 이익/손실 분배 등에 대한 사항을 규정하기 위하여 작성한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제 2조 (당사자)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 갑은 본 계약에 대한 당사자로서 구매 대금 지급에 따라 갑이 자산에 대한 분할소유권을 취득하게 된다. 갑이 미성년자인 경우에는 법정대리인의 묵시적 처분허락이 있는 것으로 본다.{'\n'}
                  ② 을은 본 계약의 대상이 되는 자산에 대하여 완전한 소유권을 취득하고 이에 대한 정당한 매매 권한이 있음을 보증한다. 만약 을이 자산에 대한 처분 권한이 없거나 자산이 위조품인 경우에는 본 계약은 해제되고 을은 갑이 지급한 금액의 2배의 금액을 손해배상(구매 대금 반환을 포함)하기로 한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제3조 (구매 대상 및 대금 지급)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 본 계약을 통하여 갑이 취득하는 자산에 대한 분할 소유권은 다음과 같다.
                </Text>
                <Flex
                  my={'10px'}
                  borderColor={'gray.600'}
                  borderTopWidth={'1px'}
                  borderBottomWidth={'1px'}
                >
                  <Flex
                    direction={'row'}
                    borderColor={'gray.400'}
                    borderBottomWidth={'1px'}
                  >
                    <Box flex={1} alignItems={'center'}>
                      <Text color={'gray.600'}>구매 대상</Text>
                    </Box>
                    <Box flex={3}>
                      <Text color={'gray.600'}>
                        {purchaseData.title}
                        {!!purchaseData.products.length && (
                          <>
                            {' '}
                            ({purchaseData.products.map((product: any) => product.title).join(', ')})
                          </>
                        )}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    direction={'row'}
                    borderColor={'gray.400'}
                    borderBottomWidth={'1px'}
                  >
                    <Box flex={1} alignItems={'center'}>
                      <Text color={'gray.600'}>구매 수량</Text>
                    </Box>
                    <Box flex={3}>
                      <Text color={'gray.600'}>
                        {comma(purchaseData.purchasePieceVolume)} / {comma(purchaseData.totalPieceVolume)}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    direction={'row'}
                    borderColor={'gray.400'}
                    borderBottomWidth={'1px'}
                  >
                    <Box flex={1} alignItems={'center'}>
                      <Text color={'gray.600'}>구매 대금</Text>
                    </Box>
                    <Box flex={3}>
                      <Text color={'gray.600'}>
                        {comma(purchaseData.purchaseTotalAmount)}원 / {comma(purchaseData.recruitmentAmount)}원
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    direction={'row'}
                    borderColor={'gray.400'}
                    borderBottomWidth={'1px'}
                  >
                    <Box flex={1} alignItems={'center'}>
                      <Text color={'gray.600'}>구매 확인</Text>
                    </Box>
                    <Box flex={3}>
                      <Text color={'gray.600'}>
                        {purchaseData.title}에 대한 분할 소유권 {comma(purchaseData.purchasePieceVolume)}개 구매
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
                <Flex mb={'10px'}>
                  <Image
                    key={purchaseData.purchaseId}
                    source={{ uri: purchaseData.representThumbnailImagePath }}
                    w={100*ratio}
                    h={100}
                    alt={'portfolio'}
                  />
                </Flex>
                <Text size={'textM'} color={'gray.600'}>
                  ② 갑은 구매하려는 대상의 분할 소유권 구매와 동시에 예치금을 통하여 을에게 구매 대금을 지급해야 한다. 자산에 따라 부가가치세가 발생하는 경우에는 갑은 구매 대금과 별도로 부가가치세를 추가로 납부해야 한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제4조 (분할 소유권 취득 및 자산 관리 처분 위임의 개시)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  본 계약의 효력이 발생하는 시점부터 갑은 을이 점유하는 자산에 대한 분할 소유권을 적법하게 취득하며, 을은 본 계약 내용에 따라 갑으로부터 위임 받은 자산의 관리, 처분에 대한 사무를 처리해야 한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제5조 (분할 소유권의 처분)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 갑은 자산에 대하여 취득한 분할 소유권을 제3자에게 임의로 양도하거나 담보로 제공할 수 없으며, 분할 소유권 구매에 따른 분할소유관계는 자산 매각에 따른 이익/손실 분배 정산 완료와 동시에 해소된다. 단, 을이 제공하는 분할 소유권 매매 시스템 (PIECE Trade System)을 통해 거래되는 경우에 한하여 분할 소유권의 일부 양도가 인정된다.{'\n'}
                  ② 법률 규정에 따라 제3자가 갑의 지분을 취득하게 되는 경우에도 분할 소유권에 대한 내용과 위임 등 본 계약 사항은 제3자에게 그대로 적용된다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제6조 (계약의 목적)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 갑은 자산에 대한 관리 권한(자산의 사용, 보관, 관리, 홍보) 일체를 을에게 위임한다. 을은 '갑'의 이익을 위하여 별도의 관리 계약을 체결한 전문판매위탁사 또는 보관 업체 등에 해당 권한의 일부를 위임할 수 있다.{'\n'}
                  ② 을이 자산의 임대, 전시, 저작권 등을 통하여 별도의 이익을 얻게 될 경우에는, 갑에게 사전에 통지한 후 이익금을 분배할 수 있다.{'\n'}
                  ③ 을은 갑이 구매한 자산에 대한 관리 현황을 모바일앱의 '나의소유내역'에서 확인할 수 있도록 지속적으로 업데이트한다.{'\n'}
                  ④ 을의 귀책으로 자산이 분실, 멸실, 훼손되는 경우에는 을은 이에 대한 손해배상을 부담한다. 다만, 을이 부담하는 손해배상액은 구매금액의 110%를 한도로 한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제7조 (자산에 대한 처분 권한 위임 – 분할소유관계의 해소)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 분할소유관계 해소를 위한 자산 처분 권한 위임에 따라 을은 기본 회수 기간 이내에 자산 매각을 결정하고 매각 제반 업무를 수행해야 한다. 단, 을은 자산 매각과 관련하여 예상 처분 가격 이상이 되도록 최대한 노력해야 한다. (자산이 포트폴리오로 구성되어 있을 경우에는 포트폴리오 전체 가격을 기준으로 판단한다.){'\n'}
                  ② 기본 회수 기간 내에 예상 처분 가격 이상으로 자산 매각 진행이 어려울 경우에는 을은 1회에 한하여 회수 기간을 연장하여 자산 매각 처분 시기를 연장할 수 있다. 단, 분할소유권 구매자의 51% 이상 반대할 경우에는 갑은 기본 회수 기간 내에 적정한 가격으로 처분해야 한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제8조 (매각 대금 정산 및 수수료)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 정산 권한(자산 매각에 따른 분할 소유권 구매자에 대한 정산) 위임에 따라 을은 자산을 실제 매각한 금액과 분할소유권구매자로부터 모집한 금액(부가가치세 등 세금 제외)의 차액인 총이익금에서 을에 대한 수수료 20%를 공제한 나머지 매각 대금을 분할소유권구매자에게 구매 수량에 따라 분배하여 지급한다.{'\n'}
                  ② 을은 갑에게 분배하는 수익에서 기타 소득 등 관련 세금이 발생될 경우 해당 세금에 대한 증빙과 함께 납부 세금을 원천징수한 이후 수익을 지급한다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제9조 (예치금 관리)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 갑은 자산의 지분을 구매하기 위해 예치금을 선충전해야 하며, ㈜바이셀스탠다드 계좌 입금 후 1영업일 이내로 충전이 완료된다.{'\n'}
                  ② 갑을 예치금 출금을 위한 출금 신청을 해야 하며, 신청일 기준 1영업일 후 갑의 등록 계좌로 입금된다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제10조 (분할 소유권의 구매 확정 및 취소 및 환불)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 분할 소유권 구매 모집이 완료되는 시점에 자산에 대한 분할 소유권 구매가 확정된다. 단, 구매 기간 종료 시점에 판매된 분할 소유권의 수량이 [80%] 미만일 경우에는 본 계약은 효력이 없으며, 구매 대금은 3영업일 이내에 갑의 계정에 예치금 형태로 환불된다.{'\n'}
                  ② 갑은 구매가 확정된 날로부터 7일 이내에 을에 대한 통지를 통하여 구매 취소 및 환불을 요청할 수 있다.
                </Text>
              </Box>

              <Box
                bgColor={'gray.200'}
                borderWidth={'1px'}
                borderColor={'#EAECF0'}
                p={'15px'}
                borderRadius={'5px'}
                mb={'20px'}
              >
                <Text size={'titleM'} color={'gray.600'} mb={'10px'}>
                  제11조 (계약의 체결)
                </Text>
                <Text size={'textM'} color={'gray.600'}>
                  ① 본 계약은 갑이 자산에 대한 분할 소유권 구매에 대한 신청을 한 날을 계약 체결 일자로 하여 본 계약을 체결된다.{'\n'}
                  ② 본 계약서는 전자문서의 형태로 제공되며, 갑은 을에게 계약서 사본을 요청할 수 있으며 이에 대하여 을은 우편으로 계약서 사본을 송부해야 한다.
                </Text>
              </Box>

              <Box
                mb={'20px'}
              >
                <Text size={'textM'} color={'gray.600'}>
                  갑: {memberData.name}{'\n'}
                  주소: {memberData.baseAddress} {memberData.detailAddress}{'\n'}
                  구매계약일: {getDate(purchaseData.purchaseAt)}{'\n'}
                  서명: 전자 서명으로 대체(자동)
                </Text>
              </Box>

              <Box>
                <Text size={'textM'} color={'gray.600'}>
                  을: (주)바이셀스탠다드{'\n'}
                  주소: 서울시 강서구 공항대로 168 747빌딩 901호{'\n'}
                  법인등록번호: 110111-7035606
                </Text>
                <Flex direction={'row'}>
                  <Text size={'textM'} color={'gray.600'}>
                    서명: 전자 서명으로 대체
                  </Text>
                  <ZStack>
                    <Text size={'textM'} color={'gray.600'}>
                      (자동)
                    </Text>
                    <Image
                      source={require('assets/images/stamp.png')}
                      width={'38px'}
                      height={'38px'}
                      top={'-6px'}
                    />
                  </ZStack>
                </Flex>
              </Box>


            </Box>
          </ScrollView>
          {purchaseData.documentCode && (
            <LinearGradient
              style={{
                position: 'absolute',
                bottom: 0,
                height: 150,
                width: '100%',
                paddingBottom: 30,
                paddingHorizontal: 16,
                alignItems: 'flex-end',
                flexDirection: 'row',
              }}
              start={[0.5, 0]}
              end={[0.5, 1]}
              locations={[0.1, 0.4583]}
              colors={['#ffffff00', '#ffffff']}
            >
              <HStack space={'10px'}>
                <Button
                  onPress={() => openModal('post')}
                  colorScheme="button_primary_light"
                  flex={'1'}
                  h={'48px'}
                  borderRadius={'10px'}
                  bgColor={'#E6F9FA'}
                >
                  <Text size={'buttonM'} color={'primary.500'}>
                    우편으로 받기
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    openModal('email');
                  }}
                  flex={'1'}
                  // colorScheme="primary"
                  bgColor={'#10CFC9'}
                  h={'48px'}
                  borderRadius={'10px'}
                >
                  <Text size={'buttonM'} color={'white'}>
                    이메일로 보내기
                  </Text>
                </Button>
              </HStack>
            </LinearGradient>
          )}
        </>
      )}
    </Layout>
  );
};

export default OwnDeed;
