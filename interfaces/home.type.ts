import { PortfolioListType } from "apis/Portfolio/portfolio.type";

export interface AlarmProps {
  showModal: boolean;
  setShowModal: (prev: boolean) => void;
}

export interface NoAlertProps {
  selected: string;
  isAlert: boolean;
  isPromotion: boolean;
}

export type PortfolioStatus =
  | "PRS0101"
  | "PRS0102"
  | "PRS0103"
  | "PRS0104"
  | "PRS0105"
  | "PRS0106"
  | "PRS0107"
  | "PRS0108"
  | "PRS0109"
  | "PRS0110"
  | "PRS0111";

export interface PortfolioType {
  id: number;
  title: string;
  sub_title: string;
  status: PortfolioStatus;
  text: string;
  percentage: string;
  price: string;
  image: any;
  // vatRate: number;
}

export interface PortfolioCardType {
  item: PortfolioType;
  navigation: any;
}

// 공유하기 기능을 위해 portfolioTitle 추가 bskr_jhm 0513
export interface PortfolioHeaderProps {
  navigation: any;
  scrollY?: any;
  headerAnimated?: boolean;
  backgroundAnim?: any;
  portfolioId: string;
  portfolioTitle: any;
  shareUrl?: string;
}

export interface PortfolioTopProps {
  navigation: any;
  scrollY?: any;
  item: PortfolioListType;
  portfolioId: string;
  imagePath?: string;
  headerAnimated?: boolean;
  backgroundAnim?: any;
}

export interface PortfolioFooterFixedProps {
  item: PortfolioListType;
  status?: PortfolioStatus;
  navigation: any;
}
export interface AlarmCategoryType {
  title: string;
  selected: boolean;
}

export interface AlarmContentsType {
  createdAt: string;
  isRead: string;
  message: string;
  notificationType: string;
  referralTarget: string;
  title: string;
  showDate: boolean;
  date: string;
  alert: any[];
}

export interface AlarmCategoryProps {
  categorySelect: (index: number) => void;
  alertCategory?: AlarmCategoryType[];
  promotionCategory?: AlarmCategoryType[];
}

export interface AlarmContentProps {
  alertContents?: AlarmContentsType[];
  promotionContents?: AlarmContentsType[];
}

export interface AlarmInnerType {
  title: string;
  content: string;
  isRead: boolean;
  target?: string;
}

export interface PortfolioInnerContentProps {
  item: PortfolioListType;
  headerAnimated: boolean;
  navigation: any;
}

export interface PortfolioInnerContentPointType {
  guideId: string;
  guideName: string;
  guideIconPath: string;
}

export interface PortfolioInnerContentBuyInfoType {
  title: string;
  body: string;
  image: number;
}

export interface PortfolioInnerContentRateType {
  percentage: number;
  title: string;
}

export interface PortfolioInnerContentItemInfoType {
  category: string;
  title: string | string[];
  subTitle?: string;
}

export interface PortfolioInnerContentProductCompositionType {
  productId: string;
  title: string;
  representThumbnailImagePath: string | null;
  productionYear: number;
  author: string;
  productMaterial: null | string;
  productSize: null | string;
  productDetailInfo: string;
  createdAt: string;
  selected: boolean;
  documents: PortfolioInnerProductDocumentsType[];
}

export interface PortfolioInnerProductDocumentsType {
  documentId: string;
  documentName: string;
  documentIconPath: string | null;
}

export interface PortfolioInnerSection1Props {
  amount: number;
  item: PortfolioListType;
  headerAnimated: boolean;
}

export interface PortfolioInnerSection2Props {
  point: PortfolioInnerContentPointType[];
}

export interface PortfolioInnerSection3Props {
  item: PortfolioListType;
  navigation: any;
}

export interface PortfolioInnerSection4Props {
  item: PortfolioListType;
  navigation: any;
}

export interface PortfolioInnerSection5Props {
  item: PortfolioListType;
}

export interface PortfolioInnerSection6Props {
  navigation: any;
  productComposition: PortfolioInnerContentProductCompositionType[];
  changeProduct: (index: number) => void;
}

export interface PortfolioInnerSection7Props {
  navigation: any;
  item: PortfolioInnerContentProductCompositionType[];
}

export interface PortfolioInnerSection8Props {
  navigation: any;
  item: PortfolioListType;
}

export interface BuyPortfolioHeaderProps {
  navigation: any;
  status: number;
  pieceAmount: number;
  item: any;
  deposit: number;
}

export interface ShortCutAddProps {
  add: (data: number | string) => void;
}

export interface BuyPortfolioFooterBtnProps {
  item: PortfolioType;
  status:  number;
  pieceAmount: number;
  deposit: number;
  min: number;
  max: number;
  navigation: any;
}

export interface TextsAboveNumberPadProps {
  status: number;
  pieceAmount: number;
  remainingPiece: number;
  min: number;
  max: number;
  item: any;
}
