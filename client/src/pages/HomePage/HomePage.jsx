import React, { useEffect, useState } from 'react';
import Card from '~/components/Card/Card';
import { videoService } from '~/services/videoService';
import { Wrapper, Container } from './HomeStyle/HomeStyle';
import { useSelector } from 'react-redux';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const HomePage = ({ type }) => {
  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state) => state.userSlice.currentUser);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await videoService.getVideoList(type);
      setVideos(res.data);
      setIsLoading(true);
    };
    fetchVideos();
  }, [type]);

  const renderHomePage = () => {
    if (type === 'sub-list' && currentUser === null) {
      return <NotFoundPage />;
    } else {
      return (
        <Wrapper>
          <Container>
            {videos?.map((video) => {
              return <Card video={video} key={video._id} isLoading={isLoading} />;
            })}
          </Container>
        </Wrapper>
      );
    }
  };

  return <>{renderHomePage()}</>;
};

export default HomePage;
