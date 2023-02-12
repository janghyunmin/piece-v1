import instance from 'apis/config';

// 주소검색 api
export const postAddressData = async (keyword: string, page: number) => {
  const { data } = await instance.get(
    `/location?keyword=${keyword}&currentPage=${page}`
  );
  console.log('-----------------------------------------------------')
  console.log('/location?keyword=${keyword}&currentPage=${page} get call..');
  console.log('-----------------------------------------------------')
  return data;
};
