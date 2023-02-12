import React, { useMemo, useState } from 'react'
import * as Clipboard from 'expo-clipboard';
import Layout from 'components/Layout'
import { Box, Button, Center, Flex, Input, Pressable, Text } from 'native-base'
import GoBack from 'components/GoBack'
import { comma } from 'utils/comma'
import { Image } from 'react-native'
import bankColorChange from 'utils/bankColorChange'
import useMemberQuery from 'hooks/useMemberQuery'
import usePreventBackButton from 'hooks/usePreventBackButton';


const VirtualBankCreateComplete = ({ navigation, route }: any) => {
  const { trdAmt } = route.params;
  const { data: memberData } = useMemberQuery();
  usePreventBackButton();
  const [isSelect, setSelect] = useState<boolean>(false);


  const [isClipboard, setIsClipboard] = useState<boolean>(false);

  const expiredAtString = useMemo(() => {
    const expiredAt = new Date(+new Date() + (60 * 60 * (24 + 9) * 1000));
    const year = expiredAt.getUTCFullYear();
    const month = expiredAt.getUTCMonth() + 1;
    const day = expiredAt.getUTCDate();
    const hour = expiredAt.getUTCHours();
    const minute = expiredAt.getUTCMinutes();
    return `${year}.${month}.${day} / ${hour}시 ${minute}분`;
  }, [])

  /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
  const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
  };


  return (
    <Layout>
      <Box px={'16px'} height={'100%'}>
        <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
          <Flex mb={'20px'} alignItems={'center'}>
            <Flex direction={'row'}>
              <Text size={'textXL'}>
                이제,{' '}
              </Text>
              <Text size={'textXL'} bold>
                입금
              </Text>
              <Text size={'textXL'}>
                만 하시면
              </Text>
            </Flex>
            <Flex direction={'row'}>
              <Text size={'textXL'} bold>
                충전
              </Text>
              <Text size={'textXL'}>
                이{' '}
              </Text>
              <Text size={'textXL'} bold>
                완료
              </Text>
              <Text size={'textXL'}>
                되요!
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems={'center'} mb={'10px'}>
            <Text size={'titleM'} color={'gray.700'}>
              입금하실 금액
            </Text>
            <Flex direction={'row'} alignItems={'flex-end'}>
              <Box pr={'5px'}>
                <Text size={'titleXL'} color={'primary.500'}>
                  {comma(trdAmt)}
                </Text>
              </Box>
              <Text size={'textM'} color={'primary.500'}>원</Text>
            </Flex>
          </Flex>

          <Flex w={'100%'} alignItems={'center'} mb={'20px'}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require('assets/images/deposit_charged_lopping.gif')}
            />
          </Flex>

          <Flex
            py={'20px'}
            px={'15px'}
            bgColor={'gray.100'}
            borderRadius={'20px'}
            direction={'row'}
            mb={'20px'}
            alignItems={'center'}
          >
            <Image
              style={{ width: 40, height: 40, marginRight: 10 }}
              source={bankColorChange('089').icon}
            />
            <Flex flex={1}>
              <Text size={'titleS'} color={'gray.700'}>
                {memberData?.name}님의 가상계좌에요.
              </Text>
              <Text size={'textS'} color={'gray.700'}>
                {bankColorChange('089').name} {memberData?.cellPhoneNo}
              </Text>
            </Flex>
            <Pressable
              onPress={() => {
                Clipboard.setString(memberData.cellPhoneNo);
                setIsClipboard(true);
              }}
            >
              <Text underline={!isClipboard} color={'gray.700'}>{isClipboard ? '복사완료' : '복사하기'}</Text>
            </Pressable>
          </Flex>
        </Flex>

        <Box>
          <Flex direction={'row'} justifyContent={'center'} mb={'8px'}>
            <Text size={'textS'} color={'warning.500'} bold>
              유효기간
            </Text>
            <Text size={'textS'} color={'warning.500'}>
              : ~ {expiredAtString}
            </Text>
          </Flex>
          <Button
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
            onPress={() => {
              let tempSelect = isSelect;
              tempSelect = !tempSelect;
              onPressed();
              setSelect(tempSelect);
                navigation.navigate('VirtualBankConfirmModal',
                  { from: route.params.from }
                )
              }
            }
            style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]}
            borderRadius={'10px'}
            h={'48px'}
          >
            <Text color={'white'} size={'buttonM'}>
              확인
            </Text>
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default VirtualBankCreateComplete
