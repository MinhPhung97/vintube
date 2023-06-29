import { Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import Card from '~/components/Card/Card.jsx';
import {
  Avatar,
  Channel,
  Content,
  Heading,
  Info,
  Name,
  SpanInfo,
  TabsContent,
  TabsHeading,
  Title,
  Wrapper,
} from './ProfilePageStyle/ProfilePageStyle';
import { useSelector } from 'react-redux';
import { videoService } from '../../services/videoService';

const ProfilePage = () => {
  const [videoUpload, setVideoUpload] = useState([]);
  const [videoLiked, setVideoLiked] = useState([]);
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const [currentTabIndex, setCurrentTabIndex] = useState('1');

  const fetchVideoUserUpload = async () => {
    const res = await videoService.getVideoUserUpload(currentUser._id);
    const newList = res.data;
    setVideoUpload(newList.reverse());
  };

  const fetchVideoUserLike = async () => {
    const res = await videoService.getVideoUserLike();
    const newList = res.data;
    setVideoLiked(newList.reverse());
  };

  useEffect(() => {
    fetchVideoUserUpload();
  }, []);

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
            <img src={currentUser.img} alt="" />
          </Avatar>
          <Title>
            <Heading>{currentUser.name}</Heading>
            <Name>{`${currentUser.email}`}</Name>
            <Channel>
              <SpanInfo>
                <span>{currentUser.subscribers}</span> Subscribers
              </SpanInfo>
              <SpanInfo>
                <span>1010</span> videos
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
              <TabsContent>
                {videoLiked.map((video) => {
                  return <Card video={video} key={video._id} />;
                })}
              </TabsContent>
            </TabPanel>
          </TabContext>
        </Content>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
