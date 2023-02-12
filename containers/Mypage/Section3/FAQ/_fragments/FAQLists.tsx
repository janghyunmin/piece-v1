import React, { Fragment } from 'react';

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { FaqList, FaqListProps } from 'interfaces/mypage.type';
import DownGrayIcon from 'components/Icons/DownGrayIcon';
import UpGrayIcon from 'components/Icons/UpGrayIcon';

const FAQLists = (props: FaqListProps) => {
  const { boardList, openBoardList, handleOpen } = props;

  return (
    <>
      {boardList?.map((data: any) => (
        <Fragment key={data.boardId}>
          <Pressable onPress={() => handleOpen(data.boardId)} px={'16px'}>
            <Flex
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              py={'20px'}
              borderBottomWidth={'1px'}
              borderBottomColor={'gray.200'}
            >
              <Text flex={1} size={'textM'} color={'gray.600'}>
                {data.title}
              </Text>
              <Box>
                {openBoardList.includes(data.boardId) ? <UpGrayIcon /> : <DownGrayIcon />}
              </Box>
            </Flex>
          </Pressable>

          {openBoardList.includes(data.boardId) && (
            <Box bgColor={'gray.200'} px={'16px'} py={'20px'}>
              <Text size={'titleM'} mb={'20px'} color={'gray.600'}>
                {data.title}
              </Text>
              <Text size={'textM'} color={'gray.600'}>
                {data.contents}
              </Text>
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default FAQLists;
