import instance from 'apis/config'
import Storage from '@react-native-async-storage/async-storage'


export const getAuth = async () => {
  const auth = await Storage.getItem('@auth');
  const deviceId = await Storage.getItem('@deviceId');

  const headers = {
    grantType: 'client_credentials',
    deviceId: deviceId!,
    memberId: JSON.parse(auth!)?.memberId,
    accessToken: `Bearer ${JSON.parse(auth!)?.accessToken}`,
  };

  const { data } = await instance.get(`/auth`, { headers });
  console.log('/auth get call..')
  return data;
}


export const refreshAuth = async () => {
  const auth = await Storage.getItem('@auth');
  const deviceId = await Storage.getItem('@deviceId');

  const headers = {
    grantType: 'refresh_token',
    deviceId: deviceId!,
    memberId: JSON.parse(auth!)?.memberId,
    accessToken: `Bearer ${JSON.parse(auth!)?.accessToken}`,
    refreshToken: JSON.parse(auth!)?.refreshToken,
  };

  const { data } = await instance.put(`/auth`, {}, { headers });
  console.log('/auth put call..')
  return data;
}
