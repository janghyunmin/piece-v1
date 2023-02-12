import axios from "axios";

import { get_member_id } from "utils/getMemberId";
import instance from 'apis/config'

// 예치금 조회
export const getDepositBalance = async () => {
  const { data } = await instance.get(
    `/deposit/balance/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/deposit/balance/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 예치금 이력 조회
export const getDepositHistory = async (params: {history_type: string, limit: number; offset: number;}) => {
  const { data } = await instance.get(
    `/deposit/history/${await get_member_id()}`,
    { params },
  );
  console.log('-----------------------------------------------------')
  console.log('/deposit/history/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 예치금 입금
export const postDeposit = async (body: number) => {
  const _body = {
    changeAmount: body,
    changeReason: "MDR0101",
  };

  const { data } = await instance.post(
    `/deposit/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/deposit/{member_id} post call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 예치금 출금
export const postDepositWithdraw = async (body: number) => {
  const _body = {
    changeAmount: body,
    changeReason: "MDR0102",
  };

  const { data } = await instance.post(
    `/deposit/withdraw/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/deposit/withdraw/{member_id} post call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 예치금 출금 신청
export const withdrawDeposit = async (withdrawRequestAmount: number) => {
  const body = {
    withdrawRequestAmount,
  }
  const { data } = await instance.post(
    `/deposit/withdraw/${await get_member_id()}`,
    body,
  );
  console.log('-----------------------------------------------------')
  console.log('/deposit/withdraw/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
}