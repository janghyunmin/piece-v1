import axios from 'axios';
import instance from 'apis/config'

// 보드 리스트
export const getBoardList = async (params: {
  board_type: string,
  board_category?: string,
  limit: number,
  offset: number,
}) => {
  const { data } = await instance.get(`/board`, { params });
  console.log('-----------------------------------------------------')
  console.log('/board get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 게시물 조회
export const getBoard = async (_boardId: string) => {
  const { data } = await instance.get(`/board/${_boardId}`);
  console.log('-----------------------------------------------------')
  console.log('/board/{board_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 이벤트
export const getEvent = async () => {
  const { data } = await instance.get(`/event`);
  console.log('-----------------------------------------------------')
  console.log('/event get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 이벤트 상세
export const getEventDetail = async (_eventId: string) => {
  const { data } = await instance.get(`/event/${_eventId}`);
  console.log('-----------------------------------------------------')
  console.log('/event/{event_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 팝업
export const getPopup = async () => {
  const { data } = await instance.get(`/popup`, { params: { popup_type: 'POP0102' }});
  console.log('-----------------------------------------------------')
  console.log('/popup type POP0102 call..');
  console.log('-----------------------------------------------------')
  return data;
}
