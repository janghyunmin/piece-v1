import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface deviceSliceState {
  id: string;
  token: string;
}

const initialState: deviceSliceState = {
  id: '',
  token: '',
};


export const deviceSlice = createSlice({
  name: 'DEVICE',
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  setDeviceId,
  setDeviceToken,
} = deviceSlice.actions;

export default deviceSlice.reducer;
