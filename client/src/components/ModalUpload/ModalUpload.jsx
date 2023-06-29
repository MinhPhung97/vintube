import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../services/firebase';
import {
  Container,
  Content,
  Header,
  ImgFile,
  Item,
  ItemFile,
  SubmitBtn,
  VideoFile,
  Wrapper,
} from './ModalUploadStyled/ModalUploadStyled';
import { videoService } from '../../services/videoService';
import Swal from 'sweetalert2';

function ModalUpload() {
  const [video, setVideo] = useState(undefined);
  const [img, setImg] = useState(undefined);

  // % upload file
  const [videoPerc, setVideoPerc] = useState(0);
  const [imgPerc, setImgPerc] = useState(0);

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState(undefined);

  const dispatch = useDispatch();

  const isShowModal = useSelector((state) => state.userSlice.showModal);

  //modal
  const handleClose = () => {
    // dispatch(hideModalUpload());
  };

  const handleTags = (e) => {
    //loại bỏ khoảng trắng trước sau của các tag nhập vào
    const tagsArray = e.target.value.split(',').map((item) => {
      return item.trim();
    });

    //loại bỏ các phần tử rỗng '' trong mảng
    const arrayNotEmpty = tagsArray.filter((item) => item !== '');

    setTags(arrayNotEmpty);
  };

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //firebase - upload file
  const uploadFile = (file, type) => {
    //khởi tạo storage firebase
    const storage = getStorage(app);

    //tạo biến file là thời gian tính theo milliseconds từ năm 1970
    // (/[^A-Z0-9]+/gi, '_') loại bỏ khoảng trắng và ký tự đặc biệt
    const fileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9]+/gi, '_');

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        type === 'videoUrl' ? setVideoPerc(Math.round(progress)) : setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return {
              ...prev,
              [type]: downloadURL,
            };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleCleanInput = () => {
    setInputs({});
    setTags(undefined);
    setVideoPerc(0);
    setImgPerc(0);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      inputs.videoUrl == undefined ||
      inputs.imgUrl == undefined ||
      inputs.title == undefined ||
      inputs.desc == undefined ||
      tags == []
    ) {
      Toast.fire({
        icon: 'error',
        title: 'Vui lòng nhập đủ các trường!',
      });
    } else {
      try {
        const res = await videoService.uploadVideo({ ...inputs, tags });

        handleCleanInput();

        Toast.fire({
          icon: 'success',
          title: 'Upload thành công!',
        });
      } catch (error) {
        console.log(error);
      }
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
    <>
      <Modal
        open={isShowModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrapper>
          <Container>
            <Header>
              <h3>Tải video lên</h3>
              <button onClick={handleClose}>
                <CloseIcon />
              </button>
            </Header>
            <Content>
              <ItemFile>
                {videoPerc > 0 ? (
                  <VideoFile>{`Đang tải: ${videoPerc}%`}</VideoFile>
                ) : (
                  <VideoFile>
                    <label>Chọn video tải lên</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideo(e.target.files[0])}
                      name="videoUrl"
                    />
                  </VideoFile>
                )}
                {imgPerc > 0 ? (
                  <ImgFile>{`Đang tải: ${imgPerc}%`}</ImgFile>
                ) : (
                  <ImgFile>
                    <label>Chọn ảnh Cover</label>
                    <input
                      type="file"
                      accept="img/*"
                      onChange={(e) => setImg(e.target.files[0])}
                      name="imgUrl"
                    />
                  </ImgFile>
                )}
              </ItemFile>

              <Item>
                <label>Tiêu đề (bắt buộc)</label>
                <textarea
                  rows="4"
                  placeholder="Nhập tiêu đề để mô tả video của bạn."
                  onChange={handleInput}
                  name="title"
                />
              </Item>
              <Item>
                <label>Tags</label>
                <textarea
                  rows="2"
                  placeholder="Thêm tag để tìm kiếm video của bạn dễ dàng hơn, mỗi tag ngăn bởi dấu ',' ."
                  onChange={handleTags}
                  name="tags"
                />
              </Item>
              <Item>
                <label>Mô tả</label>
                <textarea
                  name="desc"
                  rows="10"
                  placeholder="Giới thiệu về video của bạn."
                  onChange={handleInput}
                />
              </Item>
              <SubmitBtn>
                <button onClick={handleUpload}>Tải lên</button>
              </SubmitBtn>
            </Content>
          </Container>
        </Wrapper>
      </Modal>
    </>
  );
}

export default ModalUpload;
