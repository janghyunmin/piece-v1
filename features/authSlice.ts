import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type isFidoType = null | 'Y' | 'N'

export interface authSliceState {
  status: boolean;
  isUser: boolean;
  memberId: string;
  accessToken: string;
  refreshToken: string;
  isFido: isFidoType;
}

const initialState: authSliceState = {
  status: false,
  isUser: false,
  memberId: '',
  accessToken: '',
  refreshToken: '',
  isFido: null,
};

export type SetAuthPayload = {
  memberId: string;
  accessToken: string;
  refreshToken: string;
}


export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.status = true;
      state.isUser = true;
      state.memberId = action.payload.memberId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    initAuth: (state) => {
      state.status = true;
      state.isUser = false;
      state.memberId = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
    setIsFido: (state, action: PayloadAction<isFidoType>) => {
      state.isFido = action.payload;
    },
  },
});

export const {
  setAuth,
  initAuth,
  setIsFido,
} = authSlice.actions;

export default authSlice.reducer;
