export interface PostCreateMemberType {
  name: string;
  cellPhoneNo: string;
  birthDay: string;
  ci: string;
  di: string;
  gender: string;
  pinNumber: string;
  consents: {
    consentCode: string;
    isAgreement: string;
  }[];
  device: {
    deviceOs: string;
    fcmToken: string | null;
  };
}

export interface UpdateMemberType {
  zipCode?: string;
  baseAddress?: string;
  detailAddress?: string;
  isFido?: string;
  email?: string;
}

export interface PostExistingMember {
  name: string;
  email: string;
}

export interface CheckExistingMember {
  name: string;
  email: string;
}

export interface UpdateMemberReauthType {
  name: string;
  cellPhoneNo: string;
  birthDay: string;
  ci: string;
  di: string;
  gender: string;
  token: string;
  consents: any;
}
