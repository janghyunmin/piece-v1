import React from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';

import { ConsentData, EssentialItemsProps } from 'interfaces/mypage.type'
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import { formatDate } from 'utils/formatDate'

const EssentialItems = (props: EssentialItemsProps) => {
  const { essentialConsentList, navigation } = props;

  return (
    <Box bgColor={'white'} px={'16px'} mb={'10px'}>
      {essentialConsentList.map((consent: ConsentData, index: number) => (
        <Pressable
          onPress={() =>
            navigation.navigate('policyInner', {
              consentGroup: consent.consentGroup,
              createdAt: consent.createdAt,
            })
          }
          key={consent.consentCode}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
        >
          <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text py={'20px'} size={'textM'} color={'gray.800'}>
              [필수] {consent.consentTitle}
            </Text>

            <Flex direction={'row'} alignItems={'center'}>
              {/*<Text size={'textM'} color={'gray.500'} mr={'5px'}>*/}
              {/*  {formatDate(consent.createdAt.substr(2))}*/}
              {/*</Text>*/}
              <NextGrayIcon />
            </Flex>
          </Flex>
        </Pressable>
      ))}
    </Box>
  );
};

export default EssentialItems;
