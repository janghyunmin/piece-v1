import React, { useState } from 'react';

import { ScrollView } from 'native-base';

import Layout from 'components/Layout';
import Title from './_fragments/Title';
import Nav from './_fragments/Nav';
import FAQLists from './_fragments/FAQLists';

import { getBoardList } from 'apis/Board';
import { useInfiniteQuery } from 'react-query';
import GoBack from 'components/GoBack'

const Faq = ({ navigation }: any) => {
  const categoryList = [
    {title: '전체', boardCategory: ''},
    {title: '회원', boardCategory: 'BRT0301'},
    {title: '구매', boardCategory: 'BRT0302'},
    {title: '분배', boardCategory: 'BRT0303'},
  ];
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategory = (boardCategory: string) => {
    const tempCategory = categoryList.find((category) => (
      category.boardCategory === boardCategory
    ));
    setSelectedCategory(tempCategory ? tempCategory.boardCategory : '');
    setOpenedBoardList([]);
  }
  const [openedBoardList, setOpenedBoardList] = useState<string[]>([]);

  const {
    data: boardList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['Boards', 'BRT03', selectedCategory],
    async ({ pageParam: offset = 0 }) => {
      const limit = 10;
      const data = await getBoardList({
        board_type: 'BRT03',
        board_category: selectedCategory,
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
        navigation.navigate('NetworkError', { queryKey: ['Boards', 'BRT03', selectedCategory] });
      },
      keepPreviousData: false,
      cacheTime: 0,
    }
  )

  const handleOpen = (boardId: string) => {
    if (openedBoardList.includes(boardId)) {
      setOpenedBoardList((cur) => cur.filter(c => c !== boardId));
      return;
    }
    setOpenedBoardList((cur) => cur.concat(boardId));
  }

  return (
    <Layout>
      <GoBack navigation={navigation} title={'자주 묻는 질문'} />
      <ScrollView
        onScrollEndDrag={() => hasNextPage && fetchNextPage()}
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        contentInsetAdjustmentBehavior={'always'}
      >
        <Title navigation={navigation} />

        <Nav categoryList={categoryList} handleCategory={handleCategory} selectedCategory={selectedCategory} />

        <FAQLists
          boardList={boardList?.pages.flatMap((page) => page.data)}
          openBoardList={openedBoardList}
          handleOpen={handleOpen}
        />
      </ScrollView>
    </Layout>
  );
};

export default Faq;
