import React from 'react'
import { Box, Center, Spinner } from 'native-base'
import Layout from 'components/Layout'


const PageLoading = () => {
  return (
    <Box minH={'100%'}>
      <Center flex={1}>
        <Spinner size={'lg'} color={'primary.500'} />
      </Center>
    </Box>
  )
}

export default PageLoading;
