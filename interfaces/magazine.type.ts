export interface MagazineCategoryType {
  title: string;
  magazineType: string;
}

export interface MagazinesTypes {
  createdAt: string;
  magazineId: string;
  midTitle: string;
  representThumbnailPath: string;
  smallTitle: string;
  title: string;
  bookmarked: boolean;
}
// export interface MagazinesTypes {
//   type: string;
//   title: string;
//   sub_title: string;
//   desc: string;
//   bookmarked: boolean;
//   image: number;
//   date: string;
//   author: string;
//   post: string;
// }

export interface CategoryProps {
  category: MagazineCategoryType[];
  selectCategoryType: string;
  setSelectCategoryType: (type: string) => void;
}

export interface MagazinesProps {
  navigation: any;
  magazines: MagazinesTypes[];
  bookmarking: (index: number) => void;
}
