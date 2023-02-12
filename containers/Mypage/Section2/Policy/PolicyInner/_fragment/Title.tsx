import React, { useMemo, useState } from 'react'

import { Box, Button, Center, Flex, Menu, Pressable, Text } from 'native-base';
import { Dimensions, Image } from 'react-native';

import { PolicyCarrierType, PolicyTitleProps } from 'interfaces/mypage.type';
import DownIcon from 'components/Icons/DownIcon';
import { formatDate } from 'utils/formatDate'


const Title = (props: any) => {
  const { consentList, selectedIndex, setSelectedIndex } = props;

  const dates = useMemo(() => {
    return consentList.map((consent: any) => formatDate(consent.createdAt));
  }, [consentList]);

  return (
    <>
      <Box
        px={'16px'}
        borderBottomWidth={'1px'}
        borderBottomColor={'gray.200'}
      >
        <Text size={'titleL'} color={'#000000'} mb={'5px'}>
          {consentList[selectedIndex].consentTitle}
        </Text>

        <Menu
          w={'120px'}
          p={'0'}
          mt={'5px'}
          borderWidth={'1px'}
          borderColor={'gray.500'}
          borderRadius={'5px'}
          shouldOverlapWithTrigger={false}
          placement={'bottom'}
          trigger={(triggerProps) => {
            return (
              <Button
                w={'120px'}
                h={'40px'}
                mb={'20px'}
                bgColor={'white'}
                {...triggerProps}
              >
                <Flex
                  borderWidth={'1px'}
                  borderColor={'gray.500'}
                  borderRadius={'5px'}
                  w={'120px'}
                  h={'40px'}
                  p={'10px'}
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Text size={'textS'} color={'gray.500'}>
                    {formatDate(consentList[selectedIndex].createdAt)}
                  </Text>
                  <DownIcon />
                </Flex>
              </Button>
            );
          }}
        >
          {dates.map((date: string, index: number) => (
            <Menu.Item
              key={index}
              p={'10px'}
              onPress={() => setSelectedIndex(index)}
            >
              <Text
                color={index === selectedIndex ? 'primary.500' : 'gray.500'}
                size={'textS'}
              >
                {date}
              </Text>
            </Menu.Item>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default Title;
