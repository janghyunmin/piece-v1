import React from 'react'
import { Box, Flex, Text } from 'native-base'
import { Image } from 'react-native'


type OwnInfoItemProps = {
  title: string;
  body: string;
  image: any;
}


const OwnInfoItem = ({ title, body, image }: OwnInfoItemProps) => {
  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Flex direction={'row'} alignItems={'center'}>
        <Image
          source={image}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Text size={'titleM'}>{title}</Text>
      </Flex>
      <Text size={'textM'}>{body}</Text>
    </Flex>
  )
}

export default OwnInfoItem;
