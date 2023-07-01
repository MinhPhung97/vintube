import React, { useEffect, useState } from 'react';
import Card from '~/components/Card/Card';
import { videoService } from '~/services/videoService';
import {
  Wrapper,
  Container,
  SkeletonWrapper,
  SkeletonContent,
  SkeletonTitle,
} from './HomeStyle/HomeStyle';
import { useSelector } from 'react-redux';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Skeleton } from '@mui/material';

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
              return <Card video={video} key={video._id} />;
            })}
          </Container>
        </Wrapper>
      );
    }
  };

  return (
    <>
      {isLoading === false ? (
        <Wrapper>
          <Container>
            {/* Array(N).fill().map((item) => item): tạo array có N phần tử */}
            {Array(6)
              .fill()
              .map((item, index) => {
                return (
                  <SkeletonWrapper key={index}>
                    <Skeleton
                      sx={{ bgcolor: '#e3e3e3' }}
                      variant="rectangular"
                      width="100%"
                      height={202}
                    />
                    <SkeletonContent>
                      <Skeleton
                        sx={{ bgcolor: '#e3e3e3' }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                      <SkeletonTitle>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem', bgcolor: '#e3e3e3' }}
                          width={200}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem', bgcolor: '#e3e3e3' }}
                          width={200}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem', bgcolor: '#e3e3e3' }}
                          width={200}
                        />
                      </SkeletonTitle>
                    </SkeletonContent>
                  </SkeletonWrapper>
                );
              })}
          </Container>
        </Wrapper>
      ) : (
        <>{renderHomePage()}</>
      )}
    </>
  );
};

export default HomePage;
