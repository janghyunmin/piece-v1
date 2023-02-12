import axios from 'axios';

import { get_member_id } from 'utils/getMemberId';
import { CreatePurchaseRequestType } from './purchase.type';
import instance from 'apis/config'


// 포트폴리오 조회
export const getPurchases = async (params: {purchase_state?: string, portfolio_id?: string}) => {
  const { data } = await instance.get(
    `/purchase/member/${await get_member_id()}`,
    { params },
  )
  console.log('/purchase/member/{member_id} get call.. ' + JSON.stringify(data))
  return data;
}

// 유저 구매 내역 상세 조회
export const getPurchase = async (purchaseId: string) => {
  const { data } = await instance.get(
    `/purchase/member/${await get_member_id()}/${purchaseId}`,
  )
  console.log('/purchase/member/{member_id}/{purchase_id} get call..')
  return data;
}

// 포트폴리오 구매
export const createPurchase = async (
  _portfolioId: string,
  _body: CreatePurchaseRequestType
) => {
  const { data } = await instance.post(
    `/purchase/portfolio/${_portfolioId}/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/purchase/portfolio/{portfolio_id}/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 포트폴리오 구매 수량 조회
export const getPurchaseTotalVolume = async () => {
  const { data } = await instance.get(
    `/purchase/portfolio/${await get_member_id()}`
  );
  // const { data } = await instance.get(
  //   `/purchase/portfolio/${await get_member_id()}`
  // );
  console.log('-----------------------------------------------------')
  console.log('/purchase/portfolio/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 포트폴리오 구매 취소
export const cancelPurchase = async (body: {portfolioId: string, purchaseId: string}) => {
  const { data } = await instance.put(
    `/purchase/portfolio/${body.portfolioId}/${await get_member_id()}/${body.purchaseId}`,
  )
  console.log('-----------------------------------------------------')
  console.log('/purchase/portfolio/${body.portfolioId}/{member_id}/${body.purchaseId} put call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 포트폴리오 소유증서 받기
export const sendPurchaseDocument = async (body: {
  memberId: string;
  purchaseId: string;
  sendMethod: string;
}) => {
  const { data } = await instance.post(
    `/purchase/document/send`,
    body,
  )
  console.log('-----------------------------------------------------')
  console.log('/purchase/document/send post call..')
  console.log('-----------------------------------------------------')
  return data;
}