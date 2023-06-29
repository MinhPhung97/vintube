import express from 'express';
import authRouter from './auth.js';
import commentRouter from './comment.js';
import userRouter from './user.js';
import videoRouter from './video.js';

const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/video', videoRouter);
rootRouter.use('/comment', commentRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
