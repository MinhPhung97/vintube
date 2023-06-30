import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '~/components/Comment/Comment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { videoService } from '../../services/videoService';
import { channelService } from '../../services/channelService';
import { fetchSuccess } from '~/features/videoSlice';
import { Skeleton } from '@mui/material';
import Recommend from '../../components/Recommend/Recommend';

import {
  Actions,
  Avatar,
  Channel,
  ChannelFollow,
  ChannelName,
  Container,
  Desc,
  Detail,
  Dislike,
  Heading,
  Info,
  Like,
  LikeWrapper,
  Main,
  ShowMore,
  SkeletonAction,
  SkeletonContainer,
  SkeletonInfo,
  SkeletonWrapper,
  SpanLike,
  Subscribe,
  Tags,
  Video,
  VideoWrapper,
  Wrapper,
} from './VideosStyle/VideosStyle';
import { fetchDislikeVideo, fetchLikeVideo } from '../../features/videoSlice';
import { subscribeChannel } from '../../features/userSlice';
import Swal from 'sweetalert2';

const VideosPage = () => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [channel, setChannel] = useState();
  const dispatch = useDispatch();

  //videoID
  const { id } = useParams();

  //get state từ redux
  const { currentUser } = useSelector((state) => state.userSlice);
  const { currentVideo } = useSelector((state) => state.videoSlice);

  //tăng view
  const updateViewVideo = async () => {
    await videoService.updateViewVideo(id);
  };

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const videoRes = await videoService.getVideo(id);
        const channelRes = await channelService.getChannel(videoRes.data.userId);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, dispatch, currentUser?.channelSubscribed]);

  useEffect(() => {
    updateViewVideo();
  }, []);

  //ẩn/hiện desc
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  //like function
  const handleLikeVideo = async () => {
    //check user đã đăng nhập chưa
    if (currentUser === null) {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng đăng nhập!',
      });
    }
    //check user đã like chưa
    else if (!currentVideo.likes.includes(currentUser?._id)) {
      await channelService.likeVideo(currentVideo?._id);
      dispatch(fetchLikeVideo(currentUser?._id));
    }
    //nhấn lần 2 thì bỏ like
    else {
      await channelService.removeLike(currentVideo?._id);
      dispatch(fetchLikeVideo(currentUser?._id));
    }
  };

  //dislike function
  const handleDislikeVideo = async () => {
    if (currentUser === null) {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng đăng nhập!',
      });
    } else if (!currentVideo.dislikes.includes(currentUser?._id)) {
      await channelService.dislikeVideo(currentVideo?._id);
      dispatch(fetchDislikeVideo(currentUser?._id));
      console.log('dislike');
    } else {
      await channelService.removeDislike(currentVideo?._id);
      dispatch(fetchDislikeVideo(currentUser?._id));
      console.log('remove');
    }
  };

  //subscribed function
  const handleSubscribe = async () => {
    if (currentUser === null) {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng đăng nhập!',
      });
    } else if (currentUser?.channelSubscribed.includes(channel._id)) {
      await channelService.unSubscribe(channel._id);
      dispatch(subscribeChannel(channel._id));
    } else {
      await channelService.subscribe(channel._id);
      dispatch(subscribeChannel(channel._id));
    }
  };

  //Skeleton loading
  const renderSkeleton = () => {
    return (
      <SkeletonWrapper>
        <Skeleton width="80%" height={40} animation="wave" sx={{ bgcolor: '#e3e3e3' }} />
        <SkeletonContainer>
          <SkeletonInfo>
            <Skeleton
              height={40}
              width={40}
              variant="circular"
              animation="wave"
              sx={{ bgcolor: '#e3e3e3' }}
            />
            <div>
              <Skeleton width="100%" height={40} animation="wave" sx={{ bgcolor: '#e3e3e3' }} />
              <Skeleton width="100%" height={40} animation="wave" sx={{ bgcolor: '#e3e3e3' }} />
            </div>
          </SkeletonInfo>
          <SkeletonAction>
            <Skeleton
              width={30}
              height={30}
              variant="circular"
              animation="wave"
              sx={{ bgcolor: '#e3e3e3' }}
            />
            <Skeleton
              width={30}
              height={30}
              variant="circular"
              animation="wave"
              sx={{ bgcolor: '#e3e3e3' }}
            />
            <Skeleton
              width={30}
              height={30}
              variant="circular"
              animation="wave"
              sx={{ bgcolor: '#e3e3e3' }}
            />
            <Skeleton
              width={30}
              height={30}
              variant="circular"
              animation="wave"
              sx={{ bgcolor: '#e3e3e3' }}
            />
          </SkeletonAction>
        </SkeletonContainer>
      </SkeletonWrapper>
    );
  };

  //thông báo
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return (
    <Wrapper>
      <Container>
        <Main>
          <VideoWrapper>
            <Video src={currentVideo?.videoUrl} controls autoPlay />
          </VideoWrapper>
          {loading ? (
            <>
              <Heading>{currentVideo?.title}</Heading>
              <Info>
                <Channel>
                  <Avatar src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" />
                  <Detail>
                    <Link to="/profile/idk">
                      <ChannelName>{channel?.name}</ChannelName>
                    </Link>
                    <ChannelFollow>{`${channel?.subscribers.length} người đăng ký`}</ChannelFollow>
                  </Detail>
                  {channel?._id === currentUser?._id ? (
                    <></>
                  ) : (
                    <Subscribe onClick={handleSubscribe}>
                      {currentUser?.channelSubscribed?.includes(channel?._id)
                        ? 'Đã đăng ký'
                        : 'Đăng ký'}
                    </Subscribe>
                  )}
                </Channel>
                <Actions>
                  <LikeWrapper>
                    <Like onClick={handleLikeVideo}>
                      {currentVideo.likes.includes(currentUser?._id) ? (
                        <ThumbUpAltIcon />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                      <SpanLike>
                        {currentVideo?.likes.length === 0 ? '' : currentVideo?.likes.length}
                      </SpanLike>
                    </Like>
                    <Dislike onClick={handleDislikeVideo}>
                      {currentVideo?.dislikes.includes(currentUser?._id) ? (
                        <ThumbDownAltIcon />
                      ) : (
                        <ThumbDownOffAltIcon />
                      )}
                    </Dislike>
                  </LikeWrapper>
                </Actions>
              </Info>
              <Desc>
                {currentVideo?.desc.split('').length > 200 ? (
                  <>
                    {
                      <p>
                        {showMore ? (
                          <>
                            <Tags>
                              {currentVideo?.tags.map((tag) => {
                                return <span key={tag}>{`#${tag} `}</span>;
                              })}
                            </Tags>
                            {currentVideo?.desc}
                          </>
                        ) : (
                          <>
                            <Tags>
                              {currentVideo?.tags.map((tag) => {
                                return <span key={tag}>{`#${tag} `}</span>;
                              })}
                            </Tags>
                            {currentVideo?.desc.substring(0, 200)}
                          </>
                        )}
                      </p>
                    }
                    <ShowMore onClick={handleShowMore}>{showMore ? 'Ẩn bớt' : 'Xem thêm'}</ShowMore>
                  </>
                ) : (
                  <>
                    {
                      <>
                        <Tags>
                          {currentVideo?.tags.map((tag) => {
                            return <span key={tag}>{`#${tag} `}</span>;
                          })}
                        </Tags>
                        <p>{currentVideo?.desc}</p>
                      </>
                    }
                  </>
                )}
              </Desc>
            </>
          ) : (
            renderSkeleton()
          )}

          <Comment />
        </Main>
        <Recommend tags={currentVideo?.tags} videoId={currentVideo?._id} />
      </Container>
    </Wrapper>
  );
};

export default VideosPage;
