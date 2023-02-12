export interface AddressType {
  address_name?: string;
  jibunAddr: string;
  roadAddr: string;
  zipCode: string;
}

export interface PolicyDataType {
  title: string;
  essential: boolean;
  checked: boolean;
}

export interface StraightNumPadProps {
  reset: () => void;
  status: string | number;
  setStatus: (prev: string | number) => void;
  initialStatus: string;
}
