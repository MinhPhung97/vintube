import express from 'express';
import { verifyToken } from '../utilities/utilities.js';
import {
  addVideo,
  deleteVideo,
  getAllVideo,
  getVideo,
  randomVideo,
  trendVideo,
  updateVideo,
  view,
  subscribeList,
  getTags,
  searchVideo,
  getVideoListUser,
  getVideoUserLike,
} from '../controllers/video.js';

const videoRouter = express.Router();

//thêm video
videoRouter.post('/add', verifyToken, addVideo);

//update video
videoRouter.put('/update/:id', verifyToken, updateVideo);

//xóa video
videoRouter.delete('/delete/:id', verifyToken, deleteVideo);

//lấy tất cả video
videoRouter.get('/', getAllVideo);

//lấy 1 video
videoRouter.get('/find/:id', getVideo);

//thay đổi  view
videoRouter.put('/view/:id', view);

//lấy videos nhiều view
videoRouter.get('/trend', trendVideo);

//lấy videos ngẫu nhiên
videoRouter.get('/random', randomVideo);

//lấy danh sách subscribe
videoRouter.get('/sub-list', verifyToken, subscribeList);

//lấy danh sách tags
videoRouter.get('/tags', getTags);

//search
videoRouter.get('/search', searchVideo);

//video của user
videoRouter.get('/user/:userId', verifyToken, getVideoListUser);

//video like của user
videoRouter.get('/list-like', verifyToken, getVideoUserLike);

export default videoRouter;
