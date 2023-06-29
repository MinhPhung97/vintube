//handle error
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

//verify token
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(createError('401', 'Tài khoản chưa được xác thực!'));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError('403', 'Token không hợp lệ!'));
    req.user = user;
    next();
  });
};
