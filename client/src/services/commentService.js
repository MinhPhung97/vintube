import { https } from './config';

export const commentService = {
  getComments: (videoId) => {
    return https.get(`/comment/${videoId}`);
  },

  postComment: (comment, id) => {
    return https.post(`/comment/add/${id}`, comment);
  },

  deleteComment: (id) => {
    return https.put(`/comment/delete/${id}`);
  },
};
