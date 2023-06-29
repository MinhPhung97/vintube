import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentItem from '~/components/CommentItem/CommentItem';
import { commentService } from '~/services/commentService';
import { fetchComment, loadingOff, loadingOn } from '../../features/commentSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Avatar,
  CancelBtn,
  CommentBtn,
  Input,
  Loading,
  NewComment,
  NewCommentBtn,
  Title,
  Wrapper,
} from './CommentStyle/CommentStyle';
import Swal from 'sweetalert2';

const Comment = () => {
  const [showActions, setShowActions] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  //currentUser
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  //current comment
  const currentComment = useSelector((state) => state.commentSlice.currentComment);

  const isLoading = useSelector((state) => state.commentSlice.isLoading);

  const { id } = useParams();

  const fetchDataComment = async () => {
    try {
      const commentRes = await commentService.getComments(id);

      const newCommentList = commentRes.data
        .filter((item) => {
          return item.isDelete == false;
        })
        .reverse();

      setComments(newCommentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataComment();
  }, [currentComment?.comment]);

  const handleOnFocus = () => {
    setShowActions(true);
  };

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCancelComment = () => {
    setShowActions(false);
    setNewComment('');
  };

  const handlePostComment = async () => {
    try {
      if (currentUser === null) {
        Toast.fire({
          icon: 'error',
          title: 'Vui lòng đăng nhập!',
        });
      } else {
        dispatch(loadingOn());
        const comment = { comment: newComment };
        const commentRes = await commentService.postComment(comment, id);

        setTimeout(() => {
          dispatch(fetchComment(commentRes.data));
          dispatch(loadingOff());
        }, 500);

        handleCancelComment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //thông báo
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return (
    <Wrapper>
      <Title>{`${comments.length} bình luận`}</Title>
      {isLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <NewComment>
          <Avatar
            src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
            alt=""
          />
          <Input
            placeholder="Bình luận..."
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            value={newComment}
          />
        </NewComment>
      )}

      {showActions && (
        <NewCommentBtn>
          <CancelBtn onClick={handleCancelComment}>Hủy</CancelBtn>
          <CommentBtn disabled={newComment === '' ? true : false} onClick={handlePostComment}>
            Bình luận
          </CommentBtn>
        </NewCommentBtn>
      )}

      {comments.map((comment, index) => {
        return <CommentItem comment={comment} key={index} fetchDataComment={fetchDataComment} />;
      })}
    </Wrapper>
  );
};

export default Comment;
