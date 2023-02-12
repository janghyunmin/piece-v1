import axios, { AxiosRequestConfig } from 'axios';
import Storage from '@react-native-async-storage/async-storage';
import axiosRetry from 'axios-retry'
import { getEnvVars } from 'utils/environment'

export const { API_URL, WS_URL, WEBVIEW_URL } = getEnvVars();

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
  return setAuthHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRetry(instance, { retries: 3 });

const getAccessToken = async () => {
  const auth = await Storage.getItem('@auth');
  if (!auth) return;
  return JSON.parse(auth).accessToken;
};

const setAuthHeader = async (config: AxiosRequestConfig) => {
  const accessToken = await getAccessToken();
  if (accessToken && config.headers) {
    config.headers.accessToken = `Bearer ${accessToken}`;
  }
  return config;
};

const unsetAuthHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

export { setAuthHeader, unsetAuthHeader, getAccessToken };
export default instance;
