import { useEffect, useRef } from 'react';
import { WS_URL } from 'apis/config';
import { addAmount, fullAmount, initAmount, setRecruitmentAmount } from 'features/portfolioSlice';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import * as Haptics from 'expo-haptics';
import ReconnectingWebSocket from 'reconnecting-websocket';


// bskr_jhm 0614 Websocket 로직 변경
export default function (portfolioData: any) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const ws: any = useRef(null);

  useEffect(() => {
    if (portfolioData) {
      dispatch(setRecruitmentAmount(portfolioData.recruitmentAmount));
      ws.current = new ReconnectingWebSocket(
        `${WS_URL}/ws/portfolio/${portfolioData.portfolioId}`,
        [] ,
        {
          maxReconnectionDelay: 10000, // 재연결 사이의 최대 지연 시간
          minReconnectionDelay: 1500, // 재연결 사이의 최소 지연 시간
          connectionTimeout: 2000, // 이시간 이후에 연결되지 않으면 연결 재시도
          maxRetries: 50, // 최대 재시도 횟수
        },
      );

      ws.current.onopen = () => {
        console.log('ws opened')
      }
      ws.current.onclose = (e: any) => console.log('ws close: ', e.code);
      ws.current.onerror = (err: any) => console.log("ws error: ", err.message);

      ws.current.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        if (Object.keys(data).includes('totalAmount')) {
          if (['PRS0101', 'PRS0102'].includes(portfolioData.recruitmentState)) {
            dispatch(initAmount(data.totalAmount));
          } else {
            dispatch(initAmount(portfolioData.recruitmentAmount));
          }
        } else if (Object.keys(data).includes('amount')) {
          dispatch(addAmount(data.amount));
        } else if (Object.keys(data).includes('recruitment_state')) {
          queryClient.setQueryData(
            ['Portfolio', portfolioData.portfolioId],
            (cur: any) => ({
              ...cur,
              recruitmentState: data.recruitment_state,
            })
          );
          if (data.recruitment_state === 'PRS0103') {
            dispatch(fullAmount());
          }
          Haptics.notificationAsync();
        }
      };
      return () => {
        ws.current.close();
        dispatch(initAmount(0));
      }
    }
  }, [portfolioData?.portfolioId]);
}