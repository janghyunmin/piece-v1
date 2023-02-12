import React from 'react'
import { Box, Text } from 'native-base'


const Title = () => {
  return (
    <Box px={'16px'}>
      <Text size={'titleXL'} color={'gray.800'} mb={'5px'}>
        실명 인증
      </Text>
      <Text mb="40px" size={'captionM'} color={'gray.600'}>
        분배금 관련 세금 신고를 위한{'\n'}
        실명 인증 정보를 입력해 주세요.
      </Text>
    </Box>
  )
}

export default Title
