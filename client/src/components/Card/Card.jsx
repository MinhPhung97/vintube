import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { channelService } from '~/services/channelService';
import { format } from 'timeago.js';
import { Skeleton } from '@mui/material';
// import 'react-loading-skeleton/dist/skeleton.css';

import {
  Avatar,
  ChannelName,
  Content,
  Header,
  Heading,
  Img,
  Info,
  Span,
  SpanTime,
  SpanView,
  Title,
  Wrapper,
} from './CardStyle/CardStyle';

const Card = ({ type, video, isLoading }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await channelService.getChannel(video.userId);
      setChannel(res.data);
    };
    fetchChannel();
  }, []);

  const renderContent = () => {
    if (type === 'search') {
      return (
        <>
          {isLoading ? (
            <>
              <Heading type={type}>{video.title}</Heading>
              <Info>
                <Link to={`/profile/${channel._id}`}>
                  <Avatar
                    type={type}
                    src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                    alt=""
                  />
                </Link>
                <Link to={`/profile/${channel._id}`}>
                  <ChannelName type={type}>{channel.name}</ChannelName>
                </Link>
              </Info>
              <SpanView>{`${video.views} lượt xem`}</SpanView>
              <Span />
              <SpanTime>{format(video.createdAt)}</SpanTime>
            </>
          ) : (
            <>
              <Skeleton animation="wave" height={30} style={{ marginBottom: 4 }} width={400} />
              <Skeleton animation="wave" height={30} style={{ marginBottom: 4 }} width={400} />
              <Skeleton animation="wave" height={30} style={{ marginBottom: 4 }} width={400} />
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <Link to={`/profile/${channel._id}`}>
            <Avatar
              type={type}
              src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
              alt=""
            />
          </Link>
          <Title type={type}>
            {isLoading ? (
              <>
                <Heading type={type}>{video.title}</Heading>
                <Link to={`/profile/${channel._id}`}>
                  <ChannelName type={type}>{channel.name}</ChannelName>
                </Link>
                <SpanView>{`${video.views} lượt xem`}</SpanView>
                <Span />
                <SpanTime>{format(video.createdAt)}</SpanTime>
              </>
            ) : (
              <>
                <Skeleton animation="wave" height={16} style={{ marginBottom: 4 }} width={200} />
                <Skeleton animation="wave" height={16} style={{ marginBottom: 4 }} width={200} />
                <Skeleton animation="wave" height={16} style={{ marginBottom: 4 }} width={200} />
              </>
            )}
          </Title>
        </>
      );
    }
  };

  return (
    <Wrapper type={type}>
      <Link to={`/video/${video._id}`}>
        <Header type={type}>
          {isLoading ? (
            <>
              <Img type={type} src={video.imgUrl} alt="" />
            </>
          ) : (
            <>
              <Skeleton
                sx={{ bgcolor: '#e3e3e3' }}
                height="100%"
                width="100%"
                animation="wave"
                variant="rectangular"
              />
            </>
          )}
        </Header>
      </Link>
      <Content type={type}>{renderContent()}</Content>
    </Wrapper>
  );
};

export default Card;
