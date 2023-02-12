import { EventType } from "apis/Board/board.type";

export interface MyInfoData {
  info: string;
  title: string;
}

export interface AnnouncementType {
  isOpen: boolean;
  boardType: string;
  boardCategory: string;
  title: string;
  contents: string;
  boardId: string;
  cdnFileName: null | string;
  cdnFilePath: null | string;
  createdAt: string;
}

export interface AnnouncementElementProps {
  item: AnnouncementType;
  index: number;
  navigation: any;
}

export interface MyInfoSection2Props {
  navigation: any;
  address: string;
  detailAddress: string;
}

// export interface EventType {
//   source: number;
//   status: '진행' | '종료';
// }

export interface EventCardProps {
  event: EventType[];
  navigation: any;
}

export interface AlarmData {
  id: string;
  title: string;
  selected: boolean;
  subTitle?: string;
}

export interface AlarmSectionProps {
  data: AlarmData[];
  handleToggle: (id: string) => void;
  section: number;
}

export interface EssentialItemsProps {
  essentialConsentList: ConsentData[];
  navigation: any;
}

export interface OptionalItemsProps {
  optionalConsentList: ConsentData[];
  memberConsentList: MemberConsentData[];
}

export interface ConsentData {
  consentTitle: string;
  consentCode: string;
  consentGroup: string;
  createdAt: string;
  isMandatory: string;
}

export interface MemberConsentData {
  consentCode: string;
  isAgreement: string;
}


export interface WithToggleProps {
  toggle: boolean;
  handleToggle: () => void;
  navigation?: any;
  deviceBio?: number;
}

export interface FaqCategoryType {
  boardCategory: string;
  boardId: string;
  boardType: string;
  cdnFileName: null | string;
  cdnFilePath: null | string;
  contents: string;
  createdAt: string;
  title: string;
  selected: boolean;
}

export interface FaqNavProps {
  categoryList: {title: string, boardCategory: string}[];
  selectedCategory: string;
  handleCategory: (boardCategory: string) => void;
}

export interface FaqList {
  boardCategory: string;
  boardId: string;
  boardType: string;
  contents: string;
  createdAt: string;
  files: any[];
  title: string;
  isOpen: boolean;
}

export interface FaqListProps {
  boardList: FaqList[] | undefined;
  openBoardList: string[];
  handleOpen: (boardId: string) => void;
}

export interface PolicyCarrierType {
  title: string;
  selected: boolean;
}

export interface PolicyTitleProps {
  title: string;
  carrier: PolicyCarrierType[];
  carrierSelect: (index: number) => void;
}

export interface WithdrawalReasonType {
  withdrawalReasonCode: string;
  title: string;
}

export interface WithdrawalReasonProps {
  reasonList: WithdrawalReasonType[];
  handleSelect: (reasonCode: string) => void;
  withdrawalReasonCode: string;
  withdrawalReasonText: string;
  setWithdrawalReasonText: (text: string) => void;
}

export interface Withdrawal1BottomBtnProps {
  navigation: any;
  buttonSelected: boolean;
  withdrawalReasonCode: string;
  withdrawalReasonText: string;
}
