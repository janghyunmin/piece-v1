import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface tourSliceState {
  isTour: boolean;
}

const initialState: tourSliceState = {
  isTour: false,
};

export const tourSlice = createSlice({
  name: 'TOUR',
  initialState,
  reducers: {
    setIsTour: (state, action: PayloadAction<boolean>) => {
      state.isTour = action.payload
    },
  },
});

export const {
  setIsTour,
} = tourSlice.actions;

export default tourSlice.reducer;
