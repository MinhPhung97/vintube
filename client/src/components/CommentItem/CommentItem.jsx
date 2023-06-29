import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Action,
  ActionContent,
  Avatar,
  Comment,
  Content,
  Img,
  ShowMore,
  SpanDate,
  SpanName,
  Text,
  Title,
  Wrapper,
} from './CommentItemStyle/CommentItemStyle';
import { channelService } from '../../services/channelService';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import { commentService } from '../../services/commentService';
import Swal from 'sweetalert2';

const CommentItem = ({ comment, fetchDataComment }) => {
  const [showMore, setShowMore] = useState(false);
  const [channel, setChannel] = useState({});
  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelRes = await channelService.getChannel(comment.userId);
        setChannel(channelRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comment.userId]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  //menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await commentService.deleteComment(id);

      Toast.fire({
        icon: 'success',
        title: res.data,
      });

      fetchDataComment();
    } catch (error) {
      console.log(error.response.data.message);

      Toast.fire({
        icon: 'error',
        title: error.response.data.message,
      });
    }
  };

  //popup thông báo
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
      <Comment>
        <Img>
          <Avatar
            src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
            alt=""
          />
        </Img>
        <Content>
          <Title>
            <SpanName>{channel?.name}</SpanName>
            <SpanDate>{format(comment.createdAt)}</SpanDate>
          </Title>
          <Text>
            {comment?.comment.split(' ').length > 100 ? (
              <>
                {
                  <p>
                    {showMore ? `${comment?.comment}` : `${comment?.comment.substring(0, 200)}`}
                  </p>
                }
                <ShowMore onClick={handleShowMore}>{showMore ? 'Ẩn bớt' : 'Xem thêm'}</ShowMore>
              </>
            ) : (
              <>{<p>{comment?.comment}</p>}</>
            )}
          </Text>
        </Content>

        <Action>
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ActionContent
                onClick={() => {
                  handleDeleteComment(comment._id);
                }}
              >
                <DeleteIcon />
                <span>Xóa</span>
              </ActionContent>
            </MenuItem>
          </Menu>
        </Action>
      </Comment>
    </Wrapper>
  );
};

export default CommentItem;
