import React from 'react';

import * as Linking from 'expo-linking';

import { Box, ScrollView, Text } from 'native-base'

import Layout from 'components/Layout';
import GoBack from 'components/GoBack';
import { useQuery } from 'react-query';
import { getEventDetail } from 'apis/Board';
import { Dimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import Storage from '@react-native-async-storage/async-storage'

const width = Dimensions.get("screen").width

const EventInner = ({ navigation, route }: any) => {
  const { eventId } = route.params;
  // console.log('이벤트 디테일 : ' + JSON.stringify(route.params.title));
  const { data } = useQuery(
    ['EventDetail', eventId],
    () => getEventDetail(eventId),
    {
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['EventDetail', eventId] });
      },
      cacheTime: 0,
    }
  );


  return (
    <Layout>
      <GoBack
        navigation={navigation}
        itemTitle={route.params.title}
        shared={Linking.createURL(`event/${eventId}`)}
        onBack={() => {
          if (navigation.getState().index) navigation.goBack();
          else {
            Storage.getItem('@auth').then((auth) => {
              if (auth) {
                return navigation.reset({ routes: [{ name: 'login' }] });
              }
              return navigation.reset({ routes: [{ name: 'Start' }] });
            })
          }
        }}
      />
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <Box>
          {/*<Box*/}
          {/*  mx={"16px"}*/}
          {/*  borderBottomWidth={"1px"}*/}
          {/*  borderBottomColor={"gray.200"}*/}
          {/*  mb={"20px"}*/}
          {/*>*/}
          {/*  <Text size={"titleL"} color={"black"} mb={"5px"}>*/}
          {/*    {data?.title}*/}
          {/*  </Text>*/}
          {/*  <Text size={"captionM"} mb={"20px"} color={"gray.500"}>*/}
          {/*    {formatDate(data?.createdAt)}*/}
          {/*  </Text>*/}
          {/*</Box>*/}

          <Box h="auto">
            {data?.contents.startsWith("<") ? (
              <RenderHtml
                source={{ html: data?.contents }}
                baseStyle={{
                  fontSize: "16px",
                }}
                tagsStyles={{
                  img: {
                    objectFit: "contain",
                    width: `${width}px`,
                  },
                  div: {
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                }}
              />
            ) : (
              <Text size={"textM"} color={"gray.600"}>
                {data?.contents}
              </Text>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default EventInner;
