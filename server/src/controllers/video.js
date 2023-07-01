import { createError } from '../utilities/utilities.js';
import Video from '../models/Video.js';
import User from '../models/User.js';

//thêm video
const addVideo = async (req, res, next) => {
  const newVideo = new Video({ ...req.body, userId: req.user.id });

  try {
    const savedVideo = await newVideo.save();

    res.status(200).send(savedVideo);
  } catch (error) {
    next(error);
  }
};

// update video
const updateVideo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return next(createError('404', 'Không tìm thấy video!'));

    if (req.user._id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).send(updatedVideo);
    } else {
      return next(createError('403', 'Bạn chỉ được update video của bạn!'));
    }
  } catch (error) {
    next(error);
  }
};

//xóa video
const deleteVideo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return next(createError('404', 'Không tìm thấy video!'));

    if (req.user._id === video.userId) {
      await Video.findByIdAndUpdate(
        id,
        {
          $set: { isDelete: true },
        },
        { new: true }
      );

      res.status(200).send('Xóa thành công!');
    } else {
      return next(createError('403', 'Bạn chỉ được xóa video của bạn!'));
    }
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};

//lấy tất cả video
const getAllVideo = async (req, res, next) => {
  try {
    const videoList = await Video.find();

    res.status(200).send(videoList);
  } catch (error) {
    next(error);
  }
};

//lấy một video
const getVideo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);

    res.status(200).send(video);
  } catch (error) {
    next(error);
  }
};

//cập nhât view
const view = async (req, res, next) => {
  const { id } = req.params;

  try {
    const viewed = await Video.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    res.status(200).send(viewed);
  } catch (error) {
    next(error);
  }
};

//lấy radom video
const randomVideo = async (req, res, next) => {
  try {
    //lấy ngẫu nhiên 30 videos
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};

//lấy danh sách video theo lượng view giảm dần
const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};

//lấy danh sách subscribe của user theo id
const subscribeList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const channelSubscribed = user.channelSubscribed;

    const list = await Promise.all(
      channelSubscribed.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).send(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

//lấy danh sách tags video
const getTags = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(',');
    // const videos = await Video.find({ tags: { $in: tags } }).limit(20);

    const videos = await Video.aggregate([
      { $match: { tags: { $in: tags } } },
      { $sample: { size: 20 } },
    ]);

    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};

//search video
const searchVideo = async (req, res, next) => {
  const search = req.query.q;

  try {
    const videos = await Video.find({
      title: { $regex: search, $options: 'i' },
    }).limit(40);
    res.status(200).send(videos);
  } catch (err) {
    next(err);
  }
};

//lấy danh sách video của user đăng
const getVideoListUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const videos = await Video.find({ userId });

    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
};

//lấy danh sách user đã like
const getVideoUserLike = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const list = await Video.find({
      likes: { $in: userId },
    });

    res.status(200).send(list);
  } catch (error) {
    next(error);
  }
};

export {
  addVideo,
  updateVideo,
  deleteVideo,
  getAllVideo,
  getVideo,
  view,
  randomVideo,
  trendVideo,
  subscribeList,
  getTags,
  searchVideo,
  getVideoListUser,
  getVideoUserLike,
};
