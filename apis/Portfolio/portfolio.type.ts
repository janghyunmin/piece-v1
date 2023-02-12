import { PortfolioStatus } from "interfaces/home.type";

export interface PortfolioListType {
  portfolioId: string;
  representThumbnailImagePath: string;
  title: string;
  recruitmentState: PortfolioStatus;
  recruitmentAmount: number;
  expectationProfitRate: number;
  totalPieceVolume: number;
  isCoupon: string;
  minPurchaseAmount: number;
  maxPurchaseAmount: number;
  remainingPieceVolume: number;
  magazineId: null | string;
  recruitmentBeginDate: string;
  recruitmentEndDate: string;
  dividendsExpecatationDate: string;
  currentRecruitmentVolume: number;
  generalGrade: string;
  stabilityPoint: number;
  cashabilityPoint: number;
  profitabilityPoint: number;
  createdAt: string;
  soldoutAt: string;
  // vatRate: number;
  guides: {
    guideId: string;
    guideName: string;
    description: string;
    guideIconPath: string;
  }[];
  products: {
    productId: string;
    title: string;
    representThumbnailImagePath: null | string;
    productionYear: number;
    author: string;
    productMaterial: null | string;
    productSize: null | string;
    productDetailInfo: string;
    createdAt: string;
    documents: {
      documentId: string;
      documentName: string;
      documentIconPath: null | string;
    }[];
  }[];
}
