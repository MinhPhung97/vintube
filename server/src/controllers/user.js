import User from '../models/User.js';
import Video from '../models/Video.js';
import { createError } from '../utilities/utilities.js';

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (id === req.user._id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).send(updateUser);
    } catch (err) {
      next(err.message);
    }
  } else {
    return next(createError('403', 'Thông tin đăng nhập không hợp lệ!'));
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const userList = await User.find();

    res.status(200).send(userList);
  } catch (error) {
    next(error);
  }
};

const subscribe = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user.id, { $push: { channelSubscribed: id } });

    await User.findByIdAndUpdate(id, { $push: { subscribers: req.user.id } });

    res.status(200).send('Đăng ký thành công!');
  } catch (error) {
    next(error);
  }
};

const unSubscribe = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user.id, { $pull: { channelSubscribed: id } });

    await User.findByIdAndUpdate(id, { $pull: { subscribers: req.user.id } });

    res.status(200).send('Hủy đăng ký thành công!');
  } catch (error) {
    next(error);
  }
};

//like video
const likeVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });
    res.status(200).send('Like thành công!');
  } catch (err) {
    next(err);
  }
};

//remove like video
const removeLikeVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $pull: { likes: userId },
    });

    res.status(200).send('Remove like thành công!');
  } catch (error) {
    next(error);
  }
};

//dislike video
const disLikeVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });
    res.status(200).send('Dislike thành công');
  } catch (err) {
    next(err);
  }
};

//remove like video
const removeDislikeVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    await Video.findByIdAndUpdate(videoId, {
      $pull: { dislikes: userId },
    });

    res.status(200).send('Remove dislike thành công!');
  } catch (error) {
    next(error);
  }
};

export {
  getAllUser,
  getUser,
  updateUser,
  subscribe,
  unSubscribe,
  likeVideo,
  disLikeVideo,
  removeLikeVideo,
  removeDislikeVideo,
};
