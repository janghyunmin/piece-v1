import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/authSlice';
import deviceReducer from 'features/deviceSlice';
import tourReducer from 'features/tourSlice';
import certificationFormReducer from 'features/certificationFormSlice';
import portfolioReducer from 'features/portfolioSlice';
import statusBarReducer from 'features/statusBarSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      device: deviceReducer,
      tour: tourReducer,
      certificationForm: certificationFormReducer,
      portfolio: portfolioReducer,
      statusBar: statusBarReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
