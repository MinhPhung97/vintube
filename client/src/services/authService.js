import { https } from './config';

export const authService = {
  signUp: (userInfo) => {
    return https.post('/auth/sign-up', userInfo);
  },

  signIn: (userInfo) => {
    return https.post('/auth/sign-in', userInfo);
  },

  thirdAuth: (userInfo) => {
    return https.post('/auth/third-auth', userInfo);
  },
};
