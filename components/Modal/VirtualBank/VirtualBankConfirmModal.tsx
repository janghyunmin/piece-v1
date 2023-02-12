import React , {useState} from 'react'
import { Box, Button, Flex, Text } from 'native-base'

const VirtualBankConfirmModal = ({ navigation, route }: any) => {
  
const [isSelect, setSelect] = useState<boolean>(false);


    /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
    const onPressed = () => {
      setSelect(isSelect);
      setTimeout(() => setSelect(isSelect), 100);
    };

    
  return (
    <Flex
      position={'absolute'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      flex={1}
      w={'100%'}
      justifyContent={'center'}
      px={'16px'}
      zIndex={'999'}
    >
      <Box bgColor={'white'} borderRadius={'20px'} py={'30px'} px={'16px'}>
        <Text
          size={'titleL'}
          textAlign={'center'}
          mb={'10px'}
          color={'gray.800'}
        >
          입금 하셨나요?
        </Text>
        <Text
          size={'captionM'}
          color={'gray.600'}
          textAlign={'center'}
          mb={'30px'}
        >
          유효기간내 입금을 완료해 주세요.
        </Text>

        <Button
          onPress={() => {
            let tempSelect = isSelect;
            tempSelect = !tempSelect;
            onPressed();
            setSelect(tempSelect);

            if (route.params.from) {
              navigation.navigate('buy');
            }
            navigation.navigate('OwnMoney');
          }}
          style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]} 
          h={'48px'}
          borderRadius={'10px'}
          // colorScheme={'primary'}
          bgColor={'#10CFC9'}
        >
          <Text size={'buttonM'} color={'white'}>
            네, 알겠습니다.
          </Text>
        </Button>
      </Box>
    </Flex>
  )
}

export default VirtualBankConfirmModal
