import React from 'react';

import { Image } from 'react-native';
import { Flex, Pressable } from 'native-base';
import CloseIcon from 'components/Icons/CloseIcon';
import { setRefetch } from 'features/statusBarSlice';
import { useDispatch } from 'react-redux';

const ModalClose = (props: any) => {
  const { navigation, title } = props;
  const dispatch = useDispatch();

  return (
    <Flex
      px={'16px'}
      direction={'row'}
      h={'80px'}
      justifyContent={'flex-end'}
      alignItems={'center'}
    >
      <Pressable
        onPress={() => {
          dispatch(setRefetch());
          navigation.goBack();
        }}
      >
        <CloseIcon />
      </Pressable>
    </Flex>
  );
};

export default ModalClose;
