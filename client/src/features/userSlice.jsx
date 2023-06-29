import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  showModal: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
    },

    subscribeChannel: (state, action) => {
      const indexChannel = state.currentUser.channelSubscribed.findIndex((channelId) => {
        return channelId === action.payload;
      });

      if (indexChannel === -1) {
        state.currentUser.channelSubscribed.push(action.payload);
      } else {
        state.currentUser.channelSubscribed.splice(indexChannel, 1);
      }
    },
  },
});

export const { loginSuccess, loginFailure, logout, subscribeChannel } = userSlice.actions;

export default userSlice.reducer;
