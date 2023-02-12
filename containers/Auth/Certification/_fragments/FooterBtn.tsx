import React, { useEffect, useState } from 'react'

import { Box, Button, Text } from 'native-base';

import { CertificationFooterBtnProps } from 'interfaces/auth.type';

const FooterBtn = (props: CertificationFooterBtnProps) => {
  const [isSelect, setSelect] = useState<boolean>(false);
  const { formFilled, goToNextStep } = props;



  /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
  const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
  };



  return (
    <Box px={'16px'} bgColor={'white'} pb={'30px'}>
      <Button
        w={'100%'}
        h={'50px'}
        borderRadius={'10px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        isDisabled={!formFilled}
        onPress={() => {
            let tempSelect = isSelect;
            tempSelect = !tempSelect;
            onPressed()
            setSelect(tempSelect);
            goToNextStep()
          }
        }
      >
        <Text color="white" size={'buttonM'}>
          확인
        </Text>
      </Button>
    </Box>
  );
};

export default FooterBtn;
