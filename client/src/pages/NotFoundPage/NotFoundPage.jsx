import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import notFound from '~/assets/lottefile/notFound.json';
import { Wrapper } from './NotFoundPageStyled/NotFoundPageStyled';
import { useSelector } from 'react-redux';

function NotFoundPage() {
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  return (
    <Wrapper>
      <Lottie animationData={notFound} loop={true} />
      {currentUser === null ? (
        <Link to="/sign-in">
          <button>Đăng nhập</button>
        </Link>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default NotFoundPage;
