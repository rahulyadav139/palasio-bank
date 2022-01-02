import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authHandler(state, action) {
      state.login = action.payload;
    },
  },
});

export const AuthActions = authSlice.actions;

export default authSlice;
