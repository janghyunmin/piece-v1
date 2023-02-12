import React from 'react';

import { Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import AlarmActiveIcon from 'components/Icons/AlarmActiveIcon';
import AlarmIcon from 'components/Icons/AlarmIcon';

import { HeaderTitle } from 'interfaces/components.type';
import { useRootState } from 'hooks/useRootState';
import CloseIcon from 'components/Icons/CloseIcon';
import { useQuery } from 'react-query'
import { getNotificationStatus } from 'apis/Notification'

const MainHeader = ({ screen, title, setTitle, navigation }: HeaderTitle) => {
  const changeTitle = (index: number) => {
    const tempTitle = [...title];
    for (let i in tempTitle) {
      tempTitle[i].selected = false;
    }
    tempTitle[index].selected = true;
    setTitle(tempTitle);
  };

  const { data: NotificationStatusData } = useQuery(
    ['NotificationStatus'],
    getNotificationStatus,
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['NotificationStatus'] });
      },
      cacheTime: 0,
    }
  )

  return (
    <Flex
      zIndex={999}
      direction={'row'}
      h={'80px'}
      justifyContent={'space-between'}
      mb={'20px'}
      alignItems={'center'}
    >
      <Flex direction={'row'}>
        {title.map((data, index) => (
          <Pressable key={index} onPress={() => changeTitle(index)}>
            <Text
              size={'titleXL'}
              color={data.selected ? 'black' : 'gray.400'}
              mr={'15px'}
            >
              {data.title}
            </Text>
          </Pressable>
        ))}
      </Flex>

      {screen === 'home' && (
        <Pressable
          onPress={() => {
            // if (!isUser) {
            //   navigation.navigate('LoginRedirect');
            // } else {
            //   navigation.navigate('Alarm');
            // }
            navigation.navigate('Alarm', { category: 'NTT01' });
          }}
        >
          {NotificationStatusData?.isRead ? (
            <AlarmIcon />
          ) : (
            <AlarmActiveIcon />
          )}
        </Pressable>
      )}
      {screen === 'alarm' && (
        <Pressable onPress={() => navigation.goBack()}>
          <CloseIcon />
        </Pressable>
      )}
    </Flex>
  );
};

export default MainHeader;
