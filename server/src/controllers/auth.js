import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utilities/utilities.js';

const signUp = async (req, res, next) => {
  try {
    //check trùng email, name
    //không trùng mới tạo được tài khoản
    const { email } = req.body;
    const checkDuplicate = await User.findOne({ email });

    if (checkDuplicate) {
      next(createError('401', 'Email đã tồn tại!'));
    } else {
      //tạo mật khẩu mã hóa
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });

      await newUser.save();
      res.status(200).send('Tạo tài khoản thành công!');
    }
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError('404', 'Không tìm thấy email!'));

    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isPassword) return next(createError('400', 'Sai thông tin đăng nhập!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    const userInfo = { ...others, access_token: token };

    res.status(200).send(userInfo);
  } catch (error) {
    next(error);
  }
};

//login từ bên thứ ba
const thirdAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);

      const userInfo = { ...user._doc, access_token: token };

      res.status(200).send(userInfo);
    } else {
      const newUser = new User({ ...req.body, thirdAuth: true });

      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);

      const userInfo = { ...savedUser._doc, access_token: token };

      res.status(200).send(userInfo);
    }
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, thirdAuth };
