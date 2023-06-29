import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentComment: null,
  isLoading: false,
};

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    fetchComment: (state, action) => {
      state.currentComment = action.payload;
    },

    loadingOn: (state) => {
      state.isLoading = true;
    },

    loadingOff: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchComment, loadingOn, loadingOff } = commentSlice.actions;

export default commentSlice.reducer;
