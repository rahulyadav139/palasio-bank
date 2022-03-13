import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: '',
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    initializeBanking(state, action) {
      const { fullName, accountNumber } = action.payload;

      state.profile = { fullName, accountNumber };
    },
  },
});

export const BankActions = bankSlice.actions;

export default bankSlice;
