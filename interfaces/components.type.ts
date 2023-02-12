export interface Title {
  title: string;
  selected: boolean;
}

export interface HeaderTitle {
  screen: string;
  title: Title[];
  setTitle: (prev: any) => void;
  navigation?: any;
}

// 공유하기 기능을 위해 itemTitle 추가 bskr_jhm 0513
export interface GoBackProps {
  onBack?: any;
  navigation: any;
  title?: string;
  white?: boolean;
  bookmark?: {
    bookmarked: boolean;
    magazineId: string;
  };
  preventBack?: boolean;
  animated?: boolean;
  right?: any;
  shared?: string;
  portfolioTitle: any;
  shareUrl?:string;
}

export interface toggleBtnProps {
  toggle?: boolean;
  handleToggle?: any;
  data?: any;
}
