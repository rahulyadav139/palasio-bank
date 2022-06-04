import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {
  login: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginHandler(state, action) {
      state.login = true;
      state.token = action.payload.token;
    },
    logoutHandler(state, action) {
      state.login = false;
      state.token = '';
    },
  },
});

export const AuthActions = authSlice.actions;

export default authSlice;
