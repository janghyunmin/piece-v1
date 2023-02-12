import React, { useState } from 'react'
import { Box, Flex, Input, Text } from 'native-base'

const Forms = (props: any) => {
  const {
    name,
    ssn1,
    ssn2,
    setSsn1,
    setSsn2,
    ssnIncorrect,
    ssn1Focus,
    ssn2Focus,
    setSsn1Focus,
    setSsn2Focus,
  } = props;

  return (
    <Box px={'16px'}>
      <Box mb={'28px'}>
        <Text size={'titleS'} color={'gray.500'}>
          이름
        </Text>
        <Input
          value={name}
          padding={0}
          variant={'underlined'}
          h={'52px'}
          isReadOnly
        />
      </Box>
      <Box mb={'28px'}>
        <Text size={'titleS'} color={ssn1Focus || ssn2Focus ? 'gray.800' : 'gray.500'}>
          주민등록번호
        </Text>
        <Flex direction={'row'} alignItems={'center'}>
          <Box flex={'1'}>
            <Input
              keyboardType={'number-pad'}
              value={ssn1}
              onFocus={() => setSsn1Focus(true)}
              onBlur={() => setSsn1Focus(false)}
              onChangeText={(text) => setSsn1(text)}
              padding={0}
              variant={ssnIncorrect ? 'warn' : 'underlined'}
              maxLength={6}
              h={'52px'}
            />
          </Box>
          <Box mx={'10px'}>
            <Text>-</Text>
          </Box>
          <Box flex={'1'}>
            <Input
              keyboardType={'number-pad'}
              value={ssn2}
              onFocus={() => setSsn2Focus(true)}
              onBlur={() => setSsn2Focus(false)}
              onChangeText={(text) => setSsn2(text)}
              padding={0}
              variant={ssnIncorrect ? 'warn' : 'underlined'}
              type={'password'}
              maxLength={7}
              h={'52px'}
            />
          </Box>
        </Flex>
        {ssnIncorrect !== '' && (
          <Text mt={'5px'} size={'captionM'} color={'warning.500'}>
            {ssnIncorrect}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default Forms
