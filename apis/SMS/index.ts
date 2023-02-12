import instance from 'apis/config';

import axios from 'axios';

import { RequestSmsType, RequestVerifySmsType } from './sms.type';

// sms 발송
export const requestSms = async (body: RequestSmsType) => {
  const { data } = await instance.post(`/kcbauth/request_sms`, body);
  console.log('-----------------------------------------------------')
  console.log('/kcbauth/request_sms post call..'+ JSON.stringify(body));
  console.log
  console.log('-----------------------------------------------------')
  return data;
};

// sms 재발송
export const requestRetrySms = async (body: RequestSmsType) => {
  const { data } = await instance.post(`/kcbauth/request_sms`, body);
  console.log('-----------------------------------------------------')
  console.log('/kcbauth/request_sms post 재발송 call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 인증번호 확인
export const requestVerifySms = async (body: RequestVerifySmsType) => {
  const { data } = await instance.post(`/kcbauth/request_verify_sms`, body);
  console.log('-----------------------------------------------------')
  console.log('/kcbauth/request_verify_sms post call..');
  console.log('-----------------------------------------------------')
  return data;
};