import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rootRouter from './src/routers/rootRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config(); // read file .env
app.use(express.json()); //read file json
app.use(cookieParser());

//middleware
app.use(cors());
//connect to mongodb
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECT_URL);
  try {
    console.log('connected DB!');
  } catch (error) {
    error.throw(error);
  }
};
app.use('/api', rootRouter);

app.listen(8080, () => {
  connect();
  console.log('connect sv');
});

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Có lỗi xảy ra!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
