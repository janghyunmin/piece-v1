import React, { Fragment, useEffect, useState } from "react";

import { ScrollView } from "native-base";

import Layout from "components/Layout";
import GoBack from "components/GoBack";

import AnnouncementElement from "./_fragments/AnnouncementElement";

import { AnnouncementType } from "interfaces/mypage.type";
import { getBoardList } from "apis/Board";
import { useInfiniteQuery } from 'react-query'

const Announcement = ({ navigation }: any) => {

  const {
    data: boardList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['Boards', 'BRT02'],
    async ({ pageParam: offset = 0 }) => {
      const limit = 20;
      const data = await getBoardList({
        board_type: 'BRT02',
        limit,
        offset,
      });
      return {
        ...data,
        limit,
        offset,
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count > lastPage.offset+lastPage.limit) return lastPage.offset+lastPage.limit;
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError', { queryKey: ['Boards', 'BRT02'] });
      },
      keepPreviousData: false,
      cacheTime: 0,
    }
  )

  return (
    <Layout>
      <GoBack navigation={navigation} title={"공지사항"} />
      <ScrollView
        onScrollEndDrag={() => hasNextPage && fetchNextPage()}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        {boardList?.pages.flatMap((page) => page.data)?.map((item: AnnouncementType, index: number) => (
          <Fragment key={index}>
            <AnnouncementElement
              item={item}
              index={index}
              navigation={navigation}
            />
          </Fragment>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Announcement;
