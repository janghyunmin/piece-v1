import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface portfolioSliceState {
  amount: number;
  recruitmentAmount: number;
}

const initialState: portfolioSliceState = {
  amount: 0,
  recruitmentAmount: 0,
};

export const portfolioSlice = createSlice({
  name: 'PORTFOLIO',
  initialState,
  reducers: {
    setRecruitmentAmount: (state, action: PayloadAction<number>) => {
      state.recruitmentAmount = action.payload;
    },
    initAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    addAmount: (state, action: PayloadAction<number>) => {
      if (state.amount + action.payload < state.recruitmentAmount) {
        state.amount += action.payload;
      } else {
        state.amount = state.recruitmentAmount;
      }
    },
    fullAmount: (state) => {
      state.amount = state.recruitmentAmount;
    },
  },
});

export const {
  setRecruitmentAmount,
  initAmount,
  addAmount,
  fullAmount,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
