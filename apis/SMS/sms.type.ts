export interface RequestSmsType {
  name: string;
  birthday: string;
  sexCd: string;
  ntvFrnrCd: string;
  telComCd: string;
  telNo: string;
  agree1: string;
  agree2: string;
  agree3: string;
  agree4: string;
}

export interface RequestVerifySmsType {
  txSeqNo: string;
  otpNo: string;
  telNo: string;
}

export interface RequestWithdrawalType {
  withdrawalReasonCode: string;
  withdrawalReasonText?: string;
}