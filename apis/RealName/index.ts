// 실명인증

import axios from 'axios'
import instance from 'apis/config'

const url = 'https://sznt8bz7j9.apigw.ntruss.com/piece-prod/v1';

export const requestRealName = async (body: any) => {
  const { data } = await instance.post(`/kcbauth/request_verify_realname`, body);
  console.log('-----------------------------------------------------')
  console.log('/kcbauth/request_verify_realname post call..');
  console.log('-----------------------------------------------------')
  return data;
}