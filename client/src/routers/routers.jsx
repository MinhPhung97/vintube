import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import HomePage from '~/pages/HomePage/HomePage.jsx';
import VideosPage from '~/pages/VideosPage/VideosPage.jsx';
import ProfilePage from '~/pages/ProfilePage/ProfilePage';
import SignInPage from '~/pages/SignInPage/SignInPage.jsx';
import SignUpPage from '~/pages/SignUpPage/SignUpPage.jsx';
import SearchPage from '../pages/SearchPage/SearchPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UploadPage from '../pages/UploadPage/UploadPage';

const routers = [
  //home page
  {
    path: '/',
    component: <DefaultLayout Component={<HomePage type="random" />} />,
  },

  //trend page
  {
    path: '/trend',
    component: <DefaultLayout Component={<HomePage type="trend" />} />,
  },

  //sub list page
  {
    path: '/sub-list',
    component: <DefaultLayout Component={<HomePage type="sub-list" />} />,
  },

  //watch page
  {
    path: '/video/:id',
    component: <DefaultLayout Component={<VideosPage />} />,
  },

  //channel page
  {
    path: '/profile/:id',
    component: <DefaultLayout Component={<ProfilePage />} />,
  },

  //sign in
  {
    path: '/sign-in',
    component: <DefaultLayout Component={<SignInPage />} />,
  },

  //sign up
  {
    path: '/sign-up',
    component: <DefaultLayout Component={<SignUpPage />} />,
  },

  //search video
  {
    path: '/search',
    component: <DefaultLayout Component={<SearchPage />} />,
  },

  //search video
  {
    path: '/upload',
    component: <DefaultLayout Component={<UploadPage />} />,
  },

  //not found
  {
    path: '/*',
    component: <DefaultLayout Component={<NotFoundPage />} />,
  },
];

export default routers;
