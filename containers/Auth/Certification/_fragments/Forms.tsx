import React, { useEffect, useState } from 'react';

import { Box, Text, Input, Button, HStack, Pressable, KeyboardAvoidingView } from 'native-base'


import { checkKor, checkEng, checkNum } from 'utils/validate';
import { Keyboard, Platform } from 'react-native'
import DownGrayIcon from 'components/Icons/DownGrayIcon'
import { useRootState } from 'hooks/useRootState'
import { useDispatch } from 'react-redux'
import { setErrors, setForm } from 'features/certificationFormSlice'

const Forms = (props: any) => {
  const {
    navigation,
    nameFocus,
    setNameFocus,
    birthdayFocus,
    setBirthdayFocus,
    phoneFocus,
    setPhoneFocus,
  } = props;

  const { kind, form, errors } = useRootState((state) => state.certificationForm);
  const dispatch = useDispatch();
  const genderSelect = ['남자', '여자']

  // const [nameFocus, setNameFocus] = useState<boolean>(false);
  // const [birthdayFocus, setBirthdayFocus] = useState<boolean>(false);
  // const [phoneFocus, setPhoneFocus] = useState<boolean>(false);

  // // 본인 확인 유효성
  // useEffect(() => {
  //   if ((!checkKor(form.name) && !checkEng(form.name) && form.name !== '') || checkNum(form.name)) {
  //     dispatch(setErrors({ ...errors, name: '한글 또는 영문으로만 입력할 수 있어요.' }));
  //   } else if (form.name.length < 2) {
  //     dispatch(setErrors({ ...errors, name: '이름은 최소 2글자 이상이어야 해요.' }));
  //   } else {
  //     dispatch(setErrors({ ...errors, name: '' }));
  //   }
  //   if (!checkNum(form.birthday) && form.birthday !== '') {
  //     dispatch(setErrors({ ...errors, birthday: '숫자만 입력할 수 있어요.' }));
  //   } else if (form.birthday.length !== 8) {
  //     dispatch(setErrors({ ...errors, birthday: '유효하지 않은 생년월일이에요.' }));
  //   } else {
  //     dispatch(setErrors({ ...errors, birthday: '' }));
  //   }
  //   if (!checkNum(form.phone) && form.phone !== '') {
  //     dispatch(setErrors({ ...errors, phone: '숫자만 입력할 수 있어요.' }));
  //   } else if (form.phone.length > 11 || form.phone.length < 10) {
  //     dispatch(setErrors({ ...errors, phone: '유효하지 않은 휴대폰 번호예요.' }));
  //   } else {
  //     dispatch(setErrors({ ...errors, phone: '' }));
  //   }
  //
  //   if (form.name === '') dispatch(setErrors({ ...errors, name: '' }));
  //   if (form.birthday === '') dispatch(setErrors({ ...errors, birthday: '' }));
  //   if (form.phone === '') dispatch(setErrors({ ...errors, phone: '' }));
  // }, [form]);

  const handleChangeText = (name: "name" | "phone" | "birthday" | "gender" | "carrier" | "consentList", text: string) => {
    dispatch(setForm({ name, value: text }));
  }

  return (
    <Box px={'16px'}>
      <Box mb={'28px'}>
        <Text size={'titleS'} color={nameFocus ? 'gray.800' : 'gray.500'}>
          이름
        </Text>
        <Input
          value={form.name}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          onChangeText={(text) => handleChangeText('name', text)}
          padding={0}
          variant={errors.name === '' ? 'underlined' : 'warn'}
          placeholder={'이름 입력'}
          h={'52px'}
        />
        {errors.name !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {errors.name}
          </Text>
        )}
      </Box>

      <Box mb={'28px'}>
        <Text size={'titleS'} color={birthdayFocus ? 'gray.800' : 'gray.500'}>
          생년월일
        </Text>
        <Input
          keyboardType={'number-pad'}
          value={form.birthday}
          onFocus={() => setBirthdayFocus(true)}
          onBlur={() => setBirthdayFocus(false)}
          onChangeText={(text) => {
            if (errors.birthday) dispatch(setErrors({name: 'birthday', value: ''}))
            handleChangeText('birthday', text);
          }}
          padding={0}
          variant={errors.birthday === '' ? 'underlined' : 'warn'}
          placeholder={'ex) 19950617'}
          h={'52px'}
          maxLength={8}
        />
        {errors.birthday !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {errors.birthday}
          </Text>
        )}
      </Box>

      <Box mb={'28px'}>
        <Text size={'titleS'} color={'gray.500'} mb={'8px'}>
          성별
        </Text>
        <HStack
          direction={'row'}
          space={'11px'}
          bgColor={'gray.200'}
          borderRadius={'10px'}
          padding={'4px'}
          h={'52px'}
        >
          {genderSelect.map((gender: string, index: number) => (
            <Button
              onPress={() => dispatch(setForm({ name: 'gender', value: gender }))}
              key={index}
              borderRadius={'10px'}
              flex={1}
              bgColor={form.gender === gender ? 'primary.500' : 'transparent'}
            >
              <Text
                size={'buttonM'}
                color={form.gender === gender ? 'white' : 'gray.500'}
              >
                {gender}
              </Text>
            </Button>
          ))}
        </HStack>
        {errors.gender !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {errors.gender}
          </Text>
        )}
      </Box>

      <Box mb={'28px'}>
        <Text size={'titleS'} color={'gray.500'}>
          통신사
        </Text>
        <Pressable
          onPress={() => navigation.navigate('SelectCarrier')}
          borderBottomWidth={1}
          borderBottomColor={'gray.200'}
          h={'52px'}
          alignItems="center"
          flexDirection="row"
        >
          <Text
            size={'textM'}
            color={form.carrier === '통신사 선택' ? 'gray.500' : 'gray.800'}
            flex={1}
          >
            {form.carrier}
          </Text>
          <DownGrayIcon />
        </Pressable>
      </Box>

      <Box mb={'28px'}>
        <Text size={'titleS'} color={phoneFocus ? 'gray.800' : 'gray.500'}>
          휴대폰 번호
        </Text>
        <Input
          keyboardType={'number-pad'}
          onFocus={() => {
            setPhoneFocus(true);
          }}
          onBlur={() => setPhoneFocus(false)}
          value={form.phone}
          onChangeText={(text) => {
            if (errors.phone) dispatch(setErrors({name: 'phone', value: ''}))
            handleChangeText('phone', text);
          }}
          padding={0}
          variant={!errors.phone ? 'underlined' : 'warn'}
          placeholder={'하이픈( - ) 없이 입력'}
          h={'52px'}
          maxLength={11}
        />
        {errors.phone !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {errors.phone}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Forms;
