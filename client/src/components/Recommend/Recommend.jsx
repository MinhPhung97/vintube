import React, { useEffect, useState } from 'react';
import { videoService } from '../../services/videoService';
import { Wrapper } from './RecommendStyled/RecommendStyled';
import Card from '../Card/Card';

function Recommend({ tags, videoId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const FetchTagsVideo = async () => {
      const res = await videoService.getTagsVideo(tags);
      const list = res.data.map((video) => {
        return video;
      });
      setVideos(list);
    };
    FetchTagsVideo();
  }, [videoId]);

  return (
    <Wrapper>
      {videos?.map((video) => {
        return <Card type="sm" video={video} key={video._id} />;
      })}
    </Wrapper>
  );
}

export default Recommend;
