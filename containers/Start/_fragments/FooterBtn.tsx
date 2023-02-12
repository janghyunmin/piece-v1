import React, { useState } from 'react';
import { Button, Flex, Pressable, Text } from 'native-base';

import { StartFooterBtnProps } from 'interfaces/auth.type';
import { useDispatch } from 'react-redux'
import { setIsTour } from 'features/tourSlice'
import appsFlyer from 'react-native-appsflyer'; // appsFlyer bskr_0725_jhm
import Storage from '@react-native-async-storage/async-storage'




const FooterBtn = ({ width, navigation, startPiece }: StartFooterBtnProps) => {
  const dispatch = useDispatch();
  const [isSelect, setSelect] = useState<boolean>(false);

  /** AppsFlyer 서비스 둘러보기 start **/
  async function afBrowsing() {
    let deviceId = await Storage.getItem('@deviceId');
    const appsFleyerBrowser = 'af_browsing';
    const appsFleyerBrowserValues = {
      af_device_id: deviceId,
    }

    try {
      var result = await appsFlyer.logEvent(
        appsFleyerBrowser,
        appsFleyerBrowserValues
      )
      console.log("AppsFlyer af_browsing Result : " + result + ' deviceId : ' + deviceId);
    } catch (error) {
      console.log("AppsFlyer af_browsing Error  : " + error);
    }
  }
  /** AppsFlyer 서비스 둘러보기 end **/

  /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
  const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
    startPiece()
  };

  return (
    <Flex w={width} px={'16px'}>
        <Button onPress={() => {
          let tempSelect = isSelect;
          tempSelect = !tempSelect;
          onPressed();
          setSelect(tempSelect);
        }
      }
        style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]} 
        bgColor={'#10CFC9'} 
        h={'56px'} 
        borderRadius={'10px'} 
        mb={'20px'}
        >
        <Text size={'titleM'} color={'white'}>
          Piece 시작하기
        </Text>

      </Button>
      <Flex alignItems={'center'}>
        <Pressable
          onPress={() => {
            dispatch(setIsTour(true));
            navigation.navigate('StackNavigation', {
              screen: 'tab',
            });
            afBrowsing()
          }}
        >
          <Text size={'activeM'} color={'gray.600'}>
            서비스 둘러보기
          </Text>
        </Pressable>
      </Flex>
    </Flex>
  );
};

export default FooterBtn;
