import express from 'express';
import { addComment, deleteComment, getComment } from '../controllers/comment.js';
import { verifyToken } from '../utilities/utilities.js';

const commentRouter = express.Router();

commentRouter.get('/:videoId', getComment);
commentRouter.post('/add/:videoId', verifyToken, addComment);
commentRouter.put('/delete/:id', verifyToken, deleteComment);
export default commentRouter;
