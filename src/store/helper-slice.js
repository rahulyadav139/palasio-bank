import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: '',
  city: '',
};

const helperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    fillCityDetails(state, action) {
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
    reset(state) {
      state.state = '';
      state.city = '';
    },
  },
});

export const HelperActions = helperSlice.actions;

export const getCityDetails = pin => {
  return async dispatch => {
    const url = `https://api.postalpincode.in/pincode/${pin}`;
    const getDetails = async pin => {
      const res = await fetch(url);
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      const city = data[0].PostOffice && data[0].PostOffice[0].District;
      const state = data[0].PostOffice && data[0].PostOffice[0].State;
      return [city, state];
    };

    try {
      const [city, state] = await getDetails(pin);
      dispatch(
        HelperActions.fillCityDetails({
          state,
          city,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export default helperSlice;
