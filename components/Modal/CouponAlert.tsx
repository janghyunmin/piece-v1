import React , {useState} from 'react';

import { Box, Button, Flex, HStack, Text } from 'native-base';
import { useQueryClient } from 'react-query'
import Storage from '@react-native-async-storage/async-storage'

const CouponAlert = ({ navigation }: any) => {

   /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
  const [isSelect, setSelect] = useState<boolean>(false);
   const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
  };




  return (
    <Flex
      position={'absolute'}
      zIndex={'999'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      flex={1}
      w={'100%'}
      justifyContent={'center'}
      px={'16px'}
     
    >
      <Box bgColor={'white'} borderRadius={'10px'} py={'22px'} px={'16px'}>
        <Text
          size={'titleL'}
          textAlign={'left'}
          mb={'10px'}
          color={'gray.800'}
        >
          쿠폰을 사용할 때 꼭 알아 두세요
        </Text>
       
        <Text
          size={'couponS_'}
          textAlign={'left'}
          color={'gray.600'}
        >
          • 쿠폰의 유효 기간이 지나면 사용할 수 없어요. {"\n"}
          • 쿠폰은 한 번만 사용할 수 있어요. {"\n"}
          • 한 번 사용된 쿠폰은 구매 취소나 환불 시에 재발행되지 않아요. {"\n"}
          • 조각교환 쿠폰은 사용 후 취소할 수 없어요. {"\n"}
          • 특정 쿠폰은 다른 쿠폰과 함께 중복 사용할 수 없어요. {"\n"}
          • 쿠폰을 다른 사람에게 양도할 수 없어요. {"\n"}
          • 쿠폰을 현금으로 바꿀 수 없어요. {"\n"}
         
        </Text>

        <HStack>
          <Button
            style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]} 
            flex={1}
            onPress={() => {
                let tempSelect = isSelect;
                tempSelect = !tempSelect;
                onPressed();
                setSelect(tempSelect);
                navigation.goBack()
              }
            }
            h={'48px'}
            borderRadius={'10px'}
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
          >
            <Text size={'buttonM'} color={'white'}>
              확인했어요!
            </Text>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default CouponAlert;
