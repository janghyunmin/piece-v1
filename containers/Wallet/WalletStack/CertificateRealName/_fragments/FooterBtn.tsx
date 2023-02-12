import React from 'react'
import { Box, Button, Text } from 'native-base'


const FooterBtn = (props: any) => {
  const { formFilled, goToNextStep } = props;

  return (
    <Box px={'16px'} bgColor={'white'}>
      <Button
        w={'100%'}
        h={'50px'}
        borderRadius={'10px'}
        // colorScheme={'primary'}
        bgColor={'#10CFC9'}
        isDisabled={!formFilled}
        onPress={goToNextStep}
      >
        <Text color="white" size={'buttonM'}>
          실명 인증하기
        </Text>
      </Button>
    </Box>
  )
}

export default FooterBtn
