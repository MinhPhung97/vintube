import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyALiyIE2G00pxkbqlnaTH3EIC2RvdiHPvY',
  authDomain: 'vintube-15265.firebaseapp.com',
  projectId: 'vintube-15265',
  storageBucket: 'vintube-15265.appspot.com',
  messagingSenderId: '141070219929',
  appId: '1:141070219929:web:383524817708a1f23cd608',
  measurementId: 'G-00JR39X9QS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const providerGoogle = new GoogleAuthProvider();

export const providerFacebook = new FacebookAuthProvider();

export default app;
