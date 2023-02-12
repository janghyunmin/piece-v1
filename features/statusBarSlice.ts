import { createSlice } from '@reduxjs/toolkit';

export interface statusBarSliceState {
  refetch: number;
}

const initialState: statusBarSliceState = {
  refetch: 0,
};

export const statusBarSlice = createSlice({
  name: 'STATUS_BAR',
  initialState,
  reducers: {
    setRefetch: (state) => {
      state.refetch = +new Date();
    },
  },
});

export const {
  setRefetch,
} = statusBarSlice.actions;

export default statusBarSlice.reducer;
