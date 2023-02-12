import instance from 'apis/config';

// 약관리스트
export const getConsentList = async (consentGroup = '') => {
  const { data } = await instance.get(`/consent`, { params: { group: consentGroup }});
  console.log('-----------------------------------------------------')
  console.log('/consent get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 약관 상세
export const getConsentDetail = async (consentCode: string) => {
  const { data } = await instance.get(`/consent/${consentCode}`);
  console.log('-----------------------------------------------------')
  console.log('/consent/${consentCode} get call..');
  console.log('-----------------------------------------------------')
  return data;
};
