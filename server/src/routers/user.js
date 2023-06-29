import express from 'express';
import { verifyToken } from '../utilities/utilities.js';
import {
  disLikeVideo,
  getAllUser,
  getUser,
  likeVideo,
  removeDislikeVideo,
  removeLikeVideo,
  subscribe,
  unSubscribe,
  updateUser,
} from '../controllers/user.js';

const userRouter = express.Router();

//update
userRouter.put('/:id', verifyToken, updateUser);

//get user
userRouter.get('/', getAllUser);

//get a user
userRouter.get('/find/:id', getUser);

//subscribe
userRouter.put('/sub/:id', verifyToken, subscribe);

//unsubscribe
userRouter.put('/un-sub/:id', verifyToken, unSubscribe);

// like video
userRouter.put('/like/:videoId', verifyToken, likeVideo);

//remove like video
userRouter.put('/remove-like/:videoId', verifyToken, removeLikeVideo);

// dislike video
userRouter.put('/dislike/:videoId', verifyToken, disLikeVideo);

//remove dislike
userRouter.put('/remove-dislike/:videoId', verifyToken, removeDislikeVideo);

export default userRouter;
