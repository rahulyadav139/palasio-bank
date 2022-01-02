import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModal: false,
  redirect: false,
  loginForm: false,
  message: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    loginModalHandler(state, action) {
      state.isModal = action.payload.isModal;
      state.loginForm = action.payload.loginForm;
    },
    confirmModalHandler(state, action) {
      state.isModal = action.payload.isModal;
      state.message = action.payload.message;
      state.redirect = action.payload.redirect;
    },
  },
});

export const ModalActions = modalSlice.actions;

export default modalSlice;
