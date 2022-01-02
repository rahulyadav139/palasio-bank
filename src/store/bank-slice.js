import { createSlice } from '@reduxjs/toolkit';
import sampleData from './new-user-sample-data';
import bankData from './bank-data';

const initialState = {
  profile: '',
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    initializeBanking(state, action) {
      const username = action.payload;
      const updatedBankData = JSON.parse(localStorage.getItem('bankData'));

      if (updatedBankData) {
        bankData.splice(0, bankData.length);
        for (const el of updatedBankData) {
          bankData.push(el);
        }
      }

      const activeProfile = bankData.find(
        el => el.authDetails.username === username
      );

      state.profile = '';
      state.profile = JSON.parse(JSON.stringify(activeProfile));

      state.profile.bankAccountDetails.accountBalance =
        state.profile.movements.reduce((acc, el) => (acc += el.amount), 0);
    },

    crateNewAccount(state, action) {
      const profile = JSON.parse(JSON.stringify(sampleData));
      const { name, email, username, password } = action.payload;
      profile.personalDetails.name = name;
      profile.personalDetails.email = email;
      profile.authDetails.username = username;
      profile.authDetails.password = password;

      bankData.push(profile);
    },
    upgradeProducts(state, action) {
      const { upgradeType, upgradeTo } = action.payload;

      switch (upgradeType) {
        case 'debit':
          state.profile.debitCardDetails.cardType = upgradeTo;
          break;
        case 'credit':
          state.profile.creditCardDetails.cardType = upgradeTo;
          break;
        default:
          state.profile.bankAccountDetails.accountType = upgradeTo;
          break;
      }
    },

    updateAddress(state, action) {
      state.profile.personalDetails.address = action.payload;
    },
    updateDebitCardPin(state, action) {
      state.profile.debitCardDetails.cardPin = action.payload;
    },
    updateNominee(state, action) {
      state.profile.bankAccountDetails.nominee = action.payload;
    },
    linkLoanAccount(state, action) {
      state.profile.loanAccountDetails.push(action.payload);
    },
    changePassword(state, action) {
      state.profile.authDetails.password = action.payload;
    },
    openFixedDeposit(state, action) {
      state.profile.depositDetails.unshift(action.payload);
    },

    billPayment(state, action) {
      const movements = state.profile.movements;
      movements.unshift(action.payload);
      state.profile.bankAccountDetails.accountBalance =
        state.profile.movements.reduce((acc, el) => (acc += el.amount), 0);
    },
    moneyTransfer(state, action) {
      const { amount, senderRemark, receiverRemark, time, receiverIndex } =
        action.payload;

      state.profile.movements.unshift({
        amount: -amount,
        remark: senderRemark,
        time,
      });
      const receiver = JSON.parse(JSON.stringify(bankData[receiverIndex]));
      receiver.movements.unshift({
        amount: amount,
        remark: receiverRemark,
        time,
      });

      bankData.splice(receiverIndex, 1);
      bankData.push(receiver);
      state.profile.bankAccountDetails.accountBalance =
        state.profile.movements.reduce((acc, el) => (acc += el.amount), 0);
    },

    saveToLocal(state) {
      const activeProfileIndex = bankData.findIndex(
        el => el.authDetails.username === state.profile.authDetails.username
      );
      bankData.splice(activeProfileIndex, 1);
      bankData.push(JSON.parse(JSON.stringify(state.profile)));
      const updatedBankData = JSON.stringify(bankData);
      localStorage.setItem('bankData', updatedBankData);
    },
    updateLimits(state, action) {
      const { dcWithdrawalLimit, ccWithdrawalLimit, dcPOSLimit, ccPOSLimit } =
        action.payload;

      state.profile.debitCardDetails.withdrawalLimit = dcWithdrawalLimit;
      state.profile.debitCardDetails.POSLimit = dcPOSLimit;
      state.profile.creditCardDetails.withdrawalLimit = ccWithdrawalLimit;
      state.profile.creditCardDetails.POSLimit = ccPOSLimit;
    },
  },
});

export const BankActions = bankSlice.actions;

export default bankSlice;
