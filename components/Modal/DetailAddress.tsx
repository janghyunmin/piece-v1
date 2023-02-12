import React, { useState } from 'react';

import { Box, Button, Flex, Input, KeyboardAvoidingView, Pressable, Text } from 'native-base'
import { Platform } from 'react-native';
import ClearIcon from 'components/Icons/ClearIcon';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon'
import { useMutation, useQueryClient } from 'react-query'
import { updateMember } from 'apis/Member'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const DetailAddress = ({ navigation, route }: any) => {
  const { roadAddress, jibun, zipCode } = route.params;

  const queryClient = useQueryClient();

  const [detail, setDetail] = useState<string>('');

  const updateMemberMutation = useMutation(
    (body: any) => updateMember(body),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['Member']);
        navigation.navigate(route.params.from, {
          ...route.params,
          next: {
            route: 'confirmAddress',
          },
        });
      },
    }
  );

  const goNextPage = () => {
    updateMemberMutation.mutate({
      zipCode: zipCode,
      baseAddress: roadAddress,
      detailAddress: detail,
    });
  };

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box
          bgColor={'white'}
          borderTopLeftRadius={'20px'}
          borderTopRightRadius={'20px'}
          pt={'30px'}
          px={'16px'}
          pb={Platform.OS === 'ios' ? getBottomSpace() :'30px'}
        >
          <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={'30px'}
          >
            <Box w={'28px'} h={'28px'} />
            <Text size={'titleL'} color={'gray.800'}>
              상세 주소
            </Text>
            <Pressable
              w={'28px'}
              h={'28px'}
              justifyContent={'center'}
              alignItems={'center'}
              onPress={() => navigation.goBack()}
            >
              <CloseGrayIcon />
            </Pressable>
          </Flex>

          <Box bgColor={'gray.200'} p={'20px'} mb={'30px'}>
            <Text size={'textS'} mb={'20px'} color={'gray.800'}>
              선택한 주소
            </Text>
            <Text size={'titleM'} color={'gray.800'} mb={'5px'}>
              {roadAddress}
            </Text>
            <Text size={'textS'} color={'gray.700'}>
              {jibun}
            </Text>
          </Box>

          <Box position={'relative'}>
            <Input
              h={'52px'}
              value={detail}
              onChangeText={(text: string) => setDetail(text)}
              variant={'underlined'}
              placeholder="상세 주소를 입력해 주세요"
              mb={'30px'}
              pr={'30px'}
            />
            <Pressable
              onPress={() => setDetail('')}
              h={'52px'}
              justifyContent={'center'}
              position={'absolute'}
              right={'0'}
              top={'3px'}
            >
              <ClearIcon />
            </Pressable>
          </Box>

          <Button
            onPress={goNextPage}
            isDisabled={updateMemberMutation.isLoading}
            shadow={1}
            borderRadius={'10px'}
            w={'100%'}
            h={'48px'}
            bgColor={'#10CFC9'}
          >
            <Text color={'white'} size={'buttonM'}>
              완료
            </Text>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Flex>
  );
};

export default DetailAddress;
