import React, { useCallback } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { MagazinesTypes } from 'interfaces/magazine.type';
import BookmarkActiveIcon from 'components/Icons/BookmarkActiveIcon'
import BookmarkGrayIcon from 'components/Icons/BookmarkGrayIcon'

const Magazines = (props: any) => {
  const { navigation, magazines, bookmarkIds, handleBookmark } = props;

  const getBookmarked = useCallback((magazineId) => {
    return bookmarkIds?.some((id: string) => id === magazineId);
  }, [bookmarkIds])

  return (
    <Box flex={1}>
      {magazines?.map((data: MagazinesTypes, index: number) => {

        return (
          <Box key={data.magazineId} px={'16px'}>
            <Box
              py={'20px'}
              borderBottomWidth={
                index < magazines.length - 1 ? '1px' : 0
              }
              borderBottomColor={'gray.300'}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate('magazinePost', {
                    magazineId: data.magazineId,
                  })
                }
              >
                <Flex direction={'row'} flexBasis={'auto'}>
                  <Box flex={1} mr={'15px'}>
                    <Text size={'titleL'}>{data.title}</Text>
                    <Text size={'titleM'} mb={'5px'}>
                      {data.midTitle}
                    </Text>
                    <Text size={'textS'}>{data.smallTitle}</Text>
                  </Box>

                  <Box w={'108px'} h={'108px'} position={'relative'}>
                    <Image
                      style={{ width: 108, height: 108, borderRadius: 10 }}
                      source={{ uri: data.representThumbnailPath }}
                    />
                    <Pressable
                      onPress={() => handleBookmark(data.magazineId)}
                      position={'absolute'}
                      bottom={'5px'}
                      right={'5px'}
                    >
                      {getBookmarked(data.magazineId) ? (
                        <BookmarkActiveIcon />
                      ) : (
                        <BookmarkGrayIcon />
                      )}
                    </Pressable>
                  </Box>
                </Flex>
              </Pressable>
            </Box>
          </Box>
        )
      })}
    </Box>
  );
};

export default Magazines;
