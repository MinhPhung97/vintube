import { Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import Card from '~/components/Card/Card.jsx';
import LockPersonIcon from '@mui/icons-material/LockPerson';

import {
  Avatar,
  Channel,
  Content,
  Heading,
  Info,
  Name,
  PrivateTab,
  SpanInfo,
  TabsContent,
  TabsHeading,
  Title,
  Wrapper,
} from './ProfilePageStyle/ProfilePageStyle';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { videoService } from '../../services/videoService';
import { channelService } from '../../services/channelService';

const ProfilePage = () => {
  const [videoUpload, setVideoUpload] = useState([]);
  const [videoLiked, setVideoLiked] = useState([]);
  const [channel, setChannel] = useState({});

  //current user
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  //current channel
  var currentChannel = useParams();

  //current tab
  const [currentTabIndex, setCurrentTabIndex] = useState('1');

  const fetchVideoUserUpload = async () => {
    const videoRes = await videoService.getVideoUserUpload(currentChannel.id);
    const channelRes = await channelService.getChannel(currentChannel.id);

    const newList = videoRes.data;
    setVideoUpload(newList.reverse());
    setChannel(channelRes.data);
  };

  const fetchVideoUserLike = async () => {
    const res = await videoService.getVideoUserLike();
    const newList = res.data;
    setVideoLiked(newList.reverse());
  };

  useEffect(() => {
    fetchVideoUserUpload();
    fetchVideoUserLike();
  }, [currentChannel.id]);

  //tab
  const handleChangeTabIndex = (e, tabIndex) => {
    switch (tabIndex) {
      case '1':
        fetchVideoUserUpload();
        break;
      case '2':
        fetchVideoUserLike();
        break;
      default:
        break;
    }

    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <Wrapper>
        <Info>
          <Avatar>
            <img
              src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
              alt=""
            />
          </Avatar>
          <Title>
            <Heading>{channel?.name}</Heading>
            <Name>{`${channel?.email}`}</Name>
            <Channel>
              <SpanInfo>
                <span>{`${channel?.subscribers?.length} người đăng ký`}</span>
              </SpanInfo>
              <SpanInfo>
                <span>{`${videoUpload?.length} videos`}</span>
              </SpanInfo>
            </Channel>
          </Title>
        </Info>
        <Content>
          <TabContext value={currentTabIndex}>
            <TabsHeading>
              <TabList onChange={handleChangeTabIndex}>
                <Tab label="Videos" value="1" />
                <Tab label="Đã like" value="2" />
              </TabList>
            </TabsHeading>
            <TabPanel value="1">
              <TabsContent>
                {videoUpload.map((video) => {
                  return <Card video={video} key={video._id} />;
                })}
              </TabsContent>
            </TabPanel>

            <TabPanel value="2">
              {currentChannel.id === currentUser?._id ? (
                <TabsContent>
                  {videoLiked.map((video) => {
                    return <Card video={video} key={video._id} />;
                  })}
                </TabsContent>
              ) : (
                <PrivateTab>
                  <LockPersonIcon />
                  <span>Các video đang ở chế độ riêng tư.</span>
                </PrivateTab>
              )}
            </TabPanel>
          </TabContext>
        </Content>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
