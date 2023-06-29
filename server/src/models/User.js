import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default: '',
    },
    subscribers: {
      type: [String],
      default: [],
    },
    channelSubscribed: {
      type: [String],
      default: [],
    },
    // videoLiked: {
    //   type: [String],
    //   default: [],
    // },
    // videoDisliked: {
    //   type: [String],
    //   default: [],
    // },
    thirdAuth: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserScheme);
