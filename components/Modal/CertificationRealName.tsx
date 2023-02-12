import React from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base'
import { comma } from 'utils/comma'
import useMemberQuery from 'hooks/useMemberQuery'
import { Image } from 'react-native'
import usePreventBackButton from 'hooks/usePreventBackButton';

const CertificationRealName = ({ navigation, route }: any) => {
  const { amount } = route.params;
  const isInit = route.params.isInit;
  const { data: memberData } = useMemberQuery();

  usePreventBackButton();

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        pt={'20px'}
        px={'16px'}
        pb={'30px'}
      >
        <Box mb={'50px'}>
          <Flex w={'100%'} alignItems={'center'} mb={'10px'}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require('assets/images/withdraw_complete_lopping.gif')}
            />
          </Flex>
          <Flex direction={'row'} justifyContent={'center'} alignItems={'flex-end'} mb={'10px'}>
            <Text bold size={'titleL'} color={'gray.800'} textAlign={'center'}>
              {comma(amount)}{' '}
            </Text>
            <Text size={'textM'} color={'gray.600'} textAlign={'center'}>
              원
            </Text>
          </Flex>
          <Text size={'captionM'} color={'gray.600'} textAlign={'center'}>
            {memberData?.name}님, 수익 분배금이 지급되었어요!
            {isInit && '\n간편한 실명인증으로 세금처리를 도와드릴게요.'}
          </Text>
        </Box>

        <HStack width={'100%'} space={'10px'}>
          {/*<Button*/}
          {/*  onPress={() => {*/}
          {/*    navigation.goBack()*/}
          {/*  }}*/}
          {/*   colorScheme={'button_primary_light'}*/}
          {/*  borderRadius={'10px'}*/}
          {/*  flex={1}*/}
          {/*  h={'48px'}*/}
          {/*>*/}
          {/*  <Text color={'primary.500'} size={'buttonM'}>*/}
          {/*    다음에 할게요*/}
          {/*  </Text>*/}
          {/*</Button>*/}
          <Button
            onPress={() => {
              if (isInit) {
                navigation.navigate('CertificateRealName', { amount })
              } else {
                navigation.goBack();
              }
            }}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
            borderRadius={'10px'}
            flex={1}
            h={'48px'}
          >
            <Text color={'white'} size={'buttonM'}>
              {isInit ? '지금 실명인증하기' : '확인'}
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CertificationRealName;
