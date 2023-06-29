import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: null,
};

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },

    fetchLikeVideo: (state, action) => {
      if (state.currentVideo.likes.includes(action.payload)) {
        const indexUserLike = state.currentVideo.likes.findIndex((userId) => {
          return userId === action.payload;
        });

        state.currentVideo.likes.splice(indexUserLike, 1);
      } else {
        const indexUserDisLike = state.currentVideo.dislikes.findIndex((userId) => {
          return userId === action.payload;
        });

        state.currentVideo.likes.push(action.payload);

        state.currentVideo.dislikes.splice(indexUserDisLike, 1);
      }
    },

    fetchDislikeVideo: (state, action) => {
      if (state.currentVideo.dislikes.includes(action.payload)) {
        const indexUserDislike = state.currentVideo.dislikes.findIndex((userId) => {
          return userId === action.payload;
        });

        state.currentVideo.dislikes.splice(indexUserDislike, 1);
      } else {
        const indexUserLike = state.currentVideo.likes.findIndex((userId) => {
          return userId === action.payload;
        });

        state.currentVideo.dislikes.push(action.payload);

        state.currentVideo.likes.splice(indexUserLike, 1);
      }
    },
  },
});

export const { fetchSuccess, fetchLikeVideo, fetchDislikeVideo } = videoSlice.actions;

export default videoSlice.reducer;
