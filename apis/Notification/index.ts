import axios from 'axios';

import { get_member_id } from 'utils/getMemberId';
import instance from 'apis/config'

// 알림 리스트 조회
export const getNotificationList = async (params: {
  notification_type: string,
  limit: number;
  offset: number;
}) => {
  const { data } = await instance.get(
    `/notification/${await get_member_id()}`,
    { params }
  );
  console.log('-----------------------------------------------------')
  console.log('/notification/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 알림 상태 조회
export const getNotificationStatus = async () => {
  const { data } = await instance.get(
    `/notification/is_read/${await get_member_id()}`,
  )
  console.log('-----------------------------------------------------')
  console.log('/notification/is_read/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 알림 상태 업데이트
export const updateNotificationStatus = async (notificationType: string) => {
  const { data } = await instance.patch(
    `/notification/is_read/${await get_member_id()}`,
    { notificationType },
  )
  console.log('-----------------------------------------------------')
  console.log('/notification/is_read/{member_id} patch call..');
  console.log('-----------------------------------------------------')
  return data;
}