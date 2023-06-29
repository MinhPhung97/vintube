import React, { useEffect, useState } from 'react';
import { Wrapper } from './SearchPageStyled/SearchPageStyled';
import { useLocation } from 'react-router-dom';
import { videoService } from '../../services/videoService';
import Card from '../../components/Card/Card';

function SearchPage() {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await videoService.searchVideo(query);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Wrapper>
      {videos.map((video) => {
        return <Card type="search" video={video} key={video._id} />;
      })}
    </Wrapper>
  );
}

export default SearchPage;
