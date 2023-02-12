import React from 'react'
import { Flex, Pressable, Text } from 'native-base'
import AlarmIcon from 'components/Icons/AlarmIcon'
import AlarmActiveIcon from 'components/Icons/AlarmActiveIcon'
import { useQuery } from 'react-query'
import { getNotificationStatus } from 'apis/Notification'
import { useRootState } from 'hooks/useRootState'
import Storage from '@react-native-async-storage/async-storage'


const Header = ({ navigation }: any) => {
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
        <Text
          size={'titleXL'}
          color='black'
          mr={'15px'}
        >
          포트폴리오
        </Text>
      </Flex>

      <Pressable
        onPress={async () => {
          const isLogin = await Storage.getItem('@isLogin');
          const isUser = await Storage.getItem('@auth');
          if (isLogin === 'false' || !isUser) {
            navigation.navigate('LoginRedirect', { isUser });
          } else {
            navigation.navigate('Alarm', { category: 'NTT01' });
          }
        }}
      >
        {NotificationStatusData?.isRead === false ? (
          <AlarmActiveIcon />
        ) : (
          <AlarmIcon />
        )}
      </Pressable>
    </Flex>
  )
}

export default Header
