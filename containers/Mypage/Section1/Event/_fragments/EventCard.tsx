import React, { useEffect, useState } from 'react';

import { Image, Center, Pressable, Text, Box } from 'native-base';

import { EventCardProps } from 'interfaces/mypage.type';
import {} from 'react-native';
import { EventType } from 'apis/Board/board.type';

const today = new Date().getTime();

// bskr_jhm 0529 title: item.title 추가
const EventCard = (props: EventCardProps) => {
  const { event, navigation } = props;
  return (
    <>
      {event?.map((item: EventType, index: number) => (
        <Pressable
          onPress={() => {
            navigation.navigate('EventDetail', { eventId: item.eventId , title: item.title });
          }}
          key={index}
          w={'100%'}
          borderRadius={'20px'}
          mb={'20px'}
          position={'relative'}
        >
          <Box shadow={4}>
            <Image
              key={item.eventId}
              w={'100%'}
              h={'180px'}
              borderRadius={'20px'}
              resizeMode={'cover'}
              source={{ uri: item.representThumbnailPath }}
              alt={`이벤트 이미지`}
            />
            {today >= new Date(item.eventEndDate+'+09:00').getTime() && (
              <Center
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={0}
                borderRadius={'20px'}
                bgColor={'rgba(255,255,255,0.7)'}
              >
                <Text size={'titleM'} color={'gray.800'}>
                  종료된 이벤트입니다.
                </Text>
              </Center>
            )}
          </Box>

        </Pressable>
      ))}
    </>
  );
};

export default EventCard;
