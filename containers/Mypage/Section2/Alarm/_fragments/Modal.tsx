import React from 'react';

import { Flex, Pressable, Text, Button, Modal } from 'native-base';
import { Image } from 'react-native';

import { AlarmProps } from 'interfaces/home.type';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';

const ModalContainer = (props: any) => {
  const { showModal, setShowModal, handleAfter30Day } = props;

  return (
    <Modal isOpen={showModal} px={'16px'} onClose={() => setShowModal(false)}>
      <Modal.Content w={'100%'} px={'20px'} pt={'20px'} pb={'23px'} mb={'10px'}>
        <Flex alignItems={'flex-end'} mb={'20px'}>
          <Pressable onPress={() => setShowModal(false)}>
            <CloseGrayIcon />
          </Pressable>
        </Flex>

        <Text size={'titleL'} textAlign={'center'} mb={'10px'}>
          앗, 기기 알림이 꺼져 있어요!
        </Text>
        <Text
          size={'textM'}
          textAlign={'center'}
          color={'gray.700'}
          mb={'20px'}
        >
          포트폴리오 오픈 정보를 가장 먼저 받고{'\n'}
          자산 변동 및 혜택 알림도 놓치지 마세요!
        </Text>

        <Flex alignItems={'center'} position={'relative'}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require('assets/images/alarm_lopping.gif')}
          />
          <Image
            style={{ width: 260, height: 140, position: 'absolute', top: 40 }}
            source={require('assets/images/alarm_background.png')}
          />
        </Flex>

        {/*<Button*/}
        {/*  height={'50px'}*/}
        {/*  borderRadius={'10px'}*/}
        {/*  onPress={() => handleAlarm()}*/}
        {/*>*/}
        {/*  <Text color={'white'} size={'buttonM'}>*/}
        {/*    알림 설정하기*/}
        {/*  </Text>*/}
        {/*</Button>*/}
      </Modal.Content>

      <Flex>
        <Pressable onPress={handleAfter30Day}>
          <Text color="white" size={'activeM'}>
            30일간 보지 않기
          </Text>
        </Pressable>
      </Flex>
    </Modal>
  );
};

export default ModalContainer;
