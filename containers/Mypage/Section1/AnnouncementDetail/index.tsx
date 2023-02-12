import React from "react";

import Layout from "components/Layout";
import GoBack from "components/GoBack";

import AnnouncementInner from "./_fragments/AnnouncementInner";
import { useQuery } from 'react-query'
import { getBoard } from 'apis/Board'
import usePageLoaded from 'hooks/usePageLoaded'
import Storage from '@react-native-async-storage/async-storage';


const Announcement = ({ navigation, route }: any) => {
  const pageLoaded = usePageLoaded();

  const {data} = useQuery(
    ['Boards', 'BRT02', route.params.boardId],
    () => getBoard(route.params.boardId),
  )

  return (
    <Layout bottomTab>
      <GoBack
        navigation={navigation}
        onBack={() => {
          if (navigation.getState().index) return navigation.goBack();
          else {
            Storage.getItem('@auth').then((auth) => {
              if (auth) {
                return navigation.reset({ routes: [{ name: 'login' }] });
              }
              return navigation.reset({ routes: [{ name: 'Start' }] })
            })
          }
        }}
      />
      {pageLoaded && data && (
        <AnnouncementInner item={data} />
      )}
    </Layout>
  );
};

export default Announcement;
