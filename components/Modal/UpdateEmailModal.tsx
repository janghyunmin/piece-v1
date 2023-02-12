import React, { useState } from 'react';

import { Box, Button, Flex, Input, KeyboardAvoidingView, Pressable, Text } from 'native-base'
import ClearIcon from 'components/Icons/ClearIcon';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import { useMutation, useQueryClient } from 'react-query';
import { updateMember } from 'apis/Member';
import { UpdateMemberType } from 'apis/Member/member.type';
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { validateEmail } from 'utils/validate'

const UpdateEmailModal = ({ navigation, route }: any) => {
  const { isEmail } = route.params;
  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>('');
  const [emailIncorrect, setEmailIncorrect] = useState<string>('');

  const updateMemberMutation = useMutation(
    (body: UpdateMemberType) => updateMember(body),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['Member']);
        navigation.navigate(route.params.from, {
          ...route.params,
          next: {
            route: 'ConfirmEmailModal',
            params: { isEmail },
          },
        });
      },
      onError: (err: any) => {
        if (err.response.status === 400) setEmailIncorrect('이미 사용 중인 이메일입니다.')
      }
    }
  );

  const goNextPage = () => {
    if (!validateEmail(email)) {
      setEmailIncorrect('올바른 이메일 형식이 아닙니다.');
      return;
    }
    updateMemberMutation.mutate({
      email: email
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
              {!isEmail ? '이메일 등록' : '이메일 변경'}
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

          <Text size={'titleS'} color={'gray.500'}>
            이메일
          </Text>
          <Box position={'relative'} mb={'30px'}>
            <Input
              h={'52px'}
              value={email}
              onChangeText={(text: string) => {
                if (emailIncorrect) setEmailIncorrect('');
                setEmail(text);
              }}
              variant={emailIncorrect ? 'warn' : 'underlined'}
              placeholder="이메일 입력"
              pr={'30px'}
              keyboardType={'email-address'}
            />
            {!!emailIncorrect && (
              <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
                {emailIncorrect}
              </Text>
            )}
            {!!email && (
              <Pressable
                onPress={() => setEmail('')}
                h={'52px'}
                justifyContent={'center'}
                position={'absolute'}
                right={'0'}
                top={'3px'}
              >
                <ClearIcon />
              </Pressable>
            )}
          </Box>

          <Button
            onPress={goNextPage}
            isDisabled={!email || updateMemberMutation.isLoading}
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

export default UpdateEmailModal;