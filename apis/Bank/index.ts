import { get_member_id } from 'utils/getMemberId'
import instance from 'apis/config'

// 휴대전화 점유 인증 요청
export const sendBankVerificationCode = async () => {
  const { data } = await instance.post(`/bank/occupation/${await get_member_id()}`);
  console.log('-----------------------------------------------------')
  console.log('/bank/occupation/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
}


export const confirmBankVerificationCode = async (authNo: string, mchtTrdNo: string) => {
  const { data } = await instance.post(`/bank/occupation/${await get_member_id()}/${authNo}/${mchtTrdNo}`);
  console.log('-----------------------------------------------------')
  console.log('/bank/occupation/{member_id}/{authNo}/{mchtTrdNo} post call..');
  console.log('-----------------------------------------------------')
  return data;
}

export const createBankAccount = async (mchtTrdNo: string, body: { trdAmt: string }) => {
  const { data } = await instance.post(`/bank/creation/${await get_member_id()}/${mchtTrdNo}`, body);
  console.log('-----------------------------------------------------')
  console.log('/bank/creation/{member_id}/{mchtTrdNo} post call..')
  console.log('-----------------------------------------------------')
  return data;
}