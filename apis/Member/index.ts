import {
  PostCreateMemberType,
  PostExistingMember,
  UpdateMemberReauthType, UpdateMemberType,
} from './member.type'
import instance from "apis/config";
import axios from "axios";

import { get_member_id } from 'utils/getMemberId';
import { RequestVerifySmsType, RequestWithdrawalType } from 'apis/SMS/sms.type'

// 인증번호 => 이미 존재하는 회원인지
export const getIsDi = async (di: string) => {
  let body = {
    di: di,
  };
  const { data } = await instance.post(`/member/is_di`, body);
  console.log('-----------------------------------------------------')
  console.log('/member/is_di post call...');
  console.log('-----------------------------------------------------')
  return data;
};

// 회원가입
export const postMemberJoin = async (_body: PostCreateMemberType) => {
  const { data } = await instance.post(`/member/join`, _body);
  console.log('-----------------------------------------------------')
  console.log('/member/join post call..' + JSON.stringify(_body));
  console.log('return data : ' + JSON.stringify(data));
  console.log('-----------------------------------------------------')
  return data;
};

// 가입회원인지 조회 (사용안함)
export const postExistingMember = async (_body: PostExistingMember) => {
  const { data } = await instance.post(`/member/check`, _body);
  return data;
};

// 기존 유저 확인
export const checkExistingMember = async (_body: PostExistingMember) => {
  const { data } = await instance.post(`/member/is_existing`, _body);
  console.log('-----------------------------------------------------')
  console.log('/member/is_existing post call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 가입회원일때 정보 업데이트 (사용안함)
export const patchExistingMember = async (_body: PostExistingMember) => {
  const { data } = await instance.patch(
    `/member/existence/${await get_member_id()}`,
    _body
  );
  return data;
};

// 회원정보 조회
export const getMember = async () => {
  const { data } = await instance.get(
    `/member/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/member/{member_id} get call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 회원정보 수정
export const updateMember = async (_body: UpdateMemberType) => {
  const { data } = await instance.put(
    `/member/${await get_member_id()}`,
    _body,
  );
  console.log('-----------------------------------------------------')
  console.log('/member/{member_id} put call..')
  console.log('-----------------------------------------------------')
  return data;
}

// 알림 설정 목록
export const getMemberNotification = async () => {
  const { data } = await instance.get(
    `/member/notification/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/member/notification/{member_id} get call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 알림 설정 변경
export const updateMemberNotification = async (_body: any) => {
  const { data } = await instance.patch(
    `/member/notification/${await get_member_id()}`,
    _body,
  )
  console.log('-----------------------------------------------------')
  console.log('/member/notification/{member_id} patch call.. ')
  console.log('-----------------------------------------------------')
  return data;
}

// // 자산변동 알림여부
// export const updateMemberNotificationAsset = async (body: {
//   assetNotification: string;
// }) => {
//   const { status } = await instance.patch(
//     `/member/notification/asset/${await get_member_id()}`,
//     body
//   );
//   return status;
// };
//
// // 포트폴리오 알림여부
// export const updateMemberNotificationPortfolio = async (body: {
//   portfolioNotification: string;
// }) => {
//   const { status } = await instance.patch(
//     `/member/notification/portfolio/${await get_member_id()}`,
//     body
//   );
//   return status;
// };
//
// // 문자알림 여부
// export const updateMemberNotificationSms = async (body: {
//   marketingSms: string;
// }) => {
//   const { status } = await instance.patch(
//     `/member/notification/sms/${await get_member_id()}`,
//     body
//   );
//   return status;
// };
//
// // 앱 알림 여부
// export const updateMemberNotificationApp = async (body: {
//   marketingApp: string;
// }) => {
//   const { status } = await instance.patch(
//     `/member/notification/app/${await get_member_id()}`,
//     body
//   );
//   return status;
// };

// 간편 비밀번호 확인
export const postMemberPinVerification = async (_body: {
  pinNumber: string;
}) => {
  const { data } = await instance.post(
    `/member/pin/${await get_member_id()}/verification`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/pin/{member_id}/verification post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 간편 비밀번호 변경
export const postMemberPin = async (_body: { pinNumber: string }) => {
  const { data } = await instance.post(
    `/member/pin/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/pin/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 생체인증 여부
export const getMemberFido = async () => {
  const { data } = await instance.get(
    `/member/fido/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/member/fido/{member_id} get call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 생체인증 변경
export const updateMemberFido = async (_body: { isFido: string }) => {
  const { data } = await instance.patch(
    `/member/fido/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/fido/{member_id} patch call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 계좌 등록
export const createMemberAccount = async (_body: {
  bankCode: string;
  accountNo: string;
}) => {
  const { data } = await instance.post(
    `/member/account/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/account/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 계좌 변경
export const updateMemberAccount = async (_body: {
  bankCode: string;
  accountNo: string;
}) => {
  const { data } = await instance.put(
    `/member/account/${await get_member_id()}`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/account/{member_id} put call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 회원 계좌 조회
export const getMemberAccount = async () => {
  const { data } = await instance.get(
    `/member/account/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/member/account/{member_id} get call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 유저 재인증
export const updateMemberReauth = async (_body: UpdateMemberReauthType) => {
  const { data } = await instance.patch(
    `/member/${await get_member_id()}/reauth`,
    _body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/{member_id}/reauth patch call..')
  console.log('-----------------------------------------------------')
  return data;
};

// 유저 북마크 리스트
export const getMemberBookmark = async () => {
  const { data } = await instance.get(
    `/member/bookmark/${await get_member_id()}`
  );
  console.log('-----------------------------------------------------')
  console.log('/member/bookmark/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 유저 북마크 등록
export const postMemberBookmark = async (_body: string) => {
  const body = {
    magazineId: _body,
  };

  const { data } = await instance.post(
    `/member/bookmark/${await get_member_id()}`,
    body
  );
  console.log('-----------------------------------------------------')
  console.log('/member/bookmark/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 유저 북마크 삭제
export const deleteMemberBookmark = async (_body: string) => {
  const body = {
    magazineId: _body,
  };

  const { data } = await instance.delete(
    `/member/bookmark/${await get_member_id()}`,
    { data: body }
  );
  console.log('-----------------------------------------------------')
  console.log('/member/bookmark/{member_id} delete call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 인증번호 확인
export const verifySms = async (body: RequestVerifySmsType) => {
  const { data } = await instance.post(`/member/kcbauth/verify_sms`, body);
  console.log('-----------------------------------------------------')
  console.log('/member/kcbauth/verify_sms post call..' + JSON.stringify(body));
  console.log(JSON.stringify(data));
  console.log('-----------------------------------------------------')
  return data;
};

// 회원 탈퇴
export const withdrawalMember = async (body: RequestWithdrawalType) => {
  const { data } = await instance.post(`/member/withdrawal/${await get_member_id()}`, body);
  console.log('-----------------------------------------------------')
  console.log('/member/withdrawal/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 포트폴리오 알림상태
export const getPortfolioAlarm = async (portfolioId: string) => {
  const { data } = await instance.get(`/member/notification/${await get_member_id()}/portfolio/${portfolioId}`);
  console.log('-----------------------------------------------------')
  console.log('/member/notification/{member_id}/portfolio/{portfolio_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 포트폴리오 알림상태 변경
export const updatePortfolioAlarm = async (portfolioId: string) => {
  const { data } = await instance.post(`/member/notification/${await get_member_id()}/portfolio/${portfolioId}`, {
    portfolioId: portfolioId,
    memberId: await get_member_id(),
  });
  console.log('-----------------------------------------------------')
  console.log('/member/notification/{member_id}/portfolio/{portfolio_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 멤버 약관 동의 여부
export const getMemberConsentList = async () => {
  const { data } = await instance.get(`/member/consent/${await get_member_id()}`);
  console.log('-----------------------------------------------------')
  console.log('/member/consent/{member_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
}

// 멤버 약관 동의 수정
export const updateMemberConsent = async (body: { consentCode: string, isAgreement: 'Y'|'N' }) => {
  const { data } = await instance.put(`/member/consent/${await get_member_id()}`, body);
  console.log('-----------------------------------------------------')
  console.log('/member/consent/{member_id} put call..');
  console.log('-----------------------------------------------------')
  return data;
}

export const updateMemberDevice = async (body: {
  deviceId: string;
  deviceOs: string;
  fcmToken: string | null;
}) => {
  const { data } = await instance.post(`/member/device/${await get_member_id()}`, body);
  console.log('-----------------------------------------------------')
  console.log('/member/device/{member_id} post call..');
  console.log('-----------------------------------------------------')
  return data;
}
