import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConsentType } from 'apis/Consent/consent.type'

export type KindType = 'SIGNUP' | 'LOGIN' | 'RESET_PASSWORD' | 'REAUTH';
export type GenderType = '남자' | '여자';
export type CarrierType =
  '통신사 선택' |
  'SKT' |
  'KT' |
  'LG U+' |
  'SKT 알뜰폰' |
  'KT 알뜰폰' |
  'LG U+ 알뜰폰';

export type certificationFormState = {
  kind: KindType;
  form: {
    memberId: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    gender: GenderType;
    carrier: CarrierType;
    consentList: ConsentType[];
    txSeqNo: string;
    token: string;
    ci: string;
    di: string;
  };
  errors: {
    name: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    carrier: string;
  }
}

const initialState: certificationFormState = {
  kind: 'SIGNUP',
  form: {
    memberId: '',
    name: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '남자',
    carrier: '통신사 선택',
    consentList: [],
    txSeqNo: '',
    token: '',
    ci: '',
    di: '',
  },
  errors: {
    name: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    carrier: '',
  }
};

type SetFormPayloadType = {
  name: keyof typeof initialState.form;
  value: string | GenderType | CarrierType | ConsentType[];
}

type SetErrorsPayloadType = {
  name: keyof typeof initialState.errors;
  value: string;
}

export const certificationFormSlice = createSlice({
  name: 'CERTIFICATION_FORM',
  initialState,
  reducers: {
    setKind: (state, action: PayloadAction<KindType>) => {
      state.kind = action.payload;
    },
    setForm: (state, action: PayloadAction<SetFormPayloadType>) => {
      state.form = {
        ...state.form,
        [action.payload.name]: action.payload.value,
      };
    },
    setErrors: (state, action: PayloadAction<SetErrorsPayloadType>) => {
      state.errors[action.payload.name] = action.payload.value;
    },
    initForm: (state) => {
      state.form = initialState.form;
      state.errors = initialState.errors;
    }
  },
});

export const {
  setKind,
  setForm,
  setErrors,
  initForm,
} = certificationFormSlice.actions;

export default certificationFormSlice.reducer;
