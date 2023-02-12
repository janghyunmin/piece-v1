export interface LayoutProps {
  children: React.ReactNode;
  noStatusBar?: boolean;
  bottomTab?: boolean;
}

export interface RoundsProps {
  firstTop: number;
  firstLeft: number;
  firstWidth: number;
  secondTop: number;
  secondLeft: number;
  secondWidth: number;
}

export interface CheckInputProps {
  email: string;
  name: string;
  emailIncorrect: string;
  setEmailIncorrect: any;
}

export interface CheckButtonProps {
  haveAccount: boolean;
  setHaveAccount: (prev: boolean) => void;
}

export interface CheckFooterBtnProps {
  email: string;
  next: () => void;
}

export interface StartFooterBtnProps {
  width: number;
  navigation: any;
  startPiece: any;
}

export interface FormState {
  name: string;
  birthday: string;
  phone: string;
}

export interface FooterBtnProps {
  agreeAll: boolean;
  essentialOptions: boolean;
  handlePress: () => void;
  lookAround: () => void;
}

export interface AgreementProps {
  agreeAll: boolean;
  setAgreeAll: (prev: boolean) => void;
  setEssentialOptions: (prev: boolean) => void;
}

export interface AgreementsProps {
  title: string;
  selected: boolean;
  last?: boolean;
}

export interface FormsProps {
  scrollToEnd: () => void;
  navigation: any;
  form: any;
  errors: any;
  name: string;
  phone: string;
  birthday: string;
  onChangeText: (name: string, text: string) => void;
  gender: string[];
  genderSelected: string;
  setGenderSelected: (i: string) => void;
  carriers: string[];
  carrierSelected: string;
  nameIncorrect: string;
  setNameIncorrect: (i: string) => void;
  birthdayIncorrect: string;
  setBirthdayIncorrect: (i: string) => void;
  phoneIncorrect: string;
  setPhoneIncorrect: (i: string) => void;
  genderIncorrect: string;
  setGenderIncorrect: (i: string) => void;
  carrierIncorrect: string;
  setCarrierIncorrect: (i: string) => void;
}

export interface FormCarrierProps {
  navigation: any;
  carriers: string[];
  carrierSelected: string;
  carrierIncorrect: string;
}

export interface CertificationFooterBtnProps {
  formFilled: boolean;
  goToNextStep: () => void;
}

export interface NumberPadProps {
  randomPw1: number[];
  randomPw2: number[];
  randomPw3: number[];
  randomPw4: (number | string)[];
  pressPassword: (pw: number) => any;
  deletePassword: () => any;
  reset: () => void;
}

export interface PasswordBox {
  password: string;
  active: boolean;
}

export interface PasswordHeaderProps {
  navigation: any;
  passwordBox: PasswordBox[];
  passwordIncorrect: string;
  route?: any;
}

export type StatusCodeType = 'PUR0100'|'PUR0101'|'PUR0102'|'PUR0103'|'PUR0104'|'PRS0103';

export interface SignUpCompleteBottomProps {
  handleNext: () => void;
  success?: boolean;
  isLoading?: boolean;
}
