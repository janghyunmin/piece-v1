import { useEffect, useRef, useState } from 'react';
import { WS_URL } from 'apis/config';
import { useQueryClient } from 'react-query';
import * as Haptics from 'expo-haptics';
import { StatusCodeType } from 'interfaces/auth.type';
import ReconnectingWebSocket from 'reconnecting-websocket';

// bskr_jhm 0614 Websocket 로직 변경
export default function (sessionId: string) {
  const [statusCode, setStatusCode] = useState<StatusCodeType>('PUR0100');
  const queryClient = useQueryClient();
  const ws: any = useRef(null);

  function connect() {
    useEffect(() => {
      ws.current = new ReconnectingWebSocket(
        `${WS_URL}/ws/purchase/${sessionId}`,
        [],
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
      // ws.current.onclose = (e: any) => console.log("ws error: ", e.code);
      // ws.current.onerror = (err: any) => console.log("ws error: ", err.message);
      
      // 서버로부터 데이터 수신
      ws.current.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        if (data.code) {
          Haptics.notificationAsync();
          setStatusCode(data.code);
          queryClient.invalidateQueries(['Deposit']);
          queryClient.invalidateQueries(['DepositHistory']);
          queryClient.invalidateQueries(['Portfolio']);
          queryClient.invalidateQueries(['Purchases', 'PUS0102']);
        }
      };
      ws.current.onclose = (e: any) => {
        console.log('소켓이 닫혀있습니다. 1초 후에 다시 연결을 시도합니다.', e.reason);
        setTimeout(function() {
          connect();
        }, 1000);
      };

      // return () => {
      //   ws.current.close();
      // }
      ws.current.onerror = (err: any) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.close();
      };
    }, [sessionId]);
  }
  connect();

  return statusCode;
}