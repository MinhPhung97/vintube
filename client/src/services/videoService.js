import { https } from './config';

export const videoService = {
  getVideoList: (type) => {
    return https.get(`/video/${type}`);
  },

  getVideo: (id) => {
    return https.get(`/video/find/${id}`);
  },

  uploadVideo: (data) => {
    return https.post('/video/add', data);
  },

  getTagsVideo: (tags) => {
    return https.get(`/video/tags?tags=${tags}`);
  },

  searchVideo: (query) => {
    return https.get(`/video/search${query}`);
  },

  getVideoUserUpload: (userId) => {
    return https.get(`/video/user/${userId}`);
  },

  updateViewVideo: (videoId) => {
    return https.put(`/video/view/${videoId}`);
  },

  getVideoUserLike: () => {
    return https.get('/video/list-like');
  },
};
