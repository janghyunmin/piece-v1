import React, { useRef, useState } from 'react';

import {
  Box,
  Center,
  Flex,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import { useMutation } from 'react-query';

import { postAddressData } from 'apis/Address';
import { AddressType } from 'interfaces/modal.type';
import ClearIcon from 'components/Icons/ClearIcon';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon'

const SearchAddress = ({ navigation, route }: any) => {
  const [address, setAddress] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<AddressType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const ref: any = useRef(null);

  const goNextPage = (item: AddressType) => {
    navigation.navigate(route.params.from, {
      ...route.params,
      next: {
        route: 'detailAddress',
        params: {
          ...route.params,
          roadAddress: item.roadAddr,
          jibun: item.jibunAddr,
          zipCode: item.zipCode,
        }
      },
    });
  }

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const getAddress = useMutation(
    (page: number) => postAddressData(address, page),
    {
      onSuccess: (res, page) => {
        const pageCount = 10;
        const totalPage = parseInt(
          String(parseInt(res.results.common.totalCount) / pageCount)) + (res.results.common.totalCount % pageCount ? 1 : 0
        );

        if (page === 1) {
          if (ref.current) ref.current.scrollTo({ y: 0 });
          setAddressData(res.results.juso ? res.results.juso : []);
        } else {
          setAddressData((cur) => cur.concat(res.results.juso ? res.results.juso : []));
        }
        if (totalPage === page) setHasNext(false);
        else setHasNext(true);
      },
  });

  return (
    <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
      <Box
        h={'86%'}
        bgColor={'white'}
        borderTopLeftRadius={'20px'}
        borderTopRightRadius={'20px'}
        pt={'30px'}
      >
        <Box px={'16px'}>
          <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={'30px'}
          >
            <Box w={'28px'} h={'28px'} />
            <Text size={'titleL'} color={'gray.800'}>
              주소 검색
            </Text>
            <Pressable
              w={'28px'}
              h={'28px'}
              justifyContent={'center'}
              alignItems={'center'}
              onPress={() => navigation.goBack()}
            >
              <CloseGrayIcon />
            </Pressable>
          </Flex>

          <Box position={'relative'}>
            <Input
              returnKeyType={'search'}
              onSubmitEditing={() => {
                getAddress.mutate(1);
                setPage(2);
                setIsSearch(true);
                setSelectedIndex(null);
              }}
              value={address}
              onChangeText={(text) => setAddress(text)}
              type="text"
              padding={0}
              variant={'underlined'}
              placeholder={'주소를 입력해 주세요'}
              h={'52px'}
            />
            {!!address && (
              <Pressable
                onPress={() => setAddress('')}
                h={'52px'}
                justifyContent={'center'}
                position={'absolute'}
                top={'0'}
                right={'16px'}
              >
                <ClearIcon />
              </Pressable>
            )}
          </Box>
        </Box>

        {addressData.length > 0 ? (
          <ScrollView
            ref={ref}
            // pt={'30px'}
            px={'16px'}
            bounces={false}
            onMomentumScrollEnd={() => {
              if (hasNext) {
                getAddress.mutate(page + 1);
                setPage((cur) => cur+1);
              }
            }}
            scrollIndicatorInsets={{ top: 1, bottom: 1 }}
            contentInsetAdjustmentBehavior={'always'}
          >
            {addressData?.map((item: AddressType, index: number) => (
              <Pressable
                onPress={() => goNextPage(item)}
                key={index}
                pt={'20px'}
                pb={'20px'}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.200'}
                bgColor={selectedIndex === index ? 'primary.100' : 'white'}
              >
                <Flex direction={'row'} alignItems={'center'} mb={'5px'}>
                  <Text w={'50px'} size={'captionM'} color={'gray.700'}>
                    도로명
                  </Text>
                  <Text flex={1} size={'titleM'} color={'gray.900'}>
                    {item.roadAddr}
                  </Text>
                </Flex>
                <Flex direction={'row'} alignItems={'center'}>
                  <Text w={'50px'} size={'captionM'} color={'gray.700'}>
                    지번
                  </Text>
                  <Text flex={1} size={'textS'} color={'gray.800'}>
                    {item.jibunAddr}
                  </Text>
                </Flex>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <Center flex={1}>
            <Text size={'textM'} color={'gray.500'}>
              {isSearch && '검색된 결과가 없어요.'}
            </Text>
          </Center>
        )}
      </Box>
    </Flex>
  );
};

export default SearchAddress;
