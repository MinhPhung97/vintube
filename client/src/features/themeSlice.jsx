import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: false,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = !state.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
