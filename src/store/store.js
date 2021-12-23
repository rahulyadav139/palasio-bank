import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
  loginForm: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    modalHandler(state, action) {
      state.modal = action.payload.modal;
      state.loginForm = action.payload.loginForm;
    },
  },
});

export const AuthActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
