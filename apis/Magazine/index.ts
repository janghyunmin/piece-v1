import { get_member_id } from 'utils/getMemberId';
import instance from 'apis/config'
import url from 'apis/config';

// 매거진 리스트
export const getMagazineList = async (magazine_type: string, limit: number, offset: number) => {
  const params = {
    magazine_type,
    limit,
    offset,
  };
  const { data } = await instance.get(`/magazine`, { params });
  console.log('-----------------------------------------------------')
  console.log('/magazine get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 매거진 상세
export const getMagazineDetail = async (id: string) => {
  const { data } = await instance.get(`/magazine/${id}`);
  console.log('-----------------------------------------------------')
  console.log('/magazine/{magazine_id} get call.. ');
  console.log('-----------------------------------------------------')
  return data;
};

// 북마크 리스트
export const getMagazineBookmarkList = async () => {
  const { data } = await instance.get(
    `/magazine/bookmark/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/magezine/bookmark/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};
