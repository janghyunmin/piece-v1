import React from 'react';

import { useDispatch } from 'react-redux';
import { Box, Flex, Pressable, Text } from 'native-base';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import { setForm } from 'features/certificationFormSlice'
import { useRootState } from 'hooks/useRootState'

const bottomHeight = getBottomSpace() + 30;

const SelectCarrier = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { form } = useRootState((state) => state.certificationForm);

  const carriers = [
    'SKT',
    'KT',
    'LG U+',
    'SKT 알뜰폰',
    'KT 알뜰폰',
    'LG U+ 알뜰폰',
  ]

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        padding={'30px 16px'}
        pt={'30px'}
        px={'16px'}
        pb={`${bottomHeight}px`}
      >
        <Flex
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'30px'}
        >
          <Box w={'28px'} h={'28px'} />
          <Text size={'titleL'} color={'gray.800'}>
            통신사 선택
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
        <Box>
          {carriers.map((carrier: string, index: number) => (
            <Pressable
              onPress={() => {
                dispatch(setForm({ name: 'carrier', value: carrier}));
                navigation.goBack();
              }}
              key={index}
              pt={'14px'}
              pb={'14px'}
            >
              <Text
                size={
                  form.carrier === carrier ? 'buttonM' : 'textM'
                }
                color={
                  form.carrier === carrier
                    ? 'gray.800'
                    : 'gray.500'
                }
              >
                {carrier}
              </Text>
            </Pressable>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default SelectCarrier;
