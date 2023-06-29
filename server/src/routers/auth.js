import express from 'express';
import { signIn, signUp, thirdAuth } from '../controllers/auth.js';

const authRouter = express.Router();

//create user
authRouter.post('/sign-up', signUp);
// login user
authRouter.post('/sign-in', signIn);
//login google
authRouter.post('/third-auth', thirdAuth);

export default authRouter;
