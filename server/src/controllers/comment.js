import Comment from '../models/Comment.js';
import { createError } from '../utilities/utilities.js';

const addComment = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const newComment = new Comment({ ...req.body, userId: req.user.id, videoId });
    const savedVideo = await newComment.save();

    res.status(200).send(savedVideo);
  } catch (error) {
    next(error);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const commentList = await Comment.find({ videoId });

    res.status(200).send(commentList);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) return next(createError('404', 'Không tìm thấy bình luận!'));

    if (req.user.id === comment.userId) {
      await Comment.findByIdAndUpdate(
        id,
        {
          $set: { isDelete: true },
        },
        { new: true }
      );

      res.status(200).send('Xóa thành công!');
    } else {
      return next(createError('403', 'Bạn chỉ được xóa bình luận của bạn!'));
    }
  } catch (error) {
    next(error);
  }
};

export { getComment, addComment, deleteComment };
