export interface BanksProps {
  id: number;
  name: string;
  code: string;
  image: string;
}

export interface BanksListProps {
  navigation: any;
  banks: BanksProps[][];
  isCreate: boolean;
}

export interface RegisterBankAccountProps {
  name: string;
  bankAccountFocus: boolean;
  bankAccount: string;
  setBankAccountFocus: (bool: boolean) => void;
  setBankAccount: (str: string) => void;
  bankAccountIncorrect: string;
}

export interface RegisterChangeBankAccountProps {
  handleGoBack: () => void;
  image: number;
  bankName: string;
}

export interface RegisterBankAccountFooterBtnProps {
  registerUserAccount: () => void;
  formFilled: boolean;
  isCreate: boolean;
  isLoading: boolean;
}

export interface BankAccountCompleteTopContainerProps {
  accountChecked: boolean;
}

export interface BankAccountCompleteBottomContainerProps {
  accountChecked: boolean;
  handleGoBack: () => void;
}

export interface RegisterCompleteBottomContinerProps {
  accountInfo: { bankAccount: string; bankName: string; image: number };
  handleGoBack: () => void;
}

// export interface HistoryType {
//   changeAmount: number;
//   chagneReason: string;
//   createdAt: string;
//   remainAmount: number;
// }
export interface HistoryType {
  changeAmount: number;
  chagneReason: string;
  createdAt: string;
  remainAmount: number;
}
