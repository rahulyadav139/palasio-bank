import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import bankSlice from './bank-slice';
import helperSlice from './helper-slice';
import modalSlice from './modal-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bank: bankSlice.reducer,
    helper: helperSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
