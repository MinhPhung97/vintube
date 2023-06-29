import { https } from './config';

export const channelService = {
  getChannel: (channelId) => {
    return https.get(`/user/find/${channelId}`);
  },

  subscribe: (channelId) => {
    return https.put(`/user/sub/${channelId}`);
  },

  unSubscribe: (channelId) => {
    return https.put(`/user/un-sub/${channelId}`);
  },

  likeVideo: (id) => {
    return https.put(`/user/like/${id}`);
  },

  removeLike: (videoId) => {
    return https.put(`/user/remove-like/${videoId}`);
  },

  dislikeVideo: (id) => {
    return https.put(`/user/dislike/${id}`);
  },

  removeDislike: (videoId) => {
    return https.put(`/user/remove-dislike/${videoId}`);
  },
};
