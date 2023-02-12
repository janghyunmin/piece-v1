import React from 'react'
import { Flex, Text } from 'native-base'


type PurchaseInfoItemProps = {
  title: string;
  body: string | string[];
  subBody?: string;
}


const PurchaseInfoItem = ({ title, body, subBody }: PurchaseInfoItemProps) => {
  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Text size={'titleS'} color={'gray.700'}>
        {title}
      </Text>
      <Flex alignItems={'flex-end'}>
        <Text size={'textS'} color={'gray.700'} textAlign={'right'}>
          {body}
        </Text>
        {subBody && (
          <Text size={'captionS'} color={'gray.700'}>
          {subBody}
        </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default PurchaseInfoItem;
